import { isRuleActive, RuleId } from "@/modules/rules";
import { BaseSubscreen } from "./baseSubscreen";
import { resetStorage } from "@/modules/storage";
import { OneButtonMenu } from "./shared/oneButtonMenu";
import { MainMenu } from "./mainMenu";
import { AccessRight, hasAccessRightTo, hasMommy } from "@/modules/access";
import { chatSendModMessage } from "@/utils/chat";
import { getSizeInKbytes } from "@/utils/main";

export class GlobalMenu extends BaseSubscreen {
    get name() {
        return "Global";
    }

    get icon(): string {
        return `Icons/General.png`;
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        if (InformationSheetSelection.IsPlayer()) {
            this.createText({
                text: `Mod Data Size: ${getSizeInKbytes(Player.ExtensionSettings?.LITTLISH_CLUB ?? "")}KB`,
                x: 150,
                y: 240,
                fontSize: 6
            });

            const resetBtn = this.createButton({
                text: "Reset Settings",
                x: 100,
                y: 825,
                width: 500,
                padding: 2,
                icon: "Icons/ServiceBell.png"
            });
            if (isRuleActive(Player, RuleId.DISABLE_RESET_SETTINGS_BUTTON)) resetBtn.classList.add("lcDisabled");
            resetBtn.addEventListener("click", () => {
                if (isRuleActive(Player, RuleId.DISABLE_RESET_SETTINGS_BUTTON)) return;
                this.setSubscreen(
                    new OneButtonMenu({
                        screenName: "Global > Reset Settings",
                        content: "Are you sure you want to reset all your mod data?",
                        buttonText: "Reset Settings",
                        onClick: resetStorage
                    })
                )
            });
        }

        const releaseBtn = this.createButton({
            text: "Release Baby",
            x: 1400,
            y: 825,
            width: 500,
            padding: 2,
            icon: "Icons/Cancel.png"
        });
        if (
            !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.RELEASE_BABY) ||
            !hasMommy(InformationSheetSelection)
        ) releaseBtn.classList.add("lcDisabled");
        releaseBtn.addEventListener("click", () => {
            if (
                !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.RELEASE_BABY) ||
                !hasMommy(InformationSheetSelection)
            ) return releaseBtn.classList.add("lcDisabled");
            this.setSubscreen(
                new OneButtonMenu({
                    screenName: "Global > Release Baby",
                    content: "Are you sure you want to release baby?",
                    buttonText: "Release Baby",
                    onClick: () => {
                        chatSendModMessage("releaseBaby", null, InformationSheetSelection.MemberNumber);
                    }
                })
            );
        });
    }

    exit() {
        this.setSubscreen(new MainMenu());
    }
}