import { BaseSubscreen } from "zois-core/ui";
import { RuleSettingsMenu } from "@/subscreens/ruleSettingsMenu";
import { Rule, StorageRule } from "@/modules/rules";

export class AboutRulesSettingsMenu extends BaseSubscreen {
    private rule: Rule;
    private ruleSettings: StorageRule;

    get name() {
        return "Rules > About Settings";
    }

    constructor(rule: Rule, ruleSettings: StorageRule) {
        super();
        this.rule = rule;
        this.ruleSettings = ruleSettings;
    }

    load() {
        super.load();

        this.createButton({
            text: this.ruleSettings.state ? "State: Enabled" : "State: Disabled",
            x: 150,
            y: 250,
            width: 600,
            padding: 2
        });

        this.createText({
            text: `- State of the rule, whether the rule can be triggered.`,
            x: 785,
            y: 250,
            padding: 2,
            width: 1000
        });

        this.createButton({
            text: `Strict: ${this.ruleSettings.strict ? "Yes" : "No"}`,
            x: 150,
            y: 365,
            width: 600,
            padding: 2
        });

        this.createText({
            text: `- Strictness of the rule, if the rule is strict, then <b>only</b> mommy can change its settings.`,
            x: 785,
            y: 365,
            padding: 2,
            width: 1000
        });

        this.createButton({
            text: (this.ruleSettings.conditions?.type ?? "any") === "any" ?
                "Trigger Conditions: Any"
                : "Trigger Conditions All",
            x: 150,
            y: 525,
            width: 600,
            padding: 2
        });

        this.createText({
            text: `- Trigger conditions of the rule. Conditions under which the rule is active, if the conditions are not set, then the rule is always active (if it is enabled)`,
            x: 785,
            y: 525,
            padding: 2,
            width: 1000
        });
    }

    exit() {
        super.exit();
        this.setSubscreen(new RuleSettingsMenu(this.rule, this.ruleSettings));
    }
}