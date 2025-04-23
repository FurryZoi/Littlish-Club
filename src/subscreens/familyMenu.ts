import { modStorage, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { CaregiversPermissionsMenu } from "./caregiversPermissionsMenu";
import { MainMenu } from "./mainMenu";
import { AccessRight, getCaregiversOf, getMommyOf, hasAccessRightTo, hasMommy } from "@/modules/access";
import { chatSendModMessage } from "@/utils/chat";
import { addLog } from "@/modules/logs";
import { getNickname } from "@/utils/characters";
import { ChangeCaregiversListMessageData } from "@/modules/messaging";

export class FamilyMenu extends BaseSubscreen {
    private getCaregiversInputValue: () => number[];
    private oldCaregiversList: number[];

    get name() {
        return "Family";
    }

    get icon(): string {
        return `Assets/Female3DCG/Emoticon/Hearts/Icon.png`;
    }

    load() {
        this.oldCaregiversList = getCaregiversOf(InformationSheetSelection);

        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        const [caregiversInput, getCaregiversInputValue] = this.createInputList({
            title: "Caregivers member numbers",
            value: getCaregiversOf(InformationSheetSelection),
            x: 1000,
            y: 200,
            width: 850,
            height: 600,
            numbersOnly: true
        });
        this.getCaregiversInputValue = getCaregiversInputValue as () => number[];
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.CHANGE_CAREGIVERS_LIST)) {
            caregiversInput.classList.add("lcDisabled");
        }

        const caregiversPermissionsBtn = this.createButton({
            text: "Caregivers permissions",
            x: 1000,
            y: 825,
            width: 850,
            padding: 2
        });
        caregiversPermissionsBtn.addEventListener("click", () => {
            this.setSubscreen(new CaregiversPermissionsMenu());
        });

        this.createText({
            text: `Mommy: ${hasMommy(InformationSheetSelection) ? `${getMommyOf(InformationSheetSelection).name} (${getMommyOf(InformationSheetSelection).id})` : "-"}`,
            x: 150,
            y: 300
        }).style.fontWeight = "bold";

        const checkBox = this.createCheckbox({
            text: "Prevent baby from changing caregivers list",
            x: 150,
            y: 400,
            width: 600,
            isChecked: InformationSheetSelection.IsPlayer() ?
                !modStorage.caregivers?.canChangeList
                : !InformationSheetSelection.LITTLISH_CLUB?.caregivers?.canChangeList
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST)) {
            checkBox.classList.add("lcDisabled");
        }
        checkBox.addEventListener("change", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST)) {
                return checkBox.classList.add("lcDisabled");
            }
            if (InformationSheetSelection.IsPlayer()) {
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
                addLog(
                    `${getNickname(Player)} (${Player.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"
                    } ${getNickname(Player)} to change caregivers list`,
                    false
                );
            } else {
                chatSendModMessage("turnCanChangeCaregiversList", null, InformationSheetSelection.MemberNumber);
            }
        });
    }

    exit() {
        const newCaregiversList = this.getCaregiversInputValue();
        if (
            this.oldCaregiversList.join(",") !== newCaregiversList.join(",") &&
            hasAccessRightTo(Player, InformationSheetSelection, AccessRight.CHANGE_CAREGIVERS_LIST)
        ) {
            if (InformationSheetSelection.IsPlayer()) {
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.list = newCaregiversList;
                addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed caregivers list`, false);
            } else {
                chatSendModMessage<ChangeCaregiversListMessageData>("changeCaregiversList", {
                    list: newCaregiversList
                }, InformationSheetSelection.MemberNumber);
            }
        }
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}