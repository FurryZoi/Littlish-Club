import { serverAppearanceBundleToAppearance } from "@/utils/characters";
import { BaseSubscreen } from "./baseSubscreen";
import { CANVAS_BABIES_APPEARANCES } from "@/constants";
import { getRandomNumber } from "@/utils/main";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { AboutWardrobeMenu } from "./introductions/aboutWardrobeMenu";
import { MainMenu } from "./mainMenu";
import { attachAppearance } from "@/modules/wardrobe";

export class WardrobeMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    private currentAppearance = CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)];

    get name() {
        return "Littlish Wardrobe";
    }

    constructor(currentAppearance?: {
        name: string
        creator: string
        bundle: string
        requiredMods?: string[]
    }) {
        super();
        if (currentAppearance) this.currentAppearance = currentAppearance;
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

        this.createButton({
            icon: "Icons/Notifications.png",
            width: 90,
            height: 90,
            x: 1815,
            y: 175
        }).addEventListener("click", () => {
            this.setSubscreen(new AboutWardrobeMenu(this.currentAppearance));
        });

        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        const appearanceBundle = serverAppearanceBundleToAppearance(InformationSheetSelection.AssetFamily, JSON.parse(
            LZString.decompressFromBase64(
                this.currentAppearance.bundle
            )
        ));
        this.canvasCharacter.Appearance = attachAppearance(InformationSheetSelection.Appearance, appearanceBundle);
        // ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, appearanceBundle, Player.MemberNumber);
        CharacterRefresh(this.canvasCharacter);

        const createrName = this.createText({
            text: `<b>Creator:</b> ${this.currentAppearance.creator}`,
            x: 1400,
            y: 240,
            width: 500
        });
        createrName.style.textAlign = "center";

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
                this.currentAppearance = a;
                const appearanceBundle = serverAppearanceBundleToAppearance(InformationSheetSelection.AssetFamily, JSON.parse(
                    LZString.decompressFromBase64(
                        a.bundle
                    )
                ));
                this.canvasCharacter.Appearance = attachAppearance(InformationSheetSelection.Appearance, appearanceBundle);
                // ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, appearanceBundle, Player.MemberNumber);
                CharacterRefresh(this.canvasCharacter);
                createrName.innerHTML = `<b>Creator:</b> ${a.creator}`;
                if (typeof requiredModsText !== "undefined") requiredModsText.remove();
                if (
                    Array.isArray(this.currentAppearance.requiredMods) &&
                    this.currentAppearance.requiredMods.length > 0
                ) {
                    requiredModsText = this.createText({
                        text: `Required mods: ${this.currentAppearance.requiredMods.map((d) => `<b>${d}</b>`).join(", ")}`,
                        x: 1400,
                        y: 850,
                        width: 500,
                        padding: 2,
                        withBackground: true
                    });
                }
            });
            scrollView.append(btn);
        });

        const applyBtn = this.createButton({
            text: "Apply",
            x: 160,
            y: 800,
            width: 750,
            padding: 2,
            style: "inverted"
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_APPEARANCE)) {
            applyBtn.classList.add("lcDisabled");
        }
        applyBtn.addEventListener("click", () => {
            const appearanceBundle = ServerAppearanceBundle(this.canvasCharacter.Appearance);
            ServerAppearanceLoadFromBundle(InformationSheetSelection, this.canvasCharacter.AssetFamily, appearanceBundle, Player.MemberNumber);
            ChatRoomCharacterUpdate(InformationSheetSelection);
            this.exit();
        });

        let requiredModsText: HTMLParagraphElement;
        if (
            Array.isArray(this.currentAppearance.requiredMods) &&
            this.currentAppearance.requiredMods.length > 0
        ) {
            requiredModsText = this.createText({
                text: `Required mods: ${this.currentAppearance.requiredMods.map((d) => `<b>${d}</b>`).join(", ")}`,
                x: 1400,
                y: 850,
                width: 500,
                padding: 2,
                withBackground: true
            });
        }
    }

    exit() {
        this.setSubscreen(new MainMenu());
    }
}