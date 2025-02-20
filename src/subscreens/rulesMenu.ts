import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { isRuleActive, rulesList } from "@/modules/rules";

export class RulesMenu extends BaseSubscreen {
    get buttonText() {
        return "Rules";
    }

    load() {
        this.createText({
            text: "Rules",
            x: 100,
            y: 60,
            fontSize: 10
        });

        rulesList.forEach((rule, i) => {
            const ruleBtn = this.createButton({
                text: rule.name,
                x: i > 3 ? 150 + 800 + 100 : 150,
                y: i > 3 ? 300 + ((i - 4) * 150) : 300 + (i * 150),
                width: 800,
                padding: 3,
                style: isRuleActive(rule.id) ? "default" : "green",
            });
            ruleBtn.style.fontWeight = "bold";
        });
    }
}