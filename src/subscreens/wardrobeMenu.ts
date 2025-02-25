import { serverAppearanceBundleToAppearance } from "@/utils/characters";
import { BaseSubscreen } from "./baseSubscreen";
import { CANVAS_BABIES_APPEARANCES } from "@/constants";
import { getRandomNumber } from "@/utils/main";

export class WardrobeMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    private currentAppearance = CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)];

    get name() {
        return "Littlish Wardrobe";
    }

    run() {
        DrawCharacter(this.canvasCharacter, 1100, 100, 0.8, false);
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        const appearanceBundle = JSON.parse(
            LZString.decompressFromBase64(
                this.currentAppearance.bundle
            )
        );
        this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
            this.canvasCharacter.AssetFamily, appearanceBundle
        );
        CharacterRefresh(this.canvasCharacter);

        const createrName = this.createText({
            text: `By ${this.currentAppearance.creator}`,
            x: 1600,
            y: 240
        });

        const scrollView = this.createScrollView({
            scroll: "y",
            x: 160,
            y: 260,
            width: 750,
            height: 500
        });
        scrollView.style.display = "flex";
        scrollView.style.flexDirection = "column";
        scrollView.style.alignItems = "center";
        scrollView.style.rowGap = "1vw";

        CANVAS_BABIES_APPEARANCES.forEach((a) => {
            const btn = this.createButton({
                text: a.name,
                padding: 2,
                icon: "Icons/Rectangle/Dress.png",
                place: false
            });
            btn.style.width = "95%";
            btn.style.position = "relative";
            btn.addEventListener("click", () => {
                const appearanceBundle = JSON.parse(
                    LZString.decompressFromBase64(
                        a.bundle
                    )
                );
                this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
                    this.canvasCharacter.AssetFamily, appearanceBundle
                );
                CharacterRefresh(this.canvasCharacter);
                createrName.textContent = `By ${a.creator}`;
            });
            scrollView.append(btn);
        });

        this.createButton({
            text: "Apply",
            x: 160,
            y: 800,
            width: 750,
            padding: 2,
            style: "inverted"
        });
    }
}