import { serverAppearanceBundleToAppearance } from "@/utils/characters";
import { BaseSubscreen } from "./baseSubscreen";
import { CANVAS_BABIES_APPEARANCES } from "@/constants";
import { getRandomNumber } from "@/utils/main";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { AboutWardrobeMenu } from "./introductions/aboutWardrobeMenu";
import { MainMenu } from "./mainMenu";
import { attachAppearance, IncludeType } from "@/utils/wardrobe";

export class WardrobeMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    private currentAppearance = CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)];
    private includeTypes: IncludeType[] = ["Binds", "Cosplay", "Collar", "Locks"];
    private requiredModsElement: HTMLParagraphElement;
    private creatorNameElement: HTMLParagraphElement;

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

        this.creatorNameElement = this.createText({
            text: `<b>Creator:</b> ${this.currentAppearance.creator}`,
            x: 1400,
            y: 240,
            width: 425
        });
        this.creatorNameElement.style.textAlign = "center";

        this.includeTypes.forEach((d, i) => {
            this.createCheckbox({
                text: d,
                x: 1500,
                y: 380 + (80 * i),
                isChecked: true
            }).addEventListener("click", () => {
                if (this.includeTypes.includes(d)) this.includeTypes.splice(this.includeTypes.indexOf(d), 1);
                else this.includeTypes.push(d);
                this.refresh();
            });
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
                this.currentAppearance = a;
                this.refresh();
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

        this.loadRequiredModsWarning();
    }

    loadRequiredModsWarning() {
        if (
            Array.isArray(this.currentAppearance.requiredMods) &&
            this.currentAppearance.requiredMods.length > 0
        ) {
            this.requiredModsElement = this.createText({
                text: `Required mods: ${this.currentAppearance.requiredMods.map((d) => `<b>${d}</b>`).join(", ")}`,
                x: 1400,
                y: 840,
                width: 500,
                padding: 2,
                withBackground: true
            });
        }
    }

    refresh() {
        const appearanceBundle = serverAppearanceBundleToAppearance(
            InformationSheetSelection.AssetFamily,
            JSON.parse(
                LZString.decompressFromBase64(this.currentAppearance.bundle)
            )
        );
        this.canvasCharacter.Appearance = attachAppearance(InformationSheetSelection.Appearance, appearanceBundle, this.includeTypes);
        // ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, appearanceBundle, Player.MemberNumber);
        CharacterRefresh(this.canvasCharacter);
        this.creatorNameElement.innerHTML = `<b>Creator:</b> ${this.currentAppearance.creator}`;
        if (typeof this.requiredModsElement !== "undefined") this.requiredModsElement.remove();
        this.loadRequiredModsWarning();
    }

    exit() {
        this.setSubscreen(new MainMenu());
    }
}