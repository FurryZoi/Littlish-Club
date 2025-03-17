import { getRuleParameter, isRuleActive, isRuleEnabled, isRuleStrict, Rule, StorageRule } from "@/modules/rules";
import { BaseSubscreen } from "./baseSubscreen";
import { modStorage, syncStorage } from "@/modules/storage";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { chatSendModMessage } from "@/utils/chat";


export class RuleSettingsMenu extends BaseSubscreen {
    private rule: Readonly<Rule>;
    private ruleSettings: StorageRule;

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

        const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
        this.ruleSettings = storage.rules?.list?.find((r) => r.id === this.rule.id) ?? {
            id: this.rule.id,
            state: false,
            strict: false,
            changedBy: Player.MemberNumber,
            ts: Date.now()
        };
        this.ruleSettings = JSON.parse(JSON.stringify(this.ruleSettings));

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

        this.rule.data?.forEach((param, i) => {
            if (param.type !== "checkbox") {
                this.createText({
                    text: param.text + ":",
                    x: 1000,
                    y: 420 + i * 140,
                    width: 400,
                    fontSize: 5
                });
            }

            if (param.type === "number") {
                const input = this.createInput({
                    value: getRuleParameter(InformationSheetSelection, this.rule.id, param.name)?.toString() ?? "",
                    placeholder: param.type,
                    x: 1350,
                    y: 420,
                    width: 500,
                    height: 80
                });
                input.setAttribute("type", param.type);
                if (param.min) input.setAttribute("min", param.min);
                if (param.max) input.setAttribute("max", param.max);
                if (param.step) input.setAttribute("step", param.step);
                if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                    input.classList.add("lcDisabled");
                }
                input.addEventListener("change", () => {
                    if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                        return input.classList.add("lcDisabled");
                    }
                    if (param.min && parseFloat(input.value) < param.min) return;
                    if (param.max && parseFloat(input.value) > param.max) return;
                    if (!this.ruleSettings.data) this.ruleSettings.data = {};
                    this.ruleSettings.data[param.name] = (param.type === "number") ? parseFloat(input.value) : input.value;
                });
            } else if (param.type === "checkbox") {
                const checkbox = this.createCheckbox({
                    x: 1000,
                    y: 440,
                    width: 800,
                    isChecked: !!getRuleParameter(InformationSheetSelection, this.rule.id, param.name),
                    text: param.text
                });
                if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                    checkbox.classList.add("lcDisabled");
                }
                checkbox.addEventListener("change", () => {
                    if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                        return checkbox.classList.add("lcDisabled");
                    }
                    if (!this.ruleSettings.data) this.ruleSettings.data = {};
                    this.ruleSettings.data[param.name] = checkbox.checked;
                });
            }
        });

        const turnStateBtn = this.createButton({
            text: isRuleEnabled(InformationSheetSelection, this.rule.id) ? "State: Enabled" : "State: Disabled",
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
            this.ruleSettings.state = !this.ruleSettings.state;
            turnStateBtn.textContent = this.ruleSettings.state ? "State: Enabled" : "State: Disabled";
        });

        const turnStrictBtn = this.createButton({
            text: `Strict: ${this.ruleSettings.strict ? "Yes" : "No"}`,
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
            this.ruleSettings.strict = !this.ruleSettings.strict;
            turnStrictBtn.textContent = this.ruleSettings.strict ? "Strict: Yes" : "Strict: No";
        });

        const triggerConditionsBtn = this.createButton({
            text: (this.ruleSettings.conditions?.type ?? "any") === "any" ?
                "Trigger Conditions: Any"
                : "Trigger Conditions All",
            x: 150,
            y: 525,
            width: 600,
            padding: 2
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            triggerConditionsBtn.classList.add("lcDisabled");
        }
        triggerConditionsBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                return triggerConditionsBtn.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
            this.ruleSettings.conditions.type = (this.ruleSettings.conditions?.type ?? "any") === "any" ? "all" : "any";
            triggerConditionsBtn.textContent = (this.ruleSettings.conditions?.type ?? "any") === "any" ?
                "Trigger Conditions: Any"
                : "Trigger Conditions All";

        });

        const whenCheckbox = this.createCheckbox({
            text: "When",
            x: 150,
            y: 650,
            isChecked: !!this.ruleSettings.conditions?.whenInRoomWithRole
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            whenCheckbox.classList.add("lcDisabled");
        }

        const inRoomBtn = this.createButton({
            text: (this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true) ? "in room" : "not in room",
            x: 395,
            y: 650,
            width: 180,
            height: 65,
            fontSize: 3
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            inRoomBtn.classList.add("lcDisabled");
        }
        inRoomBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                inRoomBtn.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
            // @ts-ignore
            if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
            this.ruleSettings.conditions.whenInRoomWithRole.inRoom = !(this.ruleSettings.conditions.whenInRoomWithRole.inRoom ?? true);
            inRoomBtn.textContent = (this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true) ? "in room" : "not in room";
        });

        this.createText({
            text: "with role",
            x: 600,
            y: 650,
            fontSize: 5
        });

        const caregiverBtn = this.createButton({
            text: this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver",
            x: 805,
            y: 650,
            width: 180,
            height: 65,
            fontSize: 3
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            caregiverBtn.classList.add("lcDisabled");
        }
        caregiverBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                caregiverBtn.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
            // @ts-ignore
            if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
            this.ruleSettings.conditions.whenInRoomWithRole.role = (this.ruleSettings.conditions.whenInRoomWithRole.role ?? "caregiver") === "caregiver" ?
                "mommy"
                : "caregiver";
            caregiverBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver";
        });

        this.createText({
            text: "and higher",
            x: 1000,
            y: 650,
            fontSize: 5
        });

        const whenCheckbox2 = this.createCheckbox({
            text: "When in room where ABDL is",
            x: 150,
            y: 750,
            isChecked: !!this.ruleSettings.conditions?.whenInRoomWhereAbdl
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            whenCheckbox2.classList.add("lcDisabled");
        }

        const isBlockedBtn = this.createButton({
            text: (this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true) ? "blocked" : "not blocked",
            x: 930,
            y: 750,
            width: 200,
            height: 65,
            fontSize: 3
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            isBlockedBtn.classList.add("lcDisabled");
        }
        isBlockedBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
                isBlockedBtn.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
            // @ts-ignore
            if (!this.ruleSettings.conditions.whenInRoomWhereAbdl) this.ruleSettings.conditions.whenInRoomWhereAbdl = {};
            this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked = !(this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked ?? true);
            isBlockedBtn.textContent = (this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true) ? "blocked" : "not blocked";
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
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) {
            saveChangesBtn.classList.add("lcDisabled");
        }
        saveChangesBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)) return;
            if (whenCheckbox.checked) {
                if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                // @ts-ignore
                if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
                if (typeof this.ruleSettings.conditions.whenInRoomWithRole.inRoom !== "boolean") {
                    this.ruleSettings.conditions.whenInRoomWithRole.inRoom = true;
                }
                if (typeof this.ruleSettings.conditions.whenInRoomWithRole.role !== "string") {
                    this.ruleSettings.conditions.whenInRoomWithRole.role = "caregiver";
                }
            } else delete this.ruleSettings.conditions?.whenInRoomWithRole;
            if (whenCheckbox2.checked) {
                if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                // @ts-ignore
                if (!this.ruleSettings.conditions.whenInRoomWhereAbdl) this.ruleSettings.conditions.whenInRoomWhereAbdl = {};
                if (typeof this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked !== "boolean") {
                    this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked = true;
                }
            } else delete this.ruleSettings.conditions?.whenInRoomWhereAbdl;
            if (InformationSheetSelection.IsPlayer()) {
                if (!modStorage.rules) modStorage.rules = {};
                if (!modStorage.rules.list) modStorage.rules.list = [];
                let r = modStorage.rules.list.find((d) => d.id === this.rule.id);
                if (r) {
                    for (let i in r) delete r[i];
                    for (let i in this.ruleSettings) r[i] = this.ruleSettings[i];
                } else {
                    modStorage.rules.list.push(this.ruleSettings);
                }
                syncStorage();
            } else {
                let dataToSend: Partial<StorageRule> = {
                    id: this.ruleSettings.id,
                    state: this.ruleSettings.state,
                    strict: this.ruleSettings.strict,
                };
                if (this.ruleSettings.data) dataToSend.data = this.ruleSettings.data;
                if (this.ruleSettings.conditions) dataToSend.conditions = this.ruleSettings.conditions;
                chatSendModMessage("changeRuleSettings", dataToSend, InformationSheetSelection.MemberNumber);
            }
            this.exit();
        });
    }
}