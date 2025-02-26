import { isRuleActive, isRuleEnabled, isRuleStrict, Rule, StorageRule } from "@/modules/rules";
import { BaseSubscreen } from "./baseSubscreen";
import { modStorage, syncStorage } from "@/modules/storage";
import { AccessRight, hasAccessRightTo } from "@/modules/access";


export class RuleSettingsMenu extends BaseSubscreen {
    private rule: Rule;
    private storageRule: StorageRule;

    get name() {
        return `Rules > ${this.rule.name}`
    }

    constructor(rule: Rule) {
        super();
        this.rule = rule;
        this.storageRule = modStorage.rules?.list?.find((r) => r.id === rule.id) ?? {
            id: rule.id,
            state: false,
            strict: false,
            addedBy: Player.MemberNumber,
            changedBy: Player.MemberNumber,
            ts: Date.now()
        }
        this.storageRule = JSON.parse(JSON.stringify(this.storageRule));
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

        const turnStateBtn = this.createButton({
            text: isRuleEnabled(this.rule.id) ? "State: Enabled" : "State: Disabled",
            x: 150,
            y: 250,
            width: 600,
            padding: 2
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            turnStateBtn.classList.add("lcDisabled");
        }
        turnStateBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                turnStateBtn.classList.add("lcDisabled");
            }
            this.storageRule.state = !this.storageRule.state;
            turnStateBtn.textContent = this.storageRule.state ? "State: Enabled" : "State: Disabled";
        });

        const turnStrictBtn = this.createButton({
            text: `Strict: ${isRuleStrict(this.rule.id) ? "Yes" : "No"}`,
            x: 150,
            y: 365,
            width: 600,
            padding: 2
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.TURN_RULE_STRICT_MODE)) {
            turnStrictBtn.classList.add("lcDisabled");
        }
        turnStrictBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.TURN_RULE_STRICT_MODE)) {
                turnStrictBtn.classList.add("lcDisabled");
            }
            this.storageRule.strict = !this.storageRule.strict;
            turnStrictBtn.textContent = this.storageRule.strict ? "Strict: Yes" : "Strict: No";
        });

        const triggerConditionsBtn = this.createButton({
            text: "Trigger Conditions: Any",
            x: 150,
            y: 525,
            width: 600,
            padding: 2
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            triggerConditionsBtn.classList.add("lcDisabled");
        }

        const whenInCheckbox = this.createCheckbox({
            text: "When in",
            x: 150,
            y: 640,
            isChecked: false
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            whenInCheckbox.classList.add("lcDisabled");
        }

        const publicBtn = this.createButton({
            text: "public",
            x: 450,
            y: 640,
            width: 120,
            height: 65,
            fontSize: 3
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            publicBtn.classList.add("lcDisabled");
        }

        this.createText({
            text: "rooms",
            x: 580,
            y: 640,
            fontSize: 5
        });


        const whenCheckbox = this.createCheckbox({
            text: "When",
            x: 150,
            y: 740,
            isChecked: false
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            whenCheckbox.classList.add("lcDisabled");
        }

        const inRoomBtn = this.createButton({
            text: "in room",
            x: 395,
            y: 740,
            width: 180,
            height: 65,
            fontSize: 3
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            inRoomBtn.classList.add("lcDisabled");
        }

        this.createText({
            text: "with role",
            x: 600,
            y: 740,
            fontSize: 5
        });

        const caregiverBtn = this.createButton({
            text: "caregiver",
            x: 805,
            y: 740,
            width: 180,
            height: 65,
            fontSize: 3
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            caregiverBtn.classList.add("lcDisabled");
        }

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
        saveChangesBtn.addEventListener("click", () => {
            if (!modStorage.rules) modStorage.rules = {};
            if (!modStorage.rules.list) modStorage.rules.list = [];
            let r = modStorage.rules.list.find((d) => d.id === this.rule.id);
            if (r) {
                for (let i in r) delete r[i];
                for (let i in this.storageRule) r[i] = this.storageRule[i];
            } else {
                modStorage.rules.list.push(this.storageRule);
            }
            syncStorage();
            this.exit();
        });
    }
}