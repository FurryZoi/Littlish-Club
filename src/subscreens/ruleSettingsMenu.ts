import { isRuleActive, Rule } from "@/modules/rules";
import { BaseSubscreen } from "./baseSubscreen";

export class RuleSettingsMenu extends BaseSubscreen {
    private rule: Rule;
    
    get name() {
        return `Rules > ${this.rule.name}`
    }

    constructor(rule: Rule) {
        super();
        this.rule = rule;
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        const description = this.createText({
            text: `${this.rule.description}`,
            x: 1000,
            y: 250,
            width: 800,
            fontSize: 6,
            withBackground: true,
            padding: 2
        });
        description.style.textAlign = "center";

        this.createButton({
            text: "State: Enabled",
            x: 150,
            y: 250,
            width: 600,
            padding: 2
        });

        this.createButton({
            text: "Type: Strict",
            x: 150,
            y: 365,
            width: 600,
            padding: 2
        });

        this.createButton({
            text: "Trigger Conditions: Any",
            x: 150,
            y: 525,
            width: 600,
            padding: 2
        });

        this.createCheckbox({
            text: "When in",
            x: 150,
            y: 640,
            isChecked: false
        });

        this.createButton({
            text: "public",
            x: 450,
            y: 640,
            width: 120,
            height: 65,
            fontSize: 3
        });

        this.createText({
            text: "rooms",
            x: 580,
            y: 640,
            fontSize: 5
        });


        this.createCheckbox({
            text: "When",
            x: 150,
            y: 740,
            isChecked: false
        });

        this.createButton({
            text: "in room",
            x: 395,
            y: 740,
            width: 180,
            height: 65,
            fontSize: 3
        });

        this.createText({
            text: "with role",
            x: 600,
            y: 740,
            fontSize: 5
        });

        this.createButton({
            text: "caretaker",
            x: 805,
            y: 740,
            width: 180,
            height: 65,
            fontSize: 3
        });

        this.createText({
            text: "and higher",
            x: 1000,
            y: 740,
            fontSize: 5
        });

        const saveChangesBtn = this.createButton({
            text: "Save Changes",
            x: 1520,
            y: 790,
            width: 400,
            height: 150,
            style: "green"
        });
        saveChangesBtn.style.fontWeight = "bold";
    }
}