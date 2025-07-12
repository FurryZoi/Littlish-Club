import { CANVAS_BABIES_APPEARANCES, DISCORD_SERVER_INVITE_LINK, MOD_NAME, MY_APPEARANCE_BUNDLE } from "@/constants";
import { version } from "@/../package.json";
import { BaseSubscreen } from "zois-core/ui";
import { GlobalMenu } from "./globalMenu";
import { FamilyMenu } from "./familyMenu";
import { RulesMenu } from "./rulesMenu";
import { getRandomNumber, getThemedColorsModule } from "zois-core";
import { CyberDiaperMenu } from "./cyberDiaperMenu";
import { NotesMenu } from "./notesMenu";
import { AddBabyMenu } from "./addBabyMenu";
import { WardrobeMenu } from "./wardrobeMenu";
import { ExploringModeMenu } from "./introductions/exploringModeMenu";
import { isExploringModeEnabled } from "@/modules/access";
import { modStorage } from "@/modules/storage";
import { CyberDiaperSettingsMenu } from "./cyberDiaperSettingsMenu";
import { LogsMenu } from "./logsMenu";
import discordIcon from "@/images/discord.png";
import rattleIcon from "@/images/rattle.png";
import { importAppearance, serverAppearanceBundleToAppearance } from "zois-core/wardrobe";
import { AttributionsMenu } from "./attributionsMenu";
import { SummoningRattleMenu } from "./summoningRattleMenu";
import { findModByName } from "zois-core/modsApi";

export class MainMenu extends BaseSubscreen {
    private canvasCharacter: Character;
    private circleColor: string;

    run() {
        DrawCharacter(this.canvasCharacter, 1500, 350, 0.6, false);
        DrawCircle(1550, 575, 6, 2, this.circleColor);
        DrawCircle(1525, 550, 8, 2, this.circleColor);
        DrawCircle(1500, 525, 10, 2, this.circleColor);
        if (MouseIn(1580, 500, 150, 180) && document.body.style.cursor != "pointer") document.body.style.cursor = "pointer";
        if (!MouseIn(1580, 500, 150, 180) && document.body.style.cursor != "") document.body.style.cursor = "";
    }

    load() {
        super.load();
        this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        const babyAppearance = serverAppearanceBundleToAppearance(InformationSheetSelection.AssetFamily, JSON.parse(
            LZString.decompressFromBase64(
                CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)].bundle
            )
        ));
        ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, JSON.parse(
            LZString.decompressFromBase64(
                MY_APPEARANCE_BUNDLE
            )
        ));
        importAppearance(this.canvasCharacter, babyAppearance);
        PoseSetActive(this.canvasCharacter, "Kneel");
        CharacterRefresh(this.canvasCharacter);

        this.circleColor = findModByName("Themed") ? getThemedColorsModule()?.base?.text ?? "black" : "black";

        let cloudText = `Littlish Club v${version}\nThanks for installing the mod!`;
        let cloudHtml = `Littlish Club <b>v${version}</b><br>Thanks for installing the mod!`;
        if (this.canvasCharacter.IsGagged()) cloudHtml = `${SpeechTransformBabyTalk(cloudText)}<br><br>(${cloudHtml})`;
        const cloudBtn = this.createButton({
            x: 900,
            y: 300,
            width: 550,
            height: 500
        });
        cloudBtn.innerHTML = cloudHtml;
        cloudBtn.style.pointerEvents = "none";
        cloudBtn.style.borderRadius = "4vw";
        cloudBtn.style.display = "block";

        if (InformationSheetSelection.IsPlayer()) {
            const addBabyBtn = this.createButton({
                text: "Add Baby",
                x: 900,
                y: 820,
                width: 550,
                height: 115,
                style: "inverted",
                onClick: () => {
                    this.setSubscreen(new AddBabyMenu());
                }
            });
            addBabyBtn.style.fontWeight = "bold";
        }

        this.createButton({
            icon: discordIcon,
            width: 90,
            height: 90,
            x: 1815,
            y: 235,
            onClick: () => open(DISCORD_SERVER_INVITE_LINK)
        });

        this.createButton({
            icon: "Icons/Rectangle/Dress.png",
            width: 90,
            height: 90,
            x: 1815,
            y: 340,
            onClick: () => {
                this.setSubscreen(new WardrobeMenu());
            }
        });

        this.createButton({
            icon: "Icons/Graphics.png",
            width: 90,
            height: 90,
            x: 1815,
            y: 445,
            onClick: () => {
                this.setSubscreen(new AttributionsMenu());
            }
        });

        if (InformationSheetSelection.IsPlayer()) {
            this.createButton({
                icon: rattleIcon,
                width: 90,
                height: 90,
                x: 1815,
                y: 550,
                onClick: () => {
                    this.setSubscreen(new SummoningRattleMenu());
                }
            });
        }

        this.createText({
            text: MOD_NAME,
            x: 940,
            y: 110,
            fontSize: 14
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

            this.createButton({
                icon: "Icons/Notifications.png",
                fontSize: 2,
                x: 160,
                y: 145,
                width: 50,
                height: 50,
                onClick: () => {
                    this.setSubscreen(new ExploringModeMenu());
                }
            });
        }

        [
            new GlobalMenu(), new FamilyMenu(), new RulesMenu(),
            new CyberDiaperMenu(), new NotesMenu(), new LogsMenu()
        ].forEach((m, i) => {
            const btn = this.createButton({
                text: m.name,
                x: 150,
                y: ((InformationSheetSelection.IsPlayer() && isExploringModeEnabled()) ? 225 : 150) + 115 * i,
                width: 600,
                height: 100,
                icon: m.icon ?? null,
                onClick: () => {
                    const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
                    if (m.name === "Cyber Diaper" && storage.cyberDiaper) {
                        this.setSubscreen(new CyberDiaperSettingsMenu());
                    } else this.setSubscreen(m);
                }
            });
            btn.style.fontWeight = "bold";
        });
    }

    click() {
        if (MouseIn(1580, 500, 150, 180)) {
            CharacterSetFacialExpression(this.canvasCharacter, "Blush", "Medium");
            CharacterSetFacialExpression(this.canvasCharacter, "Eyes", "Daydream");
            CharacterSetFacialExpression(this.canvasCharacter, "Emoticon", "Tear");
            setTimeout(() => {
                CharacterSetFacialExpression(this.canvasCharacter, "Blush", null);
                CharacterSetFacialExpression(this.canvasCharacter, "Eyes", null);
                CharacterSetFacialExpression(this.canvasCharacter, "Emoticon", null);
            }, 2000);
        }
    }

    exit() {
        super.exit();
        this.setSubscreen(null);
    }
}