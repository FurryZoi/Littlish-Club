import { isRuleStrict } from "./rules";
import { modStorage } from "./storage";

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
    READ_LOGS = 1004
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
    RELEASE_BABY = "RELEASE_BABY"
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
                C1.MemberNumber === C2.MemberNumber ||
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
            )
        case AccessRight.READ_LOGS:
            return (
                C1.MemberNumber === C2.MemberNumber ||
                isMommyOf(C1, C2) ||
                (
                    isCaregiverOf(C1, C2) &&
                    isCaregiverAccessRightEnabled(C2, CaregiverAccessRightId.READ_LOGS)
                )
            )
        case AccessRight.RELEASE_BABY:
            return isMommyOf(C1, C2);
    }
}