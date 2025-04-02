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
    console.log(item)
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

export function attachAppearance(currentBundle: Item[], bundleToAttach: Item[]): Item[] {
    console.log(currentBundle, bundleToAttach);
    return [
        ...currentBundle.filter((i) => !!i && isBody(i)),
        ...bundleToAttach.filter((i) => !!i && !isBody(i))
    ];
}