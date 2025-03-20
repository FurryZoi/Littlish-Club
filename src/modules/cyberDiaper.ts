import { colorsEqual } from "@/utils/main";
import { hookFunction, HookPriority } from "./bcModSdk";
import { modStorage } from "./storage";

export interface StorageCyberDiaper {
    name: string
    description: string
    model: CyberDiaperModel
    locked?: boolean
    color?: string[],
    changePermission?: CyberDiaperChangePermission,
    crotchColor?: string | null
}

export enum CyberDiaperModel {
    POOFY_DIAPER = "POOFY_DIAPER",
    BULKY_DIAPER = "BULKY_DIAPER"
}

export enum CyberDiaperChangePermission {
    EVERYONE = "EVERYONE",
    EVERYONE_EXCEPT_WEARER = "EVERYONE_EXCEPT_WEARER",
    CAREGIVERS = "CAREGIVERS",
    MOMMY = "MOMMY"
}

export const cyberDiaperChangePermissionsHierarchy: CyberDiaperChangePermission[] = [
    CyberDiaperChangePermission.EVERYONE,
    CyberDiaperChangePermission.EVERYONE_EXCEPT_WEARER,
    CyberDiaperChangePermission.CAREGIVERS,
    CyberDiaperChangePermission.MOMMY
];

export function getNextCyberDiaperChangePermission(p: CyberDiaperChangePermission): CyberDiaperChangePermission {
	if (cyberDiaperChangePermissionsHierarchy.indexOf(p) === cyberDiaperChangePermissionsHierarchy.length - 1) return cyberDiaperChangePermissionsHierarchy[0];
	return cyberDiaperChangePermissionsHierarchy[cyberDiaperChangePermissionsHierarchy.indexOf(p) + 1];
}

export function getCyberDiaperModelName(model: CyberDiaperModel): string {
    switch (model) {
        case CyberDiaperModel.BULKY_DIAPER:
            return "Bulky Diaper";
        case CyberDiaperModel.POOFY_DIAPER:
            return "Poofy Diaper";
    }
}

export function getCyberDiaperAssetName(model: CyberDiaperModel): string {
    switch (model) {
        case CyberDiaperModel.BULKY_DIAPER:
            return "BulkyDiaper";
        case CyberDiaperModel.POOFY_DIAPER:
            return "PoofyDiaper";
    }
}

export function putCyberDiaperOn(): void {
    const cyberDiaper = modStorage.cyberDiaper;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaper.model ?? CyberDiaperModel.BULKY_DIAPER));
    InventoryWear(Player, getCyberDiaperAssetName(cyberDiaper.model ?? CyberDiaperModel.BULKY_DIAPER), "ItemPelvis", cyberDiaper.color, 10, 0, {
        Name: cyberDiaper.name ?? "[No Name]",
        Description: cyberDiaper.description ?? "[No Description]",
        MemberName: "Littlish Club Production",
        MemberNumber: 133997,
        Property: "Comfy",
        Color: (cyberDiaper.color ?? asset.DefaultColor).join(","),
        Lock: "",
        Item: getCyberDiaperAssetName(cyberDiaper.model ?? CyberDiaperModel.BULKY_DIAPER),
        Private: true,
        ItemProperty: null
    });
    ChatRoomCharacterItemUpdate(Player, "ItemPelvis");
}

export function takeCyberDiaperOff(): void {
    InventoryRemove(Player, "ItemPelvis");
    ChatRoomCharacterItemUpdate(Player, "ItemPelvis");
}

export function setCyberDiaperCrotchColor(color: string | null): void {
    if (!modStorage.cyberDiaper?.locked) return;
    modStorage.cyberDiaper.crotchColor = color;
    putCyberDiaperOn();
}

export function updateDiaperItem(): void {
    if (modStorage.cyberDiaper.locked) putCyberDiaperOn();
    else takeCyberDiaperOff();
}

export function checkCyberDiaper(): void {
    const cyberDiaperStorage = modStorage.cyberDiaper;
    const cyberDiaperItem = InventoryGet(Player, "ItemPelvis");
    if (!cyberDiaperStorage?.locked) return;
    if (!cyberDiaperItem) putCyberDiaperOn();
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaperStorage.model));
    if (
        !cyberDiaperItem ||
        cyberDiaperItem.Asset?.Name !== getCyberDiaperAssetName(cyberDiaperStorage.model) ||
        // @ts-ignore
        !colorsEqual(cyberDiaperStorage.color ?? asset.DefaultColor, cyberDiaperItem.Color ?? asset.DefaultColor)
    ) putCyberDiaperOn();
}

export function loadCyberDiaper(): void {
    hookFunction("ChatRoomCharacterItemUpdate", HookPriority.OBSERVE, (args, next) => {
        next(args);
        checkCyberDiaper();
    });

    hookFunction("ChatRoomSyncItem", HookPriority.OBSERVE, (args, next) => {
        next(args);
        checkCyberDiaper();
    });

    hookFunction("ChatRoomSyncSingle", HookPriority.OBSERVE, (args, next) => {
        next(args);
        checkCyberDiaper();
    });
}