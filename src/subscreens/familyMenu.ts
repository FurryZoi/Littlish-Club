import { modStorage, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "zois-core/ui";
import { CaregiversPermissionsMenu } from "./caregiversPermissionsMenu";
import { MainMenu } from "./mainMenu";
import { AccessRight, getCaregiversOf, getMommyOf, hasAccessRightTo, hasMommy } from "@/modules/access";
import { messagesManager } from "zois-core/messaging";
import { addLog } from "@/modules/logs";
import { getNickname } from "zois-core";
import { ChangeCaregiversListMessageData } from "@/types/messages";

export class FamilyMenu extends BaseSubscreen {
    private caregiversInputValue: number[];
    private oldCaregiversList: number[];

    get name() {
        return "Family";
    }

    get icon(): string {
        return `Assets/Female3DCG/Emoticon/Hearts/Icon.png`;
    }

    load() {
        super.load();
        this.oldCaregiversList = getCaregiversOf(InformationSheetSelection);
        this.caregiversInputValue = this.oldCaregiversList;

        this.createInputList({
            title: "Caregivers member numbers",
            value: getCaregiversOf(InformationSheetSelection),
            x: 1000,
            y: 200,
            width: 850,
            height: 600,
            numbersOnly: true,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.CHANGE_CAREGIVERS_LIST),
            onChange: (value) => this.caregiversInputValue = value as number[]
        });

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

        this.createCheckbox({
            text: "Prevent baby from changing caregivers list",
            x: 150,
            y: 400,
            width: 600,
            isChecked: InformationSheetSelection.IsPlayer() ?
                !modStorage.caregivers?.canChangeList
                : !InformationSheetSelection.LITTLISH_CLUB?.caregivers?.canChangeList,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST),
            onChange: () => {
                if (InformationSheetSelection.IsPlayer()) {
                    if (!modStorage.caregivers) modStorage.caregivers = {};
                    modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
                    addLog(
                        `${getNickname(Player)} (${Player.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"
                        } ${getNickname(Player)} to change caregivers list`,
                        false
                    );
                } else {
                    messagesManager.sendPacket("turnCanChangeCaregiversList", null, InformationSheetSelection.MemberNumber);
                }
            }
        });
    }

    exit() {
        super.exit();
        const newCaregiversList = this.caregiversInputValue;
        if (
            this.oldCaregiversList.join(",") !== newCaregiversList.join(",") &&
            hasAccessRightTo(Player, InformationSheetSelection, AccessRight.CHANGE_CAREGIVERS_LIST)
        ) {
            if (InformationSheetSelection.IsPlayer()) {
                if (!modStorage.caregivers) modStorage.caregivers = {};
                modStorage.caregivers.list = newCaregiversList;
                addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed caregivers list`, false);
            } else {
                messagesManager.sendPacket<ChangeCaregiversListMessageData>("changeCaregiversList", {
                    list: newCaregiversList
                }, InformationSheetSelection.MemberNumber);
            }
        }
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}