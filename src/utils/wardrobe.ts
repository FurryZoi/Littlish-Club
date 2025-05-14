import { MOD_NAME } from "@/constants";

export function smartGetAsset(item: Item | Asset): Asset {
    const asset = Asset.includes(item as Asset) ? item as Asset : (item as Item).Asset;
    if (!Asset.includes(asset)) {
        throw new Error("Failed to convert item to asset");
    }
    return asset;
}

export function smartGetAssetGroup(item: Item | Asset | AssetGroup): AssetGroup {
    const group = AssetGroup.includes(item as AssetGroup) ? item as AssetGroup : Asset.includes(item as Asset) ? (item as Asset).Group : (item as Item).Asset.Group;
    if (!AssetGroup.includes(group)) {
        throw new Error("Failed to convert item to group");
    }
    return group;
}

export function isAssetGroupName(name: string): name is AssetGroupName {
    return AssetGroup.some((group) => group.Name === name);
}

export function isCloth(item: Item | Asset | AssetGroup, allowCosplay: boolean = false): boolean {
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && group.AllowNone && group.Clothing && (allowCosplay || !group.BodyCosplay);
}

export function isCosplay(item: Item | Asset | AssetGroup): boolean {
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && group.AllowNone && group.Clothing && group.BodyCosplay;
}

export function isBody(item: Item | Asset | AssetGroup): boolean {
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && !group.Clothing;
}

export function isBind(
    item: Item | Asset | AssetGroup,
    excludeSlots: AssetGroupName[] = ["ItemNeck", "ItemNeckAccessories", "ItemNeckRestraints"]
): boolean {
    const group = smartGetAssetGroup(item);
    if (group.Category !== "Item" || group.BodyCosplay) return false;
    return !excludeSlots.includes(group.Name);
}

export type IncludeType = "Cosplay" | "Binds" | "Collar" | "Locks";

export function importAppearance(
    C: Character,
    bundleToAttach: Item[],
    include: IncludeType[] = ["Cosplay", "Binds", "Collar", "Locks"],
    characterValidate: Character = C,
    ignoreAccessValidation: boolean = false
): void {
    bundleToAttach = bundleToAttach.filter((i) => !!i && !isBody(i));
    if (!include.includes("Cosplay")) bundleToAttach = bundleToAttach.filter((i) => !isCosplay(i));
    if (!include.includes("Binds")) bundleToAttach = bundleToAttach.filter((i) => !isBind(i));
    if (!include.includes("Collar")) bundleToAttach = bundleToAttach.filter((i) => i.Asset.Group.Name !== "ItemNeck");
    if (!include.includes("Locks")) bundleToAttach = bundleToAttach.map((i) => {
        if (i.Property?.LockedBy) delete i.Property.LockedBy;
        return i;
    });

    const blockedGroups = [];
    if (ignoreAccessValidation) {
        C.Appearance = C.Appearance.filter((a) => isBody(a));
    } else {
        const validationParams = ValidationCreateDiffParams(characterValidate, Player.MemberNumber);
        C.Appearance = C.Appearance.filter((a) => {
            if (isBody(a)) {
                blockedGroups.push(a.Asset.Group.Name);
                return true;
            }
            if (
                !ValidationCanRemoveItem(
                    a, validationParams, !!bundleToAttach.find((b) => b?.Asset?.Group?.Name === a?.Asset?.Group?.Name)
                ) ||
                (
                    a.Property?.LockedBy &&
                    !DialogCanUnlock(characterValidate, a)
                ) ||
                (
                    a.Asset.Name === "SlaveCollar" &&
                    characterValidate.IsPlayer()
                )
            ) {
                blockedGroups.push(a.Asset.Group.Name);
                return true;
            }
            return false;
        });
    }
    
    for (const item of bundleToAttach) {
        if (!ignoreAccessValidation) {
            if (!validationCanAccessCheck(characterValidate, item.Asset.Group.Name, item.Asset)) continue;
            if (blockedGroups.includes(item.Asset.Group.Name)) continue;
        }
        CharacterAppearanceSetItem(C, item.Asset.Group.Name, item.Asset, item.Color);
        const _item = InventoryGet(C, item.Asset.Group.Name);
        if (item.Craft && CraftingValidate(item.Craft, item.Asset) !== CraftingStatusType.CRITICAL_ERROR) _item.Craft = item.Craft;
        if (item.Property) {
            ValidationSanitizeProperties(C, item);
            _item.Property = item.Property;
        }
    }

    CharacterRefresh(C);
    if (!C.IsNpc()) ChatRoomCharacterUpdate(C);
}

export function validationCanAccessCheck(C: Character, group: AssetGroupName, asset: Asset): boolean {
    return (
        !ValidationIsItemBlockedOrLimited(C, Player.MemberNumber, group, asset.Name) && ServerChatRoomGetAllowItem(Player, C)
    );
}