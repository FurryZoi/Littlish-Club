import { currentSubscreen } from "@/subscreens/baseSubscreen";
import { getPlayer, getNickname } from "@/utils/characters";
import { handleRequest, handleRequestResponse, chatSendModMessage, chatSendLocal } from "@/utils/chat";
import { hasMommy, hasAccessRightTo, AccessRight, caregiverAccessRightsList, turnCaregiverAccessRight, isCaregiverAccessRightEnabled, isMommyOf, CaregiverAccessRightId } from "./access";
import { hookFunction, HookPriority } from "./bcModSdk";
import { StorageCyberDiaper, CyberDiaperChangePermission, updateDiaperItem } from "./cyberDiaper";
import { addLog } from "./logs";
import { rulesList, isRuleStrict, StorageRule } from "./rules";
import { modStorage, syncStorage, Note, PublicModStorage } from "./storage";
import { MAX_NOTE_SIZE_IN_KBYTES, MOD_MESSAGE_KEY } from "@/constants";


export interface RequestMessageData {
    requestId: number
    message: string
    data: any
}

export interface RequestResponseMessageData {
    requestId: number
    message: string
    data: any
}

export interface SyncStorageMessageData {
    storage: PublicModStorage
}

export interface ChangeCaregiversListMessageData {
    list: number[]
}

export interface TurnCaregiversAccessRightMessageData {
    accessRightId: CaregiverAccessRightId
}

export type ChangeRuleSettingsMessageData = Partial<StorageRule>;

export interface AddNoteMessageData {
    text: string
}

export interface DeleteNoteMessageData {
    key: number
}

export type ChangeCyberDiaperSettingsMessageData = StorageCyberDiaper;


function validateRuleConditions(r: StorageRule, data: Partial<StorageRule>): void {
    if (data.conditions) {
        if (!r.conditions) r.conditions = {};
        if (["any", "all"].includes(data.conditions.type)) r.conditions.type = data.conditions.type;
        else r.conditions.type = "any";
        if (data.conditions.whenInRoomWithRole) {
            // @ts-ignore
            if (!r.conditions.whenInRoomWithRole) r.conditions.whenInRoomWithRole = {};
            if (typeof data.conditions.whenInRoomWithRole?.inRoom === "boolean") {
                r.conditions.whenInRoomWithRole.inRoom = data.conditions.whenInRoomWithRole.inRoom;
            }
            if (["mommy", "caregiver"].includes(data.conditions.whenInRoomWithRole?.role)) {
                r.conditions.whenInRoomWithRole.role = data.conditions.whenInRoomWithRole.role;
            }
        } else delete r.conditions.whenInRoomWithRole;
        if (data.conditions.whenInRoomWhereAbdl) {
            // @ts-ignore
            if (!r.conditions.whenInRoomWhereAbdl) r.conditions.whenInRoomWhereAbdl = {};
            if (typeof data.conditions.whenInRoomWhereAbdl?.blocked === "boolean") {
                r.conditions.whenInRoomWhereAbdl.blocked = data.conditions.whenInRoomWhereAbdl.blocked;
            }
        } else delete r.conditions.whenInRoomWhereAbdl;
    }
    console.log(r, data);
}

function validateRuleData(r: StorageRule, data: Partial<StorageRule>): void {
    const ruleParams = rulesList.find((g) => g.id === r.id).data ?? [];
    for (const param of ruleParams) {
        const p = data.data?.[param.name];
        if (param.type === "number" && typeof p !== "number") continue;
        if (param.type === "text" && typeof p !== "string") continue;
        if (param.type === "checkbox" && typeof p !== "boolean") continue;
        if (!r.data) r.data = {};
        r.data[param.name] = p;
    }
}

export function loadMessaging(): void {
    hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, (args, next) => {
        const message = args[0];
        const sender = getPlayer(message.Sender);
        if (!sender) return next(args);
        if (message.Content === MOD_MESSAGE_KEY && !sender.IsPlayer()) {
            const msg = message.Dictionary.msg;
            const data = message.Dictionary.data;
            if (msg === "request") {
                if (typeof data.requestId !== "number" || typeof data.message !== "string") return;
                handleRequest(data.requestId, data.message, data.data, sender);
            }
            if (msg === "requestResponse") {
                if (typeof data.requestId !== "number") return;
                handleRequestResponse(data.requestId, data.data);
            }
            if (msg === "syncStorage") {
                if (!sender.LITTLISH_CLUB) {
                    chatSendModMessage<SyncStorageMessageData>("syncStorage", {
                        storage: modStorage,
                    }, sender.MemberNumber);
                }
                sender.LITTLISH_CLUB = data.storage;
                if (
                    InformationSheetSelection &&
                    InformationSheetSelection.MemberNumber === sender.MemberNumber &&
                    window.LITTLISH_CLUB.inModSubscreen()
                ) {
                    currentSubscreen.update();
                }
            }
            if (msg === "addBaby" && !hasMommy(Player) && modStorage.requestReciviedFrom?.id !== sender.MemberNumber) {
                modStorage.requestReciviedFrom = {
                    name: CharacterNickname(sender),
                    id: sender.MemberNumber
                };
                syncStorage();
                chatSendLocal(`${getNickname(sender)} (${sender.MemberNumber}) wants to become your mommy, open Littlish Club menu`);
            }
            if (
                msg === "turnCanChangeCaregiversList" &&
                hasAccessRightTo(sender, Player, AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST)
            ) {
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
                addLog(
                    `${getNickname(sender)} (${sender.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"
                    } ${getNickname(Player)} to change caregivers list`,
                    false
                );
                syncStorage();
            }
            if (
                msg === "changeCaregiversList" &&
                hasAccessRightTo(sender, Player, AccessRight.CHANGE_CAREGIVERS_LIST)
            ) {
                if (!Array.isArray(data?.list)) return;
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.list = data.list;
                chatSendLocal(`${getNickname(sender)} (${sender.MemberNumber}) changed your caregivers list`);
                addLog(
                    `${getNickname(sender)} (${sender.MemberNumber}) changed caregivers list`,
                    false
                );
                syncStorage();
            }
            if (
                msg === "turnCaregiversAccessRight" &&
                hasAccessRightTo(sender, Player, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)
            ) {
                if (!caregiverAccessRightsList.find((r) => r.id === data?.accessRightId)) return;
                turnCaregiverAccessRight(data.accessRightId);
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, data.accessRightId) ? "on" : "off"} caregiver access right "${caregiverAccessRightsList.find((r) => r.id === data.accessRightId).name}"`;
                addLog(
                    _message,
                    false
                );
                syncStorage();
                chatSendLocal(_message);
            }
            if (
                msg === "changeRuleSettings" &&
                hasAccessRightTo(sender, Player, AccessRight.MANAGE_RULES)
            ) {
                if (!rulesList.find((r) => r.id === data?.id)) return;
                if (
                    isRuleStrict(Player, data.id) &&
                    !isMommyOf(sender, Player)
                ) return;
                if (!modStorage.rules) modStorage.rules = {};
                if (!modStorage.rules.list) modStorage.rules.list = [];
                let r = modStorage.rules.list.find((d) => d.id === data.id);
                if (r) {
                    if (typeof data.state === "boolean") r.state = data.state;
                    if (typeof data.strict === "boolean" && hasAccessRightTo(sender, Player, AccessRight.TURN_RULE_STRICT_MODE)) {
                        r.strict = data.strict;
                    }
                    validateRuleData(r, data);
                    validateRuleConditions(r, data);
                    r.changedBy = sender.MemberNumber;
                    r.ts = Date.now();
                } else {
                    let d = {
                        id: data.id,
                        state: typeof data.state === "boolean" ? data.state : false,
                        strict: typeof data.strict === "boolean" && hasAccessRightTo(sender, Player, AccessRight.TURN_RULE_STRICT_MODE) ? data.strict : false,
                        changedBy: sender.MemberNumber,
                        ts: Date.now()
                    };
                    validateRuleData(d, data);
                    validateRuleConditions(d, data);
                    modStorage.rules.list.push(d);
                }
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) changed settings of "${rulesList.find((r) => r.id === data?.id).name}" rule`;
                addLog(
                    _message,
                    false
                );
                syncStorage();
                chatSendLocal(_message);
            }
            if (msg === "addNote") {
                if (typeof data?.text !== "string" || data.text.trim() === "") return;
                if ((new TextEncoder().encode(data.text).byteLength / 1024) > MAX_NOTE_SIZE_IN_KBYTES) {
                    return chatSendLocal(
                        `${getNickname(sender)} (${sender.MemberNumber}) tried to add note that takes up more size than the set limit. Probably it was attempt to break the account.`
                    );
                };
                if (!modStorage.notes) modStorage.notes = {};
                if (!modStorage.notes.list) modStorage.notes.list = [];
                const note: Note = {
                    text: data.text,
                    author: {
                        name: CharacterNickname(sender),
                        id: sender.MemberNumber
                    },
                    ts: Date.now()
                };
                modStorage.notes.list.push(note);
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) added note: "${data.text}"`;
                addLog(_message, false);
                syncStorage();
                chatSendLocal(_message);
            }
            if (msg === "deleteNote") {
                if (typeof data?.key !== "number") return;
                const note = modStorage.notes?.list?.find((n, i) => i === data.key - 1);
                if (!note) return;
                if (note.author.id !== sender.MemberNumber && !hasAccessRightTo(sender, Player, AccessRight.DELETE_NOTES)) return;
                modStorage.notes.list.splice(data.key - 1, 1);
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted note: "${note.text}"`;
                addLog(_message, false);
                syncStorage();
                chatSendLocal(_message);
            }
            if (msg === "changeCyberDiaperSettings" && hasAccessRightTo(sender, Player, AccessRight.MANAGE_DIAPER)) {
                const { name, description, model, locked, color, changePermission } = data as StorageCyberDiaper;
                if (!modStorage.cyberDiaper) {
                    // @ts-ignore
                    modStorage.cyberDiaper = {};
                    chatSendLocal(`${getNickname(sender)} bought cyber diaper for you`);
                }
                if (typeof name === "string") modStorage.cyberDiaper.name = name;
                if (typeof description === "string") modStorage.cyberDiaper.description = description;
                if (typeof model === "string") modStorage.cyberDiaper.model = model;
                if (typeof locked === "boolean") modStorage.cyberDiaper.locked = locked;
                if (Array.isArray(color)) modStorage.cyberDiaper.color = color;
                if (
                    Object.values(CyberDiaperChangePermission).includes(changePermission)
                ) modStorage.cyberDiaper.changePermission = changePermission;
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) changed cyber diaper's settings`;
                addLog(_message, false);
                syncStorage();
                updateDiaperItem();
                chatSendLocal(_message);
            }
            if (msg === "releaseBaby" && hasAccessRightTo(sender, Player, AccessRight.RELEASE_BABY)) {
                delete modStorage.mommy;
                syncStorage();
                chatSendLocal(`${getNickname(sender)} (${sender.MemberNumber}) released you`);
            }
        }
        next(args);
    });
}