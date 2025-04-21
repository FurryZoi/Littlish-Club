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

        const searchInput = this.createInput({
            x: 400,
            y: 170,
            width: 1200,
            padding: 2,
            placeholder: "Search rule"
        });
        searchInput.addEventListener("input", (e) => this.refreshRules((e.target as HTMLInputElement).value));

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

        this.refreshRules();

        if (scrollTop) this.rulesBlock.scrollBy({ top: scrollTop });
    }

    refreshRules(searchFilter?: string) {
        this.rulesBlock.innerHTML = "";
        rulesList.forEach((rule) => {
            if (searchFilter && !rule.name.toLowerCase().includes(searchFilter.toLowerCase())) return;
            const ruleBtn = this.createButton({
                text: rule.name,
                padding: 3,
                style: isRuleEnabled(InformationSheetSelection, rule.id) ? "green" : "default",
                place: false
            });
            ruleBtn.style.fontWeight = "bold";
            // ruleBtn.style.height = "fit-content";
            ruleBtn.setAttribute("data-lc-ruleId", rule.id);
            ruleBtn.addEventListener("click", () => {
                scrollTop = this.rulesBlock.scrollTop;
                this.setSubscreen(new RuleSettingsMenu(rule));
            });
            this.rulesBlock.append(ruleBtn);
        });
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