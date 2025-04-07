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

export function attachAppearance(
    currentBundle: Item[],
    bundleToAttach: Item[],
    include: IncludeType[] = ["Cosplay", "Binds", "Collar", "Locks"]
): Item[] {
    currentBundle = currentBundle.filter((i) => !!i && isBody(i));
    bundleToAttach = bundleToAttach.filter((i) => !!i && !isBody(i));
    if (!include.includes("Cosplay")) bundleToAttach = bundleToAttach.filter((i) => !isCosplay(i));
    if (!include.includes("Binds")) bundleToAttach = bundleToAttach.filter((i) => !isBind(i));
    if (!include.includes("Collar")) bundleToAttach = bundleToAttach.filter((i) => i.Asset.Group.Name !== "ItemNeck");
    if (!include.includes("Locks")) bundleToAttach = bundleToAttach.map((i) => {
        if (i.Property?.LockedBy) delete i.Property.LockedBy;
        return i;
    });
    return [
        ...currentBundle,
        ...bundleToAttach
    ];
}