import { BaseSubscreen } from "zois-core/ui";
import { CyberDiaperModel, getCyberDiaperAssetName, StorageCyberDiaper } from "@/modules/cyberDiaper";
import { waitFor } from "zois-core";
import { serverAppearanceBundleToAppearance } from "zois-core/wardrobe";
import { CyberDiaperSettingsMenu } from "./cyberDiaperSettingsMenu";
import { AccessRight, hasAccessRightTo } from "@/modules/access";


export class CyberDiaperChangeColorMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    private cyberDiaperSettings: StorageCyberDiaper;

    get name() {
        return "Cyber Diaper > Settings > Change Color";
    }

    constructor(cyberDiaperSettings: StorageCyberDiaper) {
        super();
        this.cyberDiaperSettings = cyberDiaperSettings;
    }

    run() {
        if (this.canvasCharacter) DrawCharacter(this.canvasCharacter, 1200, 250, 0.7, false);
    }

    async load() {
        super.load();
        const asset = AssetGet(
            Player.AssetFamily,
            "ItemPelvis",
            getCyberDiaperAssetName(this.cyberDiaperSettings.model ?? CyberDiaperModel.BULKY_DIAPER)
        );
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

        // @ts-ignore
        if (!this.cyberDiaperSettings.color) this.cyberDiaperSettings.color = JSON.parse(JSON.stringify(asset.DefaultColor));

        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter2");
        this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
            this.canvasCharacter.AssetFamily, ServerAppearanceBundle(InformationSheetSelection.Appearance)
        );
        InventoryWear(this.canvasCharacter, asset.Name, asset.Group.Name, this.cyberDiaperSettings.color);
        CharacterRefresh(this.canvasCharacter);

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
                isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
                onClick: () => {
                    const defaultColor = JSON.parse(JSON.stringify(asset.DefaultColor[n]));
                    // @ts-ignore
                    InventoryGet(this.canvasCharacter, asset.Group.Name).Color[n] = defaultColor;
                    CharacterRefresh(this.canvasCharacter);
                    this.cyberDiaperSettings.color[n] = defaultColor;
                    layerColor.value = asset.DefaultColor[n];
                }
            });

            const layerColor = this.createInput({
                value: this.cyberDiaperSettings.color[layerN],
                x: 640,
                y: 220 + 100 * layerN,
                width: 200,
                height: 80,
                padding: 1,
                isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
                onInput: () => {
                    // @ts-ignore
                    InventoryGet(this.canvasCharacter, asset.Group.Name).Color[n] = layerColor.value;
                    CharacterRefresh(this.canvasCharacter);
                    this.cyberDiaperSettings.color[n] = layerColor.value;
                }
            });
            layerColor.setAttribute("type", "color");
            layerN++;
        });
    }

    exit() {
        super.exit();
        this.setSubscreen(new CyberDiaperSettingsMenu(this.cyberDiaperSettings));
    }
}