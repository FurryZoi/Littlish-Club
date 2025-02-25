import { modStorage } from "./storage";

export function isExploringModeEnabled(): boolean {
    return !hasMommy(Player);
}

export function hasMommy(C: Character): boolean {
    if (C?.IsPlayer?.()) return typeof modStorage.mommy?.id === "number";
    return typeof C?.LITTLISH_CLUB?.mommy?.id === "number";
}

export function getMommy(C: Character) {
    if (C?.IsPlayer?.()) return modStorage.mommy;
    return C?.LITTLISH_CLUB?.mommy;
}

export enum CaregiverAccessRightId {
    MANAGE_DIAPER = 1000,
    MANAGE_RULES = 1001,
    DELETE_NOTES = 1002,
    CHANGE_APPEARANCE = 1003
}

export interface CaregiverAccessRight {
    id: number
    name: string
    description: string
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