import { CANVAS_BABIES_APPEARANCES, MOD_NAME, MOD_VERSION } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { GlobalMenu } from "./globalMenu";
import { FamilyMenu } from "./familyMenu";
import { RulesMenu } from "./rulesMenu";
import { serverAppearanceBundleToAppearance } from "@/utils/characters";
import { getRandomNumber } from "@/utils/main";
import { CyberDiaperMenu } from "./cyberDiaperMenu";
import { NotesMenu } from "./notesMenu";
import { AddBabyMenu } from "./addBabyMenu";
import { WardrobeMenu } from "./wardrobeMenu";
import { ExploringModeMenu } from "./exploringModeMenu";
import { isExploringModeEnabled } from "@/modules/access";
import { modStorage } from "@/modules/storage";
import { CyberDiaperSettingsMenu } from "./cyberDiaperSettingsMenu";

export class MainMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    run() {
        DrawCharacter(this.canvasCharacter, 1600, 350, 0.6, false);
        DrawCircle(1650, 575, 6, 2, "Black");
        DrawCircle(1625, 550, 8, 2, "Black");
        DrawCircle(1600, 525, 10, 2, "Black");
    }
    
    load() {
        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        const appearance = JSON.parse(
            LZString.decompressFromBase64(
                CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)].bundle
            )
        );
        this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
            this.canvasCharacter.AssetFamily, appearance
        );
        PoseSetActive(this.canvasCharacter, "Kneel");
        CharacterRefresh(this.canvasCharacter);

        let cloudText = `Littlish Club v${MOD_VERSION}\nThanks for installing the mod!`;
        let cloudHtml = `Littlish Club <b>v${MOD_VERSION}</b><br>Thanks for installing the mod!`;
        if (this.canvasCharacter.IsGagged()) cloudHtml = `${SpeechTransformBabyTalk(cloudText)}<br><br>(${cloudHtml})`;
        const cloudBtn = this.createButton({
            x: 1000,
            y: 300,
            width: 550,
            height: 500
        });
        cloudBtn.innerHTML = cloudHtml;
        cloudBtn.style.pointerEvents = "none";
        cloudBtn.style.borderRadius = "4vw";

        if (InformationSheetSelection.IsPlayer()) {
            const addBabyBtn = this.createButton({
                text: "Add baby",
                x: 1000,
                y: 820,
                width: 550,
                padding: 3,
                style: "inverted"
            });
            addBabyBtn.style.fontWeight = "bold";
            addBabyBtn.addEventListener("click", () => {
                this.setSubscreen(new AddBabyMenu());
            });
        }

        const openWardrobeBtn = this.createButton({
            icon: "Icons/Rectangle/Dress.png",
            width: 90,
            height: 90,
            x: 1815,
            y: 340
        });
        openWardrobeBtn.addEventListener("click", () => {
            this.setSubscreen(new WardrobeMenu());
        });

        // this.createText({
        //     text: MOD_NAME,
        //     x: 1075,
        //     y: 120,
        //     fontSize: 10
        // });

        this.createText({
            text: MOD_NAME + " (BETA)",
            x: 850,
            y: 120,
            fontSize: 10
        });

        if (InformationSheetSelection.IsPlayer() && isExploringModeEnabled()) {
            this.createText({
                text: "You are currently in Exploring mode!",
                x: 150,
                y: 90,
                width: 600,
                padding: 1,
                withBackground: true
            }).style.textAlign = "center";

            const exploringModeBtn = this.createButton({
                icon: "Icons/Notifications.png",
                padding: 1,
                fontSize: 2,
                x: 160,
                y: 150,
                width: 50,
                height: 50
            });
            exploringModeBtn.addEventListener("click", () => {
                this.setSubscreen(new ExploringModeMenu());
            });
        }

        [
            new GlobalMenu(), new FamilyMenu(), new RulesMenu(),
            new CyberDiaperMenu(), new NotesMenu()
        ].forEach((m, i) => {
            const btn = this.createButton({
                text: m.name,
                x: 150,
                y: ((InformationSheetSelection.IsPlayer() && isExploringModeEnabled()) ? 250 : 150) + 140 * i,
                width: 600,
                padding: 3,
                icon: m.icon ?? null
            });
            btn.style.fontWeight = "bold";
            btn.addEventListener("click", () => {
                const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
                if (m.name === "Cyber Diaper" && storage.cyberDiaper) {
                    this.setSubscreen(new CyberDiaperSettingsMenu());
                } else this.setSubscreen(m);
            });
        });
    }
    exit() {
        this.setSubscreen(null);
    }
}