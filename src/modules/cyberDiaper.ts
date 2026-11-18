import { colorsEqual } from "zois-core";
import { hookFunction, HookPriority } from "zois-core/mod-sdk";
import { modStorage, syncStorage } from "./storage";
import { logger } from "zois-core/logging";

export interface StorageCyberDiaper {
    name: string
    description: string
    model: CyberDiaperModel
    locked?: boolean
    color?: BCColor[] | null
    typeRecord?: TypeRecord
    property?: CraftingPropertyType
    drawingPriority?: AssetLayerOverridePriority
    changePermission?: CyberDiaperChangePermission
}

export enum CyberDiaperModel {
    POOFY_DIAPER = "POOFY_DIAPER",
    BULKY_DIAPER = "BULKY_DIAPER",
    CRINKY_DIAPER = "CRINKY_DIAPER"
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
        case CyberDiaperModel.CRINKY_DIAPER:
            return "Crinky Diaper";
        default:
            return "Bulky Diaper";
    }
}

export function getCyberDiaperAssetName(model: CyberDiaperModel): string {
    switch (model) {
        case CyberDiaperModel.BULKY_DIAPER:
            return "BulkyDiaper";
        case CyberDiaperModel.POOFY_DIAPER:
            return "PoofyDiaper";
        case CyberDiaperModel.CRINKY_DIAPER:
            return "UntrainersThin";
        default:
            return "BulkyDiaper";
    }
}

export function putCyberDiaperOn(): void {
    const cyberDiaper = modStorage.cyberDiaper;
    if (cyberDiaper === undefined) return;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaper.model));
    if (!asset) {
        logger.error("Diaper asset not found");
        return;
    }
    if (!Array.isArray(cyberDiaper.color) || asset.ColorableLayerCount !== cyberDiaper.color.length) {
        cyberDiaper.color = structuredClone(asset.DefaultColor) as BCColor[];
        syncStorage();
    }
    const color = cyberDiaper.color ?? asset.DefaultColor;
    const craft: CraftingPartialItem = {
        Name: cyberDiaper.name ?? "[No Name]",
        Description: cyberDiaper.description ?? "[No Description]",
        MemberName: "Littlish Club Production",
        MemberNumber: 133997,
        Partial: true,
        Effects: { Comfy: 1 },
        Private: true
    };
    const craftingValidationResult = CraftingValidate(craft, asset, true, false, true);
    const currentItem = AppearanceItem.fromAsset(asset, {
        color,
        property: {
            TypeRecord: cyberDiaper.typeRecord,
            OverridePriority: cyberDiaper.drawingPriority
        },
        craft: craftingValidationResult > CraftingStatusType.CRITICAL_ERROR ? craft : undefined,
        difficulty: 10,
    });
    ExtendedItemInit(Player, currentItem, false, false);
    Player.Appearance.push(currentItem);
    ChatRoomCharacterUpdate(Player);
}

export function takeCyberDiaperOff(): void {
    InventoryRemove(Player, "ItemPelvis");
    ChatRoomCharacterItemUpdate(Player, "ItemPelvis");
}

export function updateDiaperItem(): void {
    if (modStorage.cyberDiaper?.locked) putCyberDiaperOn();
    else takeCyberDiaperOff();
}

export function checkCyberDiaper(): void {
    const cyberDiaperStorage = modStorage.cyberDiaper;
    const cyberDiaperItem = InventoryGet(Player, "ItemPelvis");
    if (!cyberDiaperStorage?.locked) return;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaperStorage.model));
    if (!asset) return;
    if (
        !cyberDiaperItem ||
        cyberDiaperItem.Asset?.Name !== getCyberDiaperAssetName(cyberDiaperStorage.model) ||
        !colorsEqual(cyberDiaperStorage.color ?? asset.DefaultColor as BCColor[], cyberDiaperItem?.Color as BCColor[] ?? asset.DefaultColor)
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