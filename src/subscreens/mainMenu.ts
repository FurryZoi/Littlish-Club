import { CANVAS_BABIES_APPEARANCES, MOD_NAME, MOD_VERSION } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { GeneralMenu } from "./generalMenu";
import { FamilyMenu } from "./familyMenu";
import { RulesMenu } from "./rulesMenu";
import { serverAppearanceBundleToAppearance } from "@/utils/characters";
import { getRandomNumber } from "@/utils/main";
import { DiaperMenu } from "./diaperMenu";
import { NotesMenu } from "./notesMenu";

export class MainMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    run() {
        DrawCharacter(this.canvasCharacter, 1600, 350, 0.6, false);
        DrawCircle(1650, 575, 6, 2, "Black");
        DrawCircle(1625, 550, 8, 2, "Black");
        DrawCircle(1600, 525, 10, 2, "Black");
        
        DrawImageResize(
            "Icons/Notifications.png",
            70, 105, 80, 80
        );
    }
    load() {
        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        const appearance = JSON.parse(
            LZString.decompressFromBase64(
                CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)]
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

        const addBabyBtn = this.createButton({
            text: "Add baby",
            x: 1000,
            y: 820,
            width: 550,
            padding: 3,
            style: "inverted"
        });
        addBabyBtn.style.fontWeight = "bold";

        // this.createText({
        //     text: MOD_NAME,
        //     x: 1075,
        //     y: 120,
        //     fontSize: 10
        // });

        const hasMommy = false;
        this.createText({
            text: MOD_NAME + " (BETA)",
            x: 850,
            y: 120,
            fontSize: 10
        });

        if (!hasMommy) {
            this.createText({
                text: "You are currently in Exploring mode!",
                x: 150,
                y: 90,
                width: 600,
                padding: 1,
                withBackground: true
            }).style.textAlign = "center";
        }

        [
            new GeneralMenu(), new FamilyMenu(), new RulesMenu(),
            new DiaperMenu(), new NotesMenu()
        ].forEach((m, i) => {
            const btn = this.createButton({
                text: m.name,
                x: 150,
                y: (hasMommy ? 150 : 250) + 140 * i,
                width: 600,
                padding: 3,
                icon: m.icon ? m.icon : null
            });
            btn.style.fontWeight = "bold";
            btn.addEventListener("click", () => {
                this.setSubscreen(m);
            });
        });
    }
    exit() {
        this.setSubscreen(null);
    }
}