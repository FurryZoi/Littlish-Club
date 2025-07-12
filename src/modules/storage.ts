import { version } from "@/../package.json";
import { messagesManager } from "zois-core/messaging";
import { findModByName, hookFunction, HookPriority } from "zois-core/modsApi";
import { getNickname, getPlayer } from "zois-core";
import { isRuleStrict, rulesList, StorageRule } from "./rules";
import { AccessRight, caregiverAccessRightsList, getCaregiversOf, hasAccessRightTo, hasMommy, isCaregiverAccessRightEnabled, isCaregiverOf, isMommyOf, turnCaregiverAccessRight } from "./access";
import { getCurrentSubscreen } from "zois-core/ui";
import { CyberDiaperChangePermission, putCyberDiaperOn, StorageCyberDiaper, updateDiaperItem } from "./cyberDiaper";
import { addLog, Log } from "./logs";
import { cloneDeep } from "lodash-es";
import { SyncStorageMessageData } from "@/types/messages";

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
    }
    logs?: {
        list?: Log[]
    }
    sleepState?: boolean
    version: string
}

export type PublicModStorage = Omit<ModStorage, "logs">;

export let modStorage: ModStorage;

export function initStorage(): void {
    const data = {
        version
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

    syncStorage();

    hookFunction("ChatRoomSync", HookPriority.ADD_BEHAVIOR, (args, next) => {
        next(args);
        messagesManager.sendPacket<SyncStorageMessageData>("syncStorage", {
            storage: deleteProtectedProperties(modStorage),
        });
    });

    messagesManager.onPacket("syncStorage", (data, sender) => {
        if (!sender.LITTLISH_CLUB) {
            messagesManager.sendPacket<SyncStorageMessageData>("syncStorage", {
                storage: deleteProtectedProperties(modStorage),
            }, sender.MemberNumber);
        }
        sender.LITTLISH_CLUB = data.storage;
        if (
            InformationSheetSelection &&
            InformationSheetSelection.MemberNumber === sender.MemberNumber &&
            window.LITTLISH_CLUB.inModSubscreen()
        ) {
            getCurrentSubscreen().update();
        }
    });

    // window.modStorage = modStorage;
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
    messagesManager.sendLocal("Littlish Club was synced with BCC's ABDL module");
}

export function deleteProtectedProperties(data: ModStorage): PublicModStorage {
    let _data = cloneDeep(data);
    delete _data.logs;
    return _data;
}

export function syncStorage(): void {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.LITTLISH_CLUB = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("LITTLISH_CLUB");
    messagesManager.sendPacket<SyncStorageMessageData>("syncStorage", {
        storage: deleteProtectedProperties(modStorage),
    });
}

export function resetStorage(): void {
    modStorage = {
        version
    };
    syncStorage();
}
