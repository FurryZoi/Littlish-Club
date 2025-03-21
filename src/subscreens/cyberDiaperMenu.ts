import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { notify } from "@/modules/ui";
import { CyberDiaperSettingsMenu } from "./cyberDiaperSettingsMenu";
import { modStorage, syncStorage } from "@/modules/storage";
import { CyberDiaperModel } from "@/modules/cyberDiaper";
import { AccessRight, hasAccessRightTo } from "@/modules/access";

export class CyberDiaperMenu extends BaseSubscreen {
    get name() {
        return "Cyber Diaper";
    }

    get icon(): string {
        return `Icons/Diaper.png`;
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createText({
            text: `I believe that babies should wear a reliable diaper 24/7 and that it should be convenient to change it. I present to you my latest development - CYBER DIAPER.`,
            x: 400,
            y: 200,
            width: 1200,
            fontSize: 6
        }).style.textAlign = "center";

        this.createText({
            text: `Cyber diaper is a high-tech diaper equipped with a large capacity and a system that allows you to lock it and change it without removing it.`,
            x: 400,
            y: 500,
            width: 1200,
            fontSize: 6
        }).style.textAlign = "center";

        const buyBtn = this.createButton({
            text: "Buy Cyber Diaper for 499$",
            x: 500,
            y: 800,
            width: 1000,
            padding: 2,
            fontSize: 8
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            buyBtn.classList.add("lcDisabled");
        }
        buyBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return buyBtn.classList.add("lcDisabled");
            }
            if (Player.Money < 499) return notify("Not enough money.");
            CharacterChangeMoney(Player, -499);
            notify("Successfully bought Cyber Diaper.");
            modStorage.cyberDiaper = {
                name: "Default diaper name",
                description: "Default diaper description",
                model: CyberDiaperModel.BULKY_DIAPER
            };
            syncStorage();
            this.setSubscreen(new CyberDiaperSettingsMenu());
        });
    }
}