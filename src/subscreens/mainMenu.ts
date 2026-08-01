import { CANVAS_BABIES_APPEARANCES, DISCORD_SERVER_INVITE_LINK, MOD_NAME, MY_APPEARANCE_BUNDLE } from "@/constants";
import { version } from "@/../package.json";
import { BaseSubscreen, cssVar } from "zois-core/ui";
import { GlobalMenu } from "./globalMenu";
import { FamilyMenu } from "./familyMenu";
import { RulesMenu } from "./rulesMenu";
import { getRandomNumber } from "zois-core";
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
import { findModByName } from "zois-core/mod-sdk";
import { StyleModule } from "zois-core/shard-modules";
import { showChangelogModal } from "zois-core/changelogs";

export class MainMenu extends BaseSubscreen {
    private canvasCharacter!: Character;
    private circleColor!: string;

    private static characters: Character[] = [];

    public static createCharacters() {
        MainMenu.characters = [];
        for (const outfit of CANVAS_BABIES_APPEARANCES) {
            const canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
            const babyBundle = LZString.decompressFromBase64(outfit.bundle);
            if (!babyBundle) continue;
            const babyAppearance = serverAppearanceBundleToAppearance(Player.AssetFamily, JSON.parse(babyBundle));

            const myAppearanceBundle = LZString.decompressFromBase64(MY_APPEARANCE_BUNDLE);
            if (!myAppearanceBundle) continue;
            ServerAppearanceLoadFromBundle(canvasCharacter, canvasCharacter.AssetFamily, JSON.parse(myAppearanceBundle));
            importAppearance(canvasCharacter, babyAppearance);
            PoseSetActive(canvasCharacter, "Kneel");
            CharacterRefresh(canvasCharacter);
            MainMenu.characters.push(canvasCharacter);
        }
    }

    get name() {
        return "";
    }

    public override run() {
        DrawCharacter(this.canvasCharacter, 1500, 350, 0.6, false);
        DrawCircle(1550, 575, 6, 2, this.circleColor);
        DrawCircle(1525, 550, 8, 2, this.circleColor);
        DrawCircle(1500, 525, 10, 2, this.circleColor);
        if (MouseIn(1580, 500, 150, 180) && document.body.style.cursor != "pointer") document.body.style.cursor = "pointer";
        if (!MouseIn(1580, 500, 150, 180) && document.body.style.cursor != "") document.body.style.cursor = "";
    }

    public override load() {
        super.load();
        const selection = InformationSheetSelection;
        if (selection === null) return;

        this.createCharacter();

        if (selection.IsPlayer()) {
            const addBabyBtn = this.createButton({
                text: "Add Baby",
                x: 900,
                y: 820,
                width: 550,
                height: 115,
                variant: "filled",
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
            href: DISCORD_SERVER_INVITE_LINK,
            modules: {
                base: [
                    new StyleModule({
                        zIndex: "10"
                    })
                ]
            }
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

        this.createButton({
            icon: "Icons/Changelog.png",
            width: 90,
            height: 90,
            x: 95,
            y: 60,
            anchor: "bottom-right",
            variant: "filled",
            onClick: showChangelogModal
        });

        if (selection.IsPlayer()) {
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

        if (selection.IsPlayer() && isExploringModeEnabled()) {
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
                y: ((selection.IsPlayer() && isExploringModeEnabled()) ? 225 : 150) + 115 * i,
                width: 600,
                height: 100,
                icon: m.icon ?? null,
                onClick: () => {
                    const storage = selection.IsPlayer() ? modStorage : selection.LITTLISH_CLUB;
                    if (m.name === "Cyber Diaper" && storage?.cyberDiaper) {
                        this.setSubscreen(new CyberDiaperSettingsMenu());
                    } else this.setSubscreen(m);
                }
            });
            btn.style.fontWeight = "bold";
        });
    }

    private createCharacter() {
        const selection = InformationSheetSelection;
        if (selection === null) return;
        this.canvasCharacter = MainMenu.characters[getRandomNumber(0, MainMenu.characters.length - 1)];
        this.circleColor = cssVar("--tmd-text", "black");

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
    }

    public override click() {
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

    public override async exit() {
        super.exit();
        this.setSubscreen(null);
        await InformationSheetLoad();
        InformationSheetResize();
    }
}