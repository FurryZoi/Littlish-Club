import { isRuleActive, RuleId } from "@/modules/rules";
import { BaseSubscreen } from "./baseSubscreen";
import { resetStorage } from "@/modules/storage";

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
                text: `Mod Data Size: ${
                    Math.round(new TextEncoder().encode(Player.ExtensionSettings?.LITTLISH_CLUB ?? "").byteLength / 100) / 10
                }KB`,
                x: 150,
                y: 240,
                fontSize: 6
            });

            const resetBtn = this.createButton({
                text: "Reset settings",
                x: 100,
                y: 825,
                width: 500,
                padding: 2,
                icon: "Icons/ServiceBell.png"
            });
            if (isRuleActive(Player, RuleId.DISABLE_RESET_SETTINGS_BUTTON)) resetBtn.classList.add("lcDisabled");
            resetBtn.addEventListener("click", () => {
                if (isRuleActive(Player, RuleId.DISABLE_RESET_SETTINGS_BUTTON)) return;
                resetStorage();
                this.exit();
            });
        }
    }
}