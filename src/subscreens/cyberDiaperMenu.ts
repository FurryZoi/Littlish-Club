import { BaseSubscreen } from "zois-core/ui";
import { CyberDiaperSettingsMenu } from "./cyberDiaperSettingsMenu";
import { modStorage, syncStorage } from "@/modules/storage";
import { CyberDiaperModel } from "@/modules/cyberDiaper";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { toastsManager } from "zois-core/popups";

export class CyberDiaperMenu extends BaseSubscreen {
    get name() {
        return "Cyber Diaper";
    }

    get icon(): string {
        return `Icons/Diaper.png`;
    }

    load() {
        super.load();

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

        this.createButton({
            text: "Buy Cyber Diaper for 499$",
            x: 500,
            y: 800,
            width: 1000,
            padding: 2,
            fontSize: 8,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onClick: () => {
                if (Player.Money < 499) return toastsManager.error({ message: "Not enough money.", duration: 3000 });
                CharacterChangeMoney(Player, -499);
                toastsManager.success({ message: "Successfully bought Cyber Diaper.", duration: 4000 });
                modStorage.cyberDiaper = {
                    name: "Default diaper name",
                    description: "Default diaper description",
                    model: CyberDiaperModel.BULKY_DIAPER
                };
                syncStorage();
                this.setSubscreen(new CyberDiaperSettingsMenu());
            }
        });
    }
}