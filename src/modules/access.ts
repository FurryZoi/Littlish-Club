import { messagesManager } from "zois-core/messaging";
import { isRuleActive, isRuleStrict, RuleId, rulesList, StorageRule } from "./rules";
import { modStorage, Note, syncStorage } from "./storage";
import { getNickname } from "zois-core";
import { addLog } from "./logs";
import { MAX_NOTE_SIZE_IN_KBYTES } from "@/constants";
import { StorageCyberDiaper, CyberDiaperChangePermission, updateDiaperItem } from "./cyberDiaper";


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
}

function validateRuleData(r: StorageRule, data: Partial<StorageRule>): void {
    const ruleParams = rulesList.find((g) => g.id === r.id).data ?? [];
    for (const param of ruleParams) {
        const p = data.data?.[param.name];
        if (param.type === "number" && typeof p !== "number") continue;
        if (param.type === "text" && typeof p !== "string") continue;
        if (param.type === "checkbox" && typeof p !== "boolean") continue;
        if (param.type === "color" && typeof p !== "string") continue;
        if (param.type === "list") {
            if (
                param.listNumbersOnly &&
                (
                    !Array.isArray(p) ||
                    !p.every((a) => typeof a === "number")
                )
            ) continue;
            if (
                !param.listNumbersOnly &&
                (
                    !Array.isArray(p) ||
                    !p.every((a) => typeof a === "string" || typeof a === "number")
                )
            ) continue;
        }
        if (param.type === "extended" && !param.validate(p)) continue;
        if (!r.data) r.data = {};
        r.data[param.name] = p;
    }
}

export function isExploringModeEnabled(): boolean {
    return !hasMommy(Player);
}

export function hasMommy(C: Character): boolean {
    if (C?.IsPlayer?.()) return typeof modStorage.mommy?.id === "number";
    return typeof C?.LITTLISH_CLUB?.mommy?.id === "number";
}

export function getMommyOf(C: Character) {
    if (C?.IsPlayer?.()) return modStorage.mommy ?? null;
    return C?.LITTLISH_CLUB?.mommy ?? null;
}

export function getCaregiversOf(C: Character) {
    if (C?.IsPlayer?.()) return modStorage.caregivers?.list ?? [];
    return C?.LITTLISH_CLUB?.caregivers?.list ?? [];
}

export function isMommyOf(C1: Character, C2: Character): boolean {
    if (C2?.IsPlayer?.()) return modStorage.mommy?.id === C1.MemberNumber;
    return C2?.LITTLISH_CLUB?.mommy?.id === C1.MemberNumber;
}

export function isCaregiverOf(C1: Character, C2: Character): boolean {
    return getCaregiversOf(C2)?.includes(C1.MemberNumber);
}

export function isRequestedByPlayer(C: Character): boolean {
    if (C?.IsPlayer()) return false;
    return C?.LITTLISH_CLUB?.requestReciviedFrom?.id === Player.MemberNumber;
}

export enum CaregiverAccessRightId {
    MANAGE_DIAPER = 1000,
    MANAGE_RULES = 1001,
    DELETE_NOTES = 1002,
    MANAGE_APPEARANCE = 1003,
    READ_LOGS = 1004,
    MANAGE_ABCL_SETTINGS = 1005
}

export interface CaregiverAccessRight {
    id: CaregiverAccessRightId
    name: string
    description: string
}

export enum AccessRight {
    MANAGE_DIAPER = "MANAGE_DIAPER",
    MANAGE_RULES = "MANAGE_RULES",
    TURN_RULE_STRICT_MODE = "TURN_RULE_STRICT_MODE",
    DELETE_NOTES = "DELETE_NOTES",
    MANAGE_APPEARANCE = "MANAGE_APPEARANCE",
    MANAGE_CAREGIVERS_ACCESS_RIGHTS = "MANAGE_CAREGIVERS_ACCESS_RIGHTS",
    TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST = "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST",
    CHANGE_CAREGIVERS_LIST = "CHANGE_CAREGIVERS_LIST",
    READ_LOGS = "READ_LOGS",
    DELETE_LOGS = "DELETE_LOGS",
    RELEASE_BABY = "RELEASE_BABY",
    SUMMON = "SUMMON",
    MANAGE_ABCL_SETTINGS = "MANAGE_ABCL_SETTINGS"
}

export const caregiverAccessRightsList: CaregiverAccessRight[] = [
    {
        id: 1000,
        name: "Manage Diaper",
        description: ""
    },
    {
        id: 1001,
        name: "Manage Rules",
        description: ""
    },
    {
        id: 1002,
        name: "Delete Notes",
        description: ""
    },
    {
        id: 1003,
        name: "Change Appearance",
        description: ""
    },
    {
        id: 1004,
        name: "Read Logs",
        description: ""
    },
    {
        id: 1005,
        name: "Manage ABCL Settings",
        description: ""
    }
];


export function isCaregiverAccessRightEnabled(C: Character, accessRightId: CaregiverAccessRightId): boolean {
    if (C?.IsPlayer?.()) return modStorage.caregivers?.accessRights?.includes(String.fromCharCode(accessRightId));
    return C?.LITTLISH_CLUB?.caregivers?.accessRights?.includes(String.fromCharCode(accessRightId));
}

export function turnCaregiverAccessRight(accessRightId: CaregiverAccessRightId): void {
    if (typeof modStorage.caregivers?.accessRights !== "string") {
        if (!modStorage.caregivers) modStorage.caregivers = {};
        modStorage.caregivers.accessRights = String.fromCharCode(accessRightId);
        return;
    }
    if (modStorage.caregivers.accessRights.includes(String.fromCharCode(accessRightId))) {
        modStorage.caregivers.accessRights = modStorage.caregivers.accessRights.replaceAll(String.fromCharCode(accessRightId), "");
    } else {
        modStorage.caregivers.accessRights += String.fromCharCode(accessRightId);
    }
}

export function hasAccessRightTo(C1: Character, C2: Character, accessRight: AccessRight): boolean {
    const c1ModStorage = C1.IsPlayer() ? modStorage : C1.LITTLISH_CLUB;
    const c2ModStorage = C2.IsPlayer() ? modStorage : C2.LITTLISH_CLUB;

    if (C1.IsPlayer() && C2.IsPlayer()) {
        if (isExploringModeEnabled()) return true;
    }

    switch (accessRight) {
        case AccessRight.CHANGE_CAREGIVERS_LIST:
            return (
                isMommyOf(C1, C2) ||
                (
                    C1.MemberNumber === C2.MemberNumber &&
                    c1ModStorage.caregivers?.canChangeList
                )
            );
        case AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST:
            return isMommyOf(C1, C2);
        case AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS:
            return isMommyOf(C1, C2);
        case AccessRight.MANAGE_RULES:
            return (
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.MANAGE_RULES)
                )
            );
        case AccessRight.TURN_RULE_STRICT_MODE:
            return isMommyOf(C1, C2);
        case AccessRight.MANAGE_DIAPER:
            return (
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.MANAGE_DIAPER)
                )
            );
        case AccessRight.MANAGE_APPEARANCE:
            return (
                (
                    C1.MemberNumber === C2.MemberNumber &&
                    !isRuleActive(C1, RuleId.PREVENT_APPLYING_OUTFITS_FROM_LITTLISH_WARDROBE_ON_SELF)
                ) ||
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.MANAGE_APPEARANCE)
                )
            );
        case AccessRight.DELETE_NOTES:
            return (
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.DELETE_NOTES)
                )
            );
        case AccessRight.READ_LOGS:
            return (
                C1.MemberNumber === C2.MemberNumber ||
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.READ_LOGS)
                )
            );
        case AccessRight.DELETE_LOGS:
            return isMommyOf(C1, C2);
        case AccessRight.RELEASE_BABY:
            return isMommyOf(C1, C2);
        case AccessRight.SUMMON:
            return isMommyOf(C1, C2) || isCaregiverOf(C1, C2);
        case AccessRight.MANAGE_ABCL_SETTINGS:
            return (
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.MANAGE_ABCL_SETTINGS)
                )
            );
    }
}

export function loadAccess(): void {
    messagesManager.onRequest("getLogs", (data, sender: Character) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.READ_LOGS)) return;
        return modStorage.logs?.list ?? [];
    });

    messagesManager.onPacket("addBaby", (data, sender) => {
        if (hasMommy(Player) || modStorage.requestReciviedFrom?.id === sender.MemberNumber) return;
        modStorage.requestReciviedFrom = {
            name: CharacterNickname(sender),
            id: sender.MemberNumber
        };
        syncStorage();
        messagesManager.sendLocal(`${getNickname(sender)} (${sender.MemberNumber}) wants to become your mommy, open Littlish Club menu`);
    });

    messagesManager.onPacket("turnCanChangeCaregiversList", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST)) return;
        if (!modStorage.caregivers) modStorage.caregivers = {};
        modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
        addLog(
            `${getNickname(sender)} (${sender.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"
            } ${getNickname(Player)} to change caregivers list`,
            false
        );
        syncStorage();
    });

    messagesManager.onPacket("changeCaregiversList", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.CHANGE_CAREGIVERS_LIST)) return;
        if (!Array.isArray(data?.list)) return;
        if (!modStorage.caregivers) modStorage.caregivers = {};
        modStorage.caregivers.list = data.list;
        messagesManager.sendLocal(`${getNickname(sender)} (${sender.MemberNumber}) changed your caregivers list`);
        addLog(
            `${getNickname(sender)} (${sender.MemberNumber}) changed caregivers list`,
            false
        );
        syncStorage();
    });

    messagesManager.onPacket("turnCaregiversAccessRight", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)) return;
        if (!caregiverAccessRightsList.find((r) => r.id === data?.accessRightId)) return;
        turnCaregiverAccessRight(data.accessRightId);
        const _message = `${getNickname(sender)} (${sender.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, data.accessRightId) ? "on" : "off"} caregiver access right "${caregiverAccessRightsList.find((r) => r.id === data.accessRightId).name}"`;
        addLog(
            _message,
            false
        );
        syncStorage();
        messagesManager.sendLocal(_message);
    });

    messagesManager.onPacket("changeRuleSettings", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.MANAGE_RULES)) return;
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
        messagesManager.sendLocal(_message);
    });

    messagesManager.onPacket("addNote", (data, sender) => {
        if (typeof data?.text !== "string" || data.text.trim() === "") return;
        if ((new TextEncoder().encode(data.text).byteLength / 1024) > MAX_NOTE_SIZE_IN_KBYTES) {
            return messagesManager.sendLocal(
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
        const _message = `${getNickname(sender)} (${sender.MemberNumber}) added note "${data.text}"`;
        addLog(_message, false);
        syncStorage();
        messagesManager.sendLocal(_message);
    });

    messagesManager.onPacket("deleteNote", (data, sender) => {
        if (typeof data?.key !== "number") return;
        const note = modStorage.notes?.list?.find((n, i) => i === data.key - 1);
        if (!note) return;
        if (note.author.id !== sender.MemberNumber && !hasAccessRightTo(sender, Player, AccessRight.DELETE_NOTES)) return;
        modStorage.notes.list.splice(data.key - 1, 1);
        const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted note "${note.text}"`;
        addLog(_message, false);
        syncStorage();
        messagesManager.sendLocal(_message);
    });

    messagesManager.onPacket("changeCyberDiaperSettings", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.MANAGE_DIAPER)) return;
        const {
            name, description, model, locked, color,
            changePermission, property, typeRecord, drawingPriority
        } = data as StorageCyberDiaper;
        if (!modStorage.cyberDiaper) {
            // @ts-ignore
            modStorage.cyberDiaper = {};
            messagesManager.sendLocal(`${getNickname(sender)} bought cyber diaper for you`);
        }
        if (typeof name === "string") modStorage.cyberDiaper.name = name;
        if (typeof description === "string") modStorage.cyberDiaper.description = description;
        if (typeof model === "string") modStorage.cyberDiaper.model = model;
        if (typeof locked === "boolean") modStorage.cyberDiaper.locked = locked;
        if (Array.isArray(color)) modStorage.cyberDiaper.color = color;
        if (
            Object.values(CyberDiaperChangePermission).includes(changePermission)
        ) modStorage.cyberDiaper.changePermission = changePermission;
        if (typeof property === "string") modStorage.cyberDiaper.property = property;
        if (typeRecord) modStorage.cyberDiaper.typeRecord = typeRecord;
        if (drawingPriority) modStorage.cyberDiaper.drawingPriority = drawingPriority;
        const _message = `${getNickname(sender)} (${sender.MemberNumber}) changed cyber diaper's settings`;
        addLog(_message, false);
        syncStorage();
        updateDiaperItem();
        messagesManager.sendLocal(_message);
    });

    messagesManager.onPacket("releaseBaby", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.RELEASE_BABY)) return;
        delete modStorage.mommy;
        syncStorage();
        messagesManager.sendLocal(`${getNickname(sender)} (${sender.MemberNumber}) released you`);
    });

    messagesManager.onPacket("deleteLogs", (data, sender) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.DELETE_LOGS)) return;
        if (typeof data.count !== "number") return;
        const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted log entries (${data.count})`;
        modStorage.logs.list.splice(0, data.count);
        addLog(_message, false);
        messagesManager.sendLocal(_message);
        syncStorage()
    });
}