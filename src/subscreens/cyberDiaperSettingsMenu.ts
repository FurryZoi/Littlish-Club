import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";
import { notify } from "@/modules/ui";
import { MainMenu } from "./mainMenu";
import { modStorage, syncStorage } from "@/modules/storage";
import { CyberDiaperChangePermission, CyberDiaperModel, getCyberDiaperModelName, getNextCyberDiaperChangePermission, putCyberDiaperOn, StorageCyberDiaper, updateDiaperItem } from "@/modules/cyberDiaper";
import { CyberDiaperChangeColorMenu } from "./cyberDiaperChangeColorMenu";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { chatSendModMessage } from "@/utils/chat";
import { cloneDeep } from "lodash-es";
import { addLog } from "@/modules/logs";
import { getNickname } from "@/utils/characters";

export class CyberDiaperSettingsMenu extends BaseSubscreen {
    private cyberDiaperSettings: StorageCyberDiaper;

    get name() {
        return "Cyber Diaper > Settings";
    }

    constructor(cyberDiaperSettings?: StorageCyberDiaper) {
        super();
        if (cyberDiaperSettings) this.cyberDiaperSettings = cyberDiaperSettings;
    }

    load() {
        if (!this.cyberDiaperSettings) {
            // @ts-ignore
            this.cyberDiaperSettings = cloneDeep(
                (
                    InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB
                )?.cyberDiaper ?? {}
            );
        }

        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        const nameInput = this.createInput({
            placeholder: "Name",
            value: this.cyberDiaperSettings.name ?? "",
            x: 130,
            y: 200,
            width: 800,
            padding: 2
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            nameInput.classList.add("lcDisabled");
        }
        nameInput.addEventListener("change", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return nameInput.classList.add("lcDisabled");
            }
            this.cyberDiaperSettings.name = nameInput.value;
        });

        const descriptionInput = this.createInput({
            placeholder: "Description",
            value: this.cyberDiaperSettings.description ?? "",
            x: 130,
            y: 310,
            width: 800,
            height: 250,
            padding: 2,
            textArea: true
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            descriptionInput.classList.add("lcDisabled");
        }
        descriptionInput.addEventListener("change", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return descriptionInput.classList.add("lcDisabled");
            }
            this.cyberDiaperSettings.description = descriptionInput.value;
        });

        const changeColorBtn = this.createButton({
            text: `Change Color`,
            x: 130,
            y: 620,
            width: 800,
            height: 140
        });
        changeColorBtn.addEventListener("click", () => {
            this.setSubscreen(
                new CyberDiaperChangeColorMenu(this.cyberDiaperSettings)
            );
        });

        const putOnOffBtn = this.createButton({
            text: `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`,
            x: 130,
            y: 780,
            width: 800,
            height: 140,
            style: "inverted"
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            putOnOffBtn.classList.add("lcDisabled");
        }
        putOnOffBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return putOnOffBtn.classList.add("lcDisabled");
            }
            this.cyberDiaperSettings.locked = !this.cyberDiaperSettings.locked;
            putOnOffBtn.textContent = `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`;
        });

        const modelBtn = this.createButton({
            text: `Model: ${getCyberDiaperModelName(this.cyberDiaperSettings.model ?? CyberDiaperModel.BULKY_DIAPER)}`,
            x: 1200,
            y: 200,
            width: 700,
            height: 160
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            modelBtn.classList.add("lcDisabled");
        }
        modelBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return modelBtn.classList.add("lcDisabled");
            }
            this.cyberDiaperSettings.model = (
                (this.cyberDiaperSettings.model ?? CyberDiaperModel.BULKY_DIAPER) === CyberDiaperModel.BULKY_DIAPER
            ) ? CyberDiaperModel.POOFY_DIAPER : CyberDiaperModel.BULKY_DIAPER;
            delete this.cyberDiaperSettings.color;
            modelBtn.textContent = "Model: " + getCyberDiaperModelName(this.cyberDiaperSettings.model);
        });

        const permissionsTexts = {
            [CyberDiaperChangePermission.EVERYONE]: "Everyone",
            [CyberDiaperChangePermission.EVERYONE_EXCEPT_WEARER]: "Everyone except wearer",
            [CyberDiaperChangePermission.CAREGIVERS]: "Caregivers",
            [CyberDiaperChangePermission.MOMMY]: "Mommy"
        };
        const changePermissionBtn = this.createButton({
            text: `Change permission: ${permissionsTexts[this.cyberDiaperSettings.changePermission ?? CyberDiaperChangePermission.EVERYONE]
                }`,
            x: 1200,
            y: 380,
            width: 700,
            height: 160
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            changePermissionBtn.classList.add("lcDisabled");
        }
        changePermissionBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return changePermissionBtn.classList.add("lcDisabled");
            }
            this.cyberDiaperSettings.changePermission = getNextCyberDiaperChangePermission(
                this.cyberDiaperSettings.changePermission ?? CyberDiaperChangePermission.EVERYONE
            );
            changePermissionBtn.textContent = `Change permission: ${permissionsTexts[this.cyberDiaperSettings.changePermission]
                }`;
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
        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
            saveChangesBtn.classList.add("lcDisabled");
        }
        saveChangesBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)) {
                return saveChangesBtn.classList.add("lcDisabled");
            }
            if (InformationSheetSelection.IsPlayer()) {
                modStorage.cyberDiaper = this.cyberDiaperSettings;
                updateDiaperItem();
                addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed settings of cyber diaper`, false);
                syncStorage();
            } else {
                chatSendModMessage(
                    "changeCyberDiaperSettings",
                    this.cyberDiaperSettings,
                    InformationSheetSelection.MemberNumber
                );
            }
            this.exit();
        });
    }

    exit() {
        this.setSubscreen(new MainMenu());
    }
}