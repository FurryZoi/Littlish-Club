import { BaseSubscreen } from "zois-core/ui";
import { CyberDiaperModel, getCyberDiaperAssetName, StorageCyberDiaper } from "@/modules/cyberDiaper";
import { waitFor } from "zois-core";
import { serverAppearanceBundleToAppearance } from "zois-core/wardrobe";
import { CyberDiaperSettingsMenu } from "./cyberDiaperSettingsMenu";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { logger } from "zois-core/logging";


export class CyberDiaperChangeColorMenu extends BaseSubscreen {
    private canvasCharacter: Character | null = null;
    private cyberDiaperSettings: StorageCyberDiaper;

    get name() {
        return "Cyber Diaper > Settings > Change Color";
    }

    constructor(cyberDiaperSettings: StorageCyberDiaper) {
        super();
        this.cyberDiaperSettings = cyberDiaperSettings;
    }

    public override run() {
        if (this.canvasCharacter) DrawCharacter(this.canvasCharacter, 1200, 250, 0.7, false);
    }

    public override async load() {
        super.load();

        if (InformationSheetSelection === null) {
            logger.error("InformationSheetSelection is null at CyberDiaperChangeColorMenu loading");
            return;
        }

        const asset = AssetGet(
            Player.AssetFamily,
            "ItemPelvis",
            getCyberDiaperAssetName(this.cyberDiaperSettings.model ?? CyberDiaperModel.BULKY_DIAPER)
        );

        if (asset === null) {
            logger.error("Can't get diaper asset at CyberDiaperChangeColorMenu loading");
            return;
        }

        if (!ItemColorLayerNames) {
            ItemColorLayerNames = new TextCache(`Assets/${Player.AssetFamily}/LayerNames.csv`);
            const loadingText = this.createText({
                text: "Loading LayerNames.csv...",
                x: 400,
                y: 400,
                width: 1200,
                fontSize: 6
            });
            loadingText.style.textAlign = "center";
            await waitFor(() => ItemColorLayerNames.loaded);
            loadingText.remove();
        }

        if (!this.cyberDiaperSettings.color) this.cyberDiaperSettings.color = JSON.parse(JSON.stringify(asset.DefaultColor));

        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter2");
        this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
            this.canvasCharacter.AssetFamily, ServerAppearanceBundle(InformationSheetSelection.Appearance)
        );
        InventoryWear(this.canvasCharacter, asset.Name, asset.Group.Name, this.cyberDiaperSettings.color);
        CharacterRefresh(this.canvasCharacter);

        const defaultColor: BCColor = JSON.parse(JSON.stringify(asset.DefaultColor));

        let layerN = 0;
        asset.Layer.forEach((l) => {
            if (!l.AllowColorize || !ItemColorLayerNames.cache[`${asset.Group.Name}${asset.Name}${l.Name}`]) return;

            const n = layerN;
            const layerName = this.createButton({
                text: ItemColorLayerNames.cache[`${asset.Group.Name}${asset.Name}${l.Name}`],
                x: 100,
                y: 220 + 100 * layerN,
                width: 500,
                height: 80,
                isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
                onClick: () => {
                    if (this.canvasCharacter) {
                        const item = InventoryGet(this.canvasCharacter, asset.Group.Name);
                        if (item) {
                            item.Color ??= defaultColor;
                            //@ts-expect-error
                            item.Color[n] = defaultColor[n];
                            CharacterRefresh(this.canvasCharacter);
                        }
                    }
                    this.cyberDiaperSettings.color ??= [];
                    //@ts-expect-error
                    this.cyberDiaperSettings.color[n] = defaultColor[n];
                    layerColor.value = asset.DefaultColor[n];
                }
            });

            const layerColor = this.createInput({
                value: this.cyberDiaperSettings.color?.[layerN],
                x: 640,
                y: 220 + 100 * layerN,
                width: 200,
                height: 80,
                padding: 1,
                isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
                onInput: () => {
                    if (this.canvasCharacter) {
                        const item = InventoryGet(this.canvasCharacter, asset.Group.Name);
                        if (item) {
                            item.Color ??= defaultColor;
                            //@ts-expect-error
                            item.Color[n] = layerColor.value;
                            CharacterRefresh(this.canvasCharacter);
                        }
                    }
                    this.cyberDiaperSettings.color ??= [];
                    //@ts-expect-error
                    this.cyberDiaperSettings.color[n] = layerColor.value;
                }
            });
            layerColor.setAttribute("type", "color");
            layerN++;
        });
    }

    public override exit() {
        super.exit();
        this.setSubscreen(new CyberDiaperSettingsMenu(this.cyberDiaperSettings));
    }
}