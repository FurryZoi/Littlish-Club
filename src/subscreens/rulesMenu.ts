import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "zois-core/ui";
import { isRuleActive, isRuleEnabled, isRuleStrict, rulesList } from "@/modules/rules";
import { RuleSettingsMenu } from "./ruleSettingsMenu";
import { MainMenu } from "./mainMenu";
import { RulesMarkingMenu } from "./introductions/rulesMarkingMenu";
import { DynamicClassModule, StyleModule } from "zois-core/shard-modules";


let scrollTop: number | null = null;


export class RulesMenu extends BaseSubscreen {
    private rulesBlock!: HTMLDivElement;

    get name() {
        return "Rules";
    }

    get icon(): string {
        return `Icons/Management.png`;
    }

    public override load() {
        super.load();

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

        this.rulesBlock = this.createContainer({
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

    private refreshRules(searchFilter?: string) {
        if (InformationSheetSelection === null) return;
        const selection = InformationSheetSelection;
        this.rulesBlock.innerHTML = "";
        rulesList.forEach((rule) => {
            if (searchFilter && !rule.name.toLowerCase().includes(searchFilter.toLowerCase())) return;
            const ruleBtn = this.createButton({
                text: rule.name,
                padding: 2,
                parent: this.rulesBlock,
                icon: isRuleStrict(selection, rule.id) ? "Icons/Management.png" : undefined,
                iconAbsolutePosition: false,
                modules: {
                    base: [
                        ...(isRuleEnabled(selection, rule.id) ? [new DynamicClassModule({
                            base: {
                                background: "#cbffc0 !important",
                                borderColor: "#6bbd18 !important",
                            }
                        })] : [])
                    ],
                    icon: [
                        new StyleModule({
                            width: "12.5%"
                        })
                    ]
                }
            });
            if (isRuleEnabled(selection, rule.id) && !isRuleActive(selection, rule.id)) {
                ruleBtn.style.color = "red";
            }
            ruleBtn.style.fontWeight = "bold";
            ruleBtn.style.position = "relative";
            ruleBtn.setAttribute("data-lc-ruleId", rule.id);
            ruleBtn.addEventListener("click", () => {
                scrollTop = this.rulesBlock.scrollTop;
                this.setSubscreen(new RuleSettingsMenu(rule));
            });
        });
    }

    public override update() {
        this.refreshRules();
        if (scrollTop) this.rulesBlock.scrollBy({ top: scrollTop });
    }

    public override exit() {
        super.exit();
        scrollTop = null;
        this.setSubscreen(new MainMenu());
    }
}