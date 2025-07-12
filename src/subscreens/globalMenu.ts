import { isRuleActive, RuleId } from "@/modules/rules";
import { BaseSubscreen } from "zois-core/ui";
import { resetStorage } from "@/modules/storage";
import { OneButtonMenu } from "./common/oneButtonMenu";
import { MainMenu } from "./mainMenu";
import { AccessRight, hasAccessRightTo, hasMommy } from "@/modules/access";
import { messagesManager } from "zois-core/messaging";
import { getSizeInKbytes, version as zcVersion } from "zois-core";
import { version } from "@/../package.json";

export class GlobalMenu extends BaseSubscreen {
    get name() {
        return "Global";
    }

    get icon(): string {
        return `Icons/General.png`;
    }

    load() {
        super.load();

        if (InformationSheetSelection.IsPlayer()) {
            this.createText({
                text: `Mod Data Size: ${getSizeInKbytes(Player.ExtensionSettings?.LITTLISH_CLUB ?? "")}KB`,
                x: 150,
                y: 240,
                fontSize: 6
            });

            this.createText({
                text: `Littlish Club: v${version} (ZC v${zcVersion})`,
                x: 150,
                y: 320,
                fontSize: 6
            });

            this.createButton({
                text: "Reset Settings",
                x: 100,
                y: 825,
                width: 500,
                height: 110,
                icon: "Icons/ServiceBell.png",
                isDisabled: () => isRuleActive(Player, RuleId.DISABLE_RESET_SETTINGS_BUTTON),
                onClick: () => {
                    this.setSubscreen(
                        new OneButtonMenu({
                            screenName: "Global > Reset Settings",
                            content: "Are you sure you want to reset all your mod data?",
                            buttonText: "Reset Settings",
                            onClick: resetStorage
                        })
                    );
                }
            });
        }

        this.createButton({
            text: "Release Baby",
            x: 1400,
            y: 825,
            width: 500,
            height: 110,
            icon: "Icons/Cancel.png",
            isDisabled: () => (
                !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.RELEASE_BABY) ||
                !hasMommy(InformationSheetSelection)
            ),
            onClick: () => {
                this.setSubscreen(
                    new OneButtonMenu({
                        screenName: "Global > Release Baby",
                        content: "Are you sure you want to release baby?",
                        buttonText: "Release Baby",
                        onClick: () => {
                            messagesManager.sendPacket("releaseBaby", null, InformationSheetSelection.MemberNumber);
                        }
                    })
                );
            }
        });
    }

    exit() {
        super.exit();
        this.setSubscreen(new MainMenu());
    }
}