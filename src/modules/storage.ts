import { MOD_VERSION } from "@/constants";
import { chatSendLocal, chatSendModMessage, handleRequest, handleRequestResponse } from "@/utils/chat";
import { findModByName, hookFunction, HookPriority } from "./bcModSdk";
import { getNickname, getPlayer } from "@/utils/characters";
import { isRuleStrict, rulesList, StorageRule } from "./rules";
import { AccessRight, caregiverAccessRightsList, getCaregiversOf, hasAccessRightTo, hasMommy, isCaregiverAccessRightEnabled, isCaregiverOf, isMommyOf, turnCaregiverAccessRight } from "./access";
import { currentSubscreen } from "@/subscreens/baseSubscreen";
import { CyberDiaperChangePermission, putCyberDiaperOn, StorageCyberDiaper, updateDiaperItem } from "./cyberDiaper";
import { addLog, Log } from "./logs";
import { cloneDeep } from "lodash-es";

export interface Note {
    text: string
    author: {
        name: string
        id: number
    },
    ts: number
}

export interface ModStorage {
    mommy?: {
        name: string
        id: number
    }
    requestReciviedFrom?: {
        name: string
        id: number
    }
    caregivers?: {
        list?: number[]
        accessRights?: string
        canChangeList?: boolean
    }
    rules?: {
        list?: StorageRule[]
    }
    cyberDiaper?: StorageCyberDiaper
    notes?: {
        list?: Note[],
        visibility?: 0 | 1 | 2
    }
    logs?: {
        list?: Log[]
    }
    sleepState?: boolean
    version: string
}

export let modStorage: ModStorage;

export function initStorage(): void {
    const data = {
        version: MOD_VERSION,
    };

    if (typeof Player.ExtensionSettings.LITTLISH_CLUB === "string") {
        modStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.LITTLISH_CLUB)) ?? data;
    } else modStorage = data

    Object.keys(data).forEach((key) => {
        if (modStorage[key] === undefined) {
            modStorage[key] = data[key];
        }
    });

    migrateModStorage();

    try {
        const bccStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.BCC));
        if (
            (
                bccStorage?.abdl?.mommy || bccStorage?.abdl?.caretakers || bccStorage?.abdl?.notes?.list
            ) && !findModByName("BCC")
        ) bccAbdlPartSync(bccStorage.abdl);
    } catch (e) { }

    chatSendModMessage("syncStorage", {
        storage: modStorage,
    });

    hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, (args, next) => {
        const message = args[0];
        const sender = getPlayer(message.Sender);
        if (!sender) return next(args);
        if (message.Content === "lcClubMsg" && !sender.IsPlayer()) {
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
                    chatSendModMessage("syncStorage", {
                        storage: modStorage,
                    }, sender.MemberNumber);
                }
                sender.LITTLISH_CLUB = data.storage;
                if (InformationSheetSelection && InformationSheetSelection.MemberNumber === sender.MemberNumber) {
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
                    `${getNickname(sender)} (${sender.MemberNumber}) ${
                        modStorage.caregivers.canChangeList ? "allowed" : "forbade"
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
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) turned ${
                    isCaregiverAccessRightEnabled(Player, data.accessRightId) ? "on" : "off"
                } caregiver access right "${caregiverAccessRightsList.find((r) => r.id === data.accessRightId).name}"`;
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
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) added note: ${data.text}`;
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
                const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted note: ${note.text}`;
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
        }
        next(args);
    });

    hookFunction("ChatRoomSync", HookPriority.ADD_BEHAVIOR, (args, next) => {
        next(args);
        chatSendModMessage("syncStorage", {
            storage: modStorage,
        });
    });

    // window.modStorage = modStorage;
}

function validateRuleConditions(r: StorageRule, data: Partial<StorageRule>): void {
    console.log(r, data);
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

function migrateModStorage(): void { }

function bccAbdlPartSync(oldAbdlData: Record<string, any>): void {
    console.log(oldAbdlData);
    if (!hasMommy(Player) && typeof oldAbdlData?.mommy?.id === "number") {
        modStorage.mommy = {
            name: oldAbdlData.mommy.name ?? "?",
            id: oldAbdlData.mommy.id
        }
    }

    if (Array.isArray(oldAbdlData?.caretakers?.list)) {
        const caregiversList = getCaregiversOf(Player);
        for (const memberNumber of oldAbdlData.caretakers.list) {
            if (!caregiversList.includes(memberNumber)) caregiversList.push(memberNumber);
        }
        if (!modStorage.caregivers) modStorage.caregivers = {};
        modStorage.caregivers.list = caregiversList;
    }

    if (Array.isArray(oldAbdlData?.notes?.list) && oldAbdlData.notes.list.length > 0) {
        if (!modStorage.notes) modStorage.notes = {};
        if (!modStorage.notes.list) modStorage.notes.list = [];
        for (const note of oldAbdlData.notes.list) {
            if (
                typeof note.text !== "string" || typeof note.author?.name !== "string" ||
                typeof note.author?.id !== "number" || typeof note.time !== "number"
            ) continue;
            modStorage.notes.list.push({
                text: note.text,
                author: {
                    name: note.author?.name,
                    id: note.author?.id
                },
                ts: note.time
            });
        }
    }

    let bccStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.BCC))
    delete bccStorage.abdl;
    Player.ExtensionSettings.BCC = LZString.compressToBase64(JSON.stringify(bccStorage));
    ServerPlayerExtensionSettingsSync("BCC");
    syncStorage();
    chatSendLocal("Littlish Club was synced with BCC's ABDL module");
}

function deleteProtectedProperties(data: ModStorage): ModStorage {
    data = cloneDeep(data);
    delete data.logs;
    return data;
}

export function syncStorage(): void {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.LITTLISH_CLUB = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("LITTLISH_CLUB");
    chatSendModMessage("syncStorage", {
        storage: deleteProtectedProperties(modStorage),
    });
}

export function resetStorage(): void {
    modStorage = {
        version: MOD_VERSION
    };
    syncStorage();
}
