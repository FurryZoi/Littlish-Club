import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { isRuleActive, isRuleEnabled, rulesList } from "@/modules/rules";
import { RuleSettingsMenu } from "./ruleSettingsMenu";
import { MainMenu } from "./mainMenu";


let scrollTop: number | null = null; 


export class RulesMenu extends BaseSubscreen {
    private rulesBlock: HTMLDivElement;

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

        this.rulesBlock = this.createScrollView({
            scroll: "y",
            x: 200,
            y: 300,
            width: 1600,
            height: 600
        });
        this.rulesBlock.style.display = "grid";
        this.rulesBlock.style.gridTemplateColumns = "1fr 1fr";
        this.rulesBlock.style.gap = "1vw";

        rulesList.forEach((rule) => {
            const ruleBtn = this.createButton({
                text: rule.name,
                padding: 3,
                style: isRuleEnabled(InformationSheetSelection, rule.id) ? "green" : "default",
                place: false
            });
            ruleBtn.style.fontWeight = "bold";
            ruleBtn.setAttribute("data-lc-ruleId", rule.id);
            ruleBtn.addEventListener("click", () => {
                scrollTop = this.rulesBlock.scrollTop;
                this.setSubscreen(new RuleSettingsMenu(rule));
            });
            this.rulesBlock.append(ruleBtn);
        });

        if (scrollTop) this.rulesBlock.scrollBy({ top: scrollTop });
    }

    update() {
        for (const ruleElement of this.rulesBlock.children) {
            ruleElement.setAttribute(
                "data-lc-style",
                isRuleEnabled(InformationSheetSelection, parseInt(ruleElement.getAttribute("data-lc-ruleId"))) ? "green" : null
            );
        }
    }

    exit() {
        scrollTop = null;
        this.setSubscreen(new MainMenu());
    }
}