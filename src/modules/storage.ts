import { MOD_VERSION } from "@/constants";
import { chatSendModMessage } from "@/utils/chat";
import { hookFunction, HookPriority } from "./bcModSdk";
import { getPlayer } from "@/utils/characters";
import { rulesList, StorageRule } from "./rules";
import { AccessRight, CaregiverAccessRightId, caregiverAccessRightsList, hasAccessRightTo, hasMommy, turnCaregiverAccessRight } from "./access";

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
    notes?: {
        list?: Note[],
        visibility?: 0 | 1 | 2
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
            if (msg === "syncStorage") {
                if (!sender.LITTLISH_CLUB) {
                    chatSendModMessage("syncStorage", {
                        storage: modStorage,
                    }, sender.MemberNumber);
                }
                sender.LITTLISH_CLUB = data.storage;
            }
            if (msg === "addBaby" && !hasMommy(Player) && modStorage.requestReciviedFrom?.id !== sender.MemberNumber) {
                modStorage.requestReciviedFrom = {
                    name: CharacterNickname(sender),
                    id: sender.MemberNumber
                };
                syncStorage();
            }
            if (
                msg === "turnCanChangeCaregiversList" &&
                hasAccessRightTo(sender, Player, AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST)
            ) {
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
                syncStorage();
            }
            if (
                msg === "changeCaregiversList" &&
                hasAccessRightTo(sender, Player, AccessRight.CHANGE_CAREGIVERS_LIST)
            ) {
                if (!Array.isArray(data?.list)) return;
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.list = data.list;
                syncStorage();
            }
            if (
                msg === "turnCaregiversAccessRight" &&
                hasAccessRightTo(sender, Player, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)
            ) {
                if (!caregiverAccessRightsList.find((r) => r.id === data?.accessRightId)) return;
                turnCaregiverAccessRight(data.accessRightId);
                syncStorage();
            }
            if (
                msg === "changeRuleSettings" &&
                hasAccessRightTo(sender, Player, AccessRight.MANAGE_RULES)
            ) {
                if (!rulesList.find((r) => r.id === data?.id)) return;
                if (!modStorage.rules) modStorage.rules = {};
                if (!modStorage.rules.list) modStorage.rules.list = [];
                let r = modStorage.rules.list.find((d) => d.id === data.id);
                if (r) {
                    if (typeof data.state === "boolean") r.state = data.state;
                    if (typeof data.strict === "boolean") r.strict = data.strict;
                    r.changedBy = sender.MemberNumber;
                    r.ts = Date.now();
                    console.log(r, modStorage);
                } else {
                    modStorage.rules.list.push({
                        id: data.id,
                        state: typeof data.state === "boolean" ? data.state : false,
                        strict: typeof data.strict === "boolean" ? data.strict : false,
                        changedBy: sender.MemberNumber,
                        ts: Date.now()
                    });
                }
                syncStorage();
            }
            if (
                msg === "addNote"
            ) {
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
                syncStorage();
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
}

function migrateModStorage(): void { }

export function syncStorage(): void {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.LITTLISH_CLUB = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("LITTLISH_CLUB");
    chatSendModMessage("syncStorage", {
        storage: modStorage,
    });
}