import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { isRuleActive, isRuleEnabled, isRuleStrict, rulesList } from "@/modules/rules";
import { RuleSettingsMenu } from "./ruleSettingsMenu";
import { MainMenu } from "./mainMenu";
import { RulesMarkingMenu } from "./introductions/rulesMarkingMenu";


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

        const rulesMarkingBtn = this.createButton({
            icon: "Icons/Notifications.png",
            width: 90,
            height: 90,
            x: 1815,
            y: 175
        });
        rulesMarkingBtn.style.zIndex = "10";
        rulesMarkingBtn.addEventListener("click", () => {
            this.setSubscreen(new RulesMarkingMenu());
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
                place: false,
                icon: isRuleStrict(InformationSheetSelection, rule.id) ? "Icons/Management.png" : null,
                iconAbsolutePosition: false,
                iconWidth: "12.5%"
            });
            if (isRuleEnabled(InformationSheetSelection, rule.id) && !isRuleActive(InformationSheetSelection, rule.id)) {
                ruleBtn.style.color = "red";
            }
            ruleBtn.style.fontWeight = "bold";
            ruleBtn.style.position = "relative";
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