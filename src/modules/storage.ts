import { MOD_VERSION } from "@/constants";
import { chatSendModMessage } from "@/utils/chat";
import { hookFunction, HookPriority } from "./bcModSdk";
import { getPlayer } from "@/utils/characters";
import { StorageRule } from "./rules";

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
    caregivers?: {
        list?: number[]
        accessRights?
        canChangeList?: boolean
    }
    rules?: {
        list?: StorageRule[]
    }
    notes?: {
        list?: Note[],
        visibility?: 0 | 1 | 2
    }
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
        if (message.Content === "littlishClubMsg" && !sender.IsPlayer()) {
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

function migrateModStorage(): void {}

export function syncStorage(): void {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.LITTLISH_CLUB = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("LITTLISH_CLUB");
    chatSendModMessage("syncStorage", {
        storage: modStorage,
    });
}