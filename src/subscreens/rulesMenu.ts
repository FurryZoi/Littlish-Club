import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { isRuleActive, isRuleEnabled, rulesList } from "@/modules/rules";
import { RuleSettingsMenu } from "./ruleSettingsMenu";
import { MainMenu } from "./mainMenu";

export class RulesMenu extends BaseSubscreen {
    get name() {
        return "Rules";
    }

    get icon(): string {
        return `Icons/Management.png`;
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        rulesList.forEach((rule, i) => {
            const ruleBtn = this.createButton({
                text: rule.name,
                x: i > 4 ? 150 + 800 + 100 : 150,
                y: i > 4 ? 300 + ((i - 5) * 115) : 300 + (i * 115),
                width: 800,
                padding: 2,
                style: isRuleEnabled(InformationSheetSelection, rule.id) ? "green" : "default",
            });
            ruleBtn.style.fontWeight = "bold";
            ruleBtn.addEventListener("click", () => {
                this.setSubscreen(new RuleSettingsMenu(rule));
            });
        });
    }

    update() {
        this.unload();
        this.load();
    }

    exit() {
        this.setSubscreen(new MainMenu());
    }
}