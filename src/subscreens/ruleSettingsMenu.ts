import { getRuleParameter, isRuleActive, isRuleEnabled, isRuleStrict, Rule, StorageRule } from "@/modules/rules";
import { BaseSubscreen } from "zois-core/ui";
import { modStorage, syncStorage } from "@/modules/storage";
import { AccessRight, hasAccessRightTo, isExploringModeEnabled, isMommyOf } from "@/modules/access";
import { messagesManager } from "zois-core/messaging";
import { addLog } from "@/modules/logs";
import { getNickname } from "zois-core";
import { ChangeRuleSettingsMessageData } from "@/types/messages";
import { AboutRulesSettingsMenu } from "./introductions/aboutRulesSettingsMenu";
import { RulesMenu } from "./rulesMenu";


export class RuleSettingsMenu extends BaseSubscreen {
    private rule: Readonly<Rule>;
    private ruleSettings: StorageRule;
    private canChangeSettings() {
        return (
            hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_RULES)
            && (
                !isRuleStrict(InformationSheetSelection, this.rule.id) ||
                isMommyOf(Player, InformationSheetSelection) ||
                (
                    InformationSheetSelection.IsPlayer() &&
                    isExploringModeEnabled()
                )
            )
        );
    }

    get name() {
        return `Rules > ${this.rule.name}`
    }

    constructor(rule: Rule, ruleSettings?: StorageRule) {
        super();
        this.rule = rule;
        if (ruleSettings) this.ruleSettings = ruleSettings;
        else {
            const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
            this.ruleSettings = storage.rules?.list?.find((r) => r.id === this.rule.id) ?? {
                id: this.rule.id,
                state: false,
                strict: false,
                changedBy: null,
                ts: null
            };
            this.ruleSettings = JSON.parse(JSON.stringify(this.ruleSettings));
        }
    }

    load() {
        super.load();

        const openIntroBtn = this.createButton({
            icon: "Icons/Notifications.png",
            width: 90,
            height: 90,
            x: 1815,
            y: 175,
            onClick: () => {
                this.setSubscreen(new AboutRulesSettingsMenu(this.rule, this.ruleSettings));
            }
        });
        openIntroBtn.style.zIndex = "10";

        const description = this.createText({
            text: `${this.rule.description}`,
            x: 850,
            y: 215,
            width: 900,
            height: 125,
            fontSize: 4,
            withBackground: true,
            padding: 1
        });
        description.style.overflowY = "scroll";

        const paramsView = this.createScrollView({
            x: 850,
            y: 360,
            width: 1050,
            height: 375,
            scroll: "y"
        });
        paramsView.style.display = "flex";
        paramsView.style.flexDirection = "column";
        paramsView.style.rowGap = "1vw";

        this.rule.data?.forEach((param) => {
            const paramBlock = document.createElement("div");
            paramBlock.style.cssText = "display: flex; align-items: center; column-gap: 0.8vw; width: 100%;";

            if (!["checkbox", "list"].includes(param.type)) {
                const paramText = this.createText({
                    text: param.text + ":",
                    fontSize: 4,
                    place: false
                });
                paramText.style.whiteSpace = "nowrap";
                paramBlock.append(paramText);
            }

            if (param.type === "number") {
                const input = this.createInput({
                    value: this.ruleSettings.data?.[param.name]?.toString() ?? "",
                    placeholder: param.type,
                    width: 500,
                    height: 70,
                    place: false,
                    isDisabled: () => !this.canChangeSettings(),
                    onChange: () => {
                        if (param.min && parseFloat(input.value) < param.min) return;
                        if (param.max && parseFloat(input.value) > param.max) return;
                        if (!this.ruleSettings.data) this.ruleSettings.data = {};
                        this.ruleSettings.data[param.name] = (param.type === "number") ? parseFloat(input.value) : input.value;
                    }
                });
                input.style.width = "100%";
                input.setAttribute("type", param.type);
                if (param.min) input.setAttribute("min", param.min);
                if (param.max) input.setAttribute("max", param.max);
                if (param.step) input.setAttribute("step", param.step);
                paramBlock.append(input);
            } else if (param.type === "text") {
                const input = this.createInput({
                    value: this.ruleSettings.data?.[param.name]?.toString() ?? "",
                    placeholder: param.type,
                    width: 500,
                    height: 70,
                    place: false,
                    isDisabled: () => !this.canChangeSettings(),
                    onChange: () => {
                        if (!this.ruleSettings.data) this.ruleSettings.data = {};
                        this.ruleSettings.data[param.name] = input.value;
                    }
                });
                input.style.width = "100%";
                input.setAttribute("type", param.type);
                paramBlock.append(input);
            } else if (param.type === "checkbox") {
                const checkbox = this.createCheckbox({
                    width: 800,
                    isChecked: !!this.ruleSettings.data?.[param.name],
                    text: param.text,
                    place: false,
                    isDisabled: () => !this.canChangeSettings(),
                    onChange: () => {
                        if (!this.ruleSettings.data) this.ruleSettings.data = {};
                        this.ruleSettings.data[param.name] = !this.ruleSettings.data[param.name];
                    }
                });
                paramBlock.append(checkbox);
            } else if (param.type === "color") {
                const input = this.createInput({
                    width: 500,
                    height: 70,
                    value: this.ruleSettings.data?.[param.name]?.toString(),
                    padding: 1,
                    place: false,
                    isDisabled: () => !this.canChangeSettings(),
                    onChange: () => {
                        if (!this.ruleSettings.data) this.ruleSettings.data = {};
                        this.ruleSettings.data[param.name] = input.value;
                    }
                });
                input.style.width = "100%";
                input.setAttribute("type", param.type);
                paramBlock.append(input);
            } else if (param.type === "list") {
                paramBlock.append(
                    this.createInputList({
                        title: param.text,
                        width: 1050,
                        height: 400,
                        value: (this.ruleSettings.data?.[param.name] ?? []) as [],
                        numbersOnly: param.listNumbersOnly,
                        place: false,
                        padding: 1,
                        isDisabled: () => !this.canChangeSettings(),
                        onChange: (value) => {
                            if (!this.ruleSettings.data) this.ruleSettings.data = {};
                            this.ruleSettings.data[param.name] = value;
                        }
                    })
                );
            } else if (param.type === "extended") {
                const btn = this.createButton({
                    text: this.ruleSettings.data?.[param.name] ?
                        "Assigned"
                        : "Not assigned",
                    place: false,
                    padding: 1,
                    isDisabled: () => !this.canChangeSettings(),
                    onClick: () => {
                        param.get(this.rule, this.ruleSettings);
                    }
                });
                paramBlock.append(btn);
            }
            paramsView.append(paramBlock);
        });

        const lastTimeWasChanged = this.createText({
            text: `Last time it was changed by ${this.ruleSettings.changedBy ?? "-"} at ${this.ruleSettings.ts ? new Date(this.ruleSettings.ts).toUTCString() : "-"}`,
            x: 150,
            y: 215,
            width: 600,
            height: 145,
            padding: 1,
            fontSize: 4
        });
        lastTimeWasChanged.style.background = "var(--tmd-element, rgb(235, 235, 255))";
        lastTimeWasChanged.style.borderLeft = "0.4vw solid var(--tmd-accent, rgb(199 199 241))";
        lastTimeWasChanged.style.overflowY = "scroll";

        const turnStateBtn = this.createButton({
            text: this.ruleSettings.state ? "State: Enabled" : "State: Disabled",
            x: 150,
            y: 380,
            width: 600,
            padding: 2,
            isDisabled: () => !this.canChangeSettings(),
            onClick: () => {
                this.ruleSettings.state = !this.ruleSettings.state;
                turnStateBtn.textContent = this.ruleSettings.state ? "State: Enabled" : "State: Disabled";
            }
        });

        const turnStrictBtn = this.createButton({
            text: `Strict: ${this.ruleSettings.strict ? "Yes" : "No"}`,
            x: 150,
            y: 490,
            width: 600,
            padding: 2,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.TURN_RULE_STRICT_MODE),
            onClick: () => {
                this.ruleSettings.strict = !this.ruleSettings.strict;
                turnStrictBtn.textContent = this.ruleSettings.strict ? "Strict: Yes" : "Strict: No";
            }
        });

        const triggerConditionsBtn = this.createButton({
            text: (this.ruleSettings.conditions?.type ?? "any") === "any" ?
                "Trigger Conditions: Any"
                : "Trigger Conditions All",
            x: 150,
            y: 625,
            width: 600,
            padding: 2,
            isDisabled: () => !this.canChangeSettings(),
            onClick: () => {
                if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                this.ruleSettings.conditions.type = (this.ruleSettings.conditions?.type ?? "any") === "any" ? "all" : "any";
                triggerConditionsBtn.textContent = (this.ruleSettings.conditions?.type ?? "any") === "any" ?
                    "Trigger Conditions: Any"
                    : "Trigger Conditions All";
            }
        });

        const whenCheckbox = this.createCheckbox({
            text: "When",
            x: 150,
            y: 750,
            isChecked: !!this.ruleSettings.conditions?.whenInRoomWithRole,
            isDisabled: () => !this.canChangeSettings(),
            onChange: () => {
                if (this.ruleSettings.conditions?.whenInRoomWithRole) {
                    delete this.ruleSettings.conditions.whenInRoomWithRole;
                } else {
                    if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                    // @ts-ignore
                    this.ruleSettings.conditions.whenInRoomWithRole = {};
                    if (typeof this.ruleSettings.conditions.whenInRoomWithRole.inRoom !== "boolean") {
                        this.ruleSettings.conditions.whenInRoomWithRole.inRoom = true;
                    }
                    if (typeof this.ruleSettings.conditions.whenInRoomWithRole.role !== "string") {
                        this.ruleSettings.conditions.whenInRoomWithRole.role = "caregiver";
                    }
                }
                inRoomBtn.textContent = (this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true) ? "in room" : "not in room";
                inRoomBtn.classList.toggle("zcDisabled", !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWithRole);
                withRoleBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver";
                withRoleBtn.classList.toggle("zcDisabled", !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWithRole);
            }
        });

        const inRoomBtn = this.createButton({
            text: (this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true) ? "in room" : "not in room",
            x: 380,
            y: 750,
            width: 180,
            height: 65,
            fontSize: 3,
            isDisabled: () => !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWithRole,
            onClick: () => {
                if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                // @ts-ignore
                if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
                this.ruleSettings.conditions.whenInRoomWithRole.inRoom = !(this.ruleSettings.conditions.whenInRoomWithRole.inRoom ?? true);
                inRoomBtn.textContent = (this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true) ? "in room" : "not in room";
            }
        });

        this.createText({
            text: "with role",
            x: 600,
            y: 750,
            fontSize: 5
        }).classList.toggle("zcDisabled", !this.canChangeSettings());

        const withRoleBtn = this.createButton({
            text: this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver",
            x: 805,
            y: 750,
            width: 180,
            height: 65,
            fontSize: 3,
            isDisabled: () => !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWithRole,
            onClick: () => {
                if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                // @ts-ignore
                if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
                this.ruleSettings.conditions.whenInRoomWithRole.role = (this.ruleSettings.conditions.whenInRoomWithRole.role ?? "caregiver") === "caregiver" ?
                    "mommy"
                    : "caregiver";
                withRoleBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver";
            }
        });

        this.createText({
            text: "and higher",
            x: 1000,
            y: 750,
            fontSize: 5
        }).classList.toggle("zcDisabled", !this.canChangeSettings());

        const whenCheckbox2 = this.createCheckbox({
            text: "When in room where ABDL is",
            x: 150,
            y: 850,
            isChecked: !!this.ruleSettings.conditions?.whenInRoomWhereAbdl,
            isDisabled: () => !this.canChangeSettings(),
            onChange: () => {
                if (this.ruleSettings.conditions.whenInRoomWhereAbdl) {
                    delete this.ruleSettings.conditions.whenInRoomWhereAbdl
                } else {
                    if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                    // @ts-ignore
                    if (!this.ruleSettings.conditions.whenInRoomWhereAbdl) this.ruleSettings.conditions.whenInRoomWhereAbdl = {};
                    if (typeof this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked !== "boolean") {
                        this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked = true;
                    }
                }
                isBlockedBtn.textContent = (this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true) ? "blocked" : "not blocked";
                isBlockedBtn.classList.toggle("zcDisabled", !this.canChangeSettings() || !this.ruleSettings.conditions.whenInRoomWhereAbdl)
            }
        });

        const isBlockedBtn = this.createButton({
            text: (this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true) ? "blocked" : "not blocked",
            x: 915,
            y: 850,
            width: 200,
            height: 65,
            fontSize: 3,
            isDisabled: () => !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWhereAbdl,
            onClick: () => {
                if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
                // @ts-ignore
                if (!this.ruleSettings.conditions.whenInRoomWhereAbdl) this.ruleSettings.conditions.whenInRoomWhereAbdl = {};
                this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked = !(this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked ?? true);
                isBlockedBtn.textContent = (this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true) ? "blocked" : "not blocked";
            }
        });

        const saveChangesBtn = this.createButton({
            text: "Save Changes",
            x: 1520,
            y: 790,
            width: 400,
            height: 150,
            style: "green",
            isDisabled: () => !this.canChangeSettings(),
            onClick: () => {
                if (InformationSheetSelection.IsPlayer()) {
                    if (!modStorage.rules) modStorage.rules = {};
                    if (!modStorage.rules.list) modStorage.rules.list = [];
                    let r = modStorage.rules.list.find((d) => d.id === this.rule.id);
                    if (r) {
                        for (let i in r) delete r[i];
                        for (let i in this.ruleSettings) r[i] = this.ruleSettings[i];
                        r.changedBy = Player.MemberNumber;
                        r.ts = Date.now();
                    } else {
                        modStorage.rules.list.push({ ...this.ruleSettings, changedBy: Player.MemberNumber, ts: Date.now() });
                    }
                    addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed settings of "${this.rule.name}" rule`, false);
                    syncStorage();
                } else {
                    let dataToSend: Partial<StorageRule> = {
                        id: this.ruleSettings.id,
                        state: this.ruleSettings.state,
                        strict: this.ruleSettings.strict,
                    };
                    if (this.ruleSettings.data) dataToSend.data = this.ruleSettings.data;
                    if (this.ruleSettings.conditions) dataToSend.conditions = this.ruleSettings.conditions;
                    messagesManager.sendPacket<ChangeRuleSettingsMessageData>("changeRuleSettings", dataToSend, InformationSheetSelection.MemberNumber);
                }
                this.exit();
            }
        });
        saveChangesBtn.style.fontWeight = "bold";
    }

    exit() {
        super.exit();
        this.setSubscreen(new RulesMenu());
    }
}