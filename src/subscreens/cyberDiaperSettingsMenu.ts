import { BaseSubscreen } from "zois-core/ui";
import { MainMenu } from "./mainMenu";
import { modStorage, syncStorage } from "@/modules/storage";
import { CyberDiaperChangePermission, CyberDiaperModel, getCyberDiaperAssetName, getCyberDiaperModelName, getNextCyberDiaperChangePermission, putCyberDiaperOn, StorageCyberDiaper, updateDiaperItem } from "@/modules/cyberDiaper";
import { CyberDiaperChangeColorMenu } from "./cyberDiaperChangeColorMenu";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { messagesManager } from "zois-core/messaging";
import { cloneDeep } from "lodash-es";
import { addLog } from "@/modules/logs";
import { getNickname } from "zois-core";
import { ChangeCyberDiaperSettingsMessageData } from "@/types/messages";

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
        super.load();
        if (!this.cyberDiaperSettings) {
            // @ts-ignore
            this.cyberDiaperSettings = cloneDeep(
                (
                    InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB
                )?.cyberDiaper ?? {}
            );
        }

        const nameInput = this.createInput({
            placeholder: "Name",
            value: this.cyberDiaperSettings.name ?? "",
            x: 130,
            y: 200,
            width: 800,
            padding: 2,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onChange: () => this.cyberDiaperSettings.name = nameInput.value
        });

        const descriptionInput = this.createInput({
            placeholder: "Description",
            value: CraftingDescription.Decode(this.cyberDiaperSettings.description) ?? "",
            x: 130,
            y: 310,
            width: 800,
            height: 250,
            padding: 2,
            textArea: true,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onChange: () => {
                this.cyberDiaperSettings.description = descriptionInput.value;
            }
        });

        this.createButton({
            text: `Change Color`,
            x: 130,
            y: 620,
            width: 800,
            height: 140,
            onClick: () => {
                this.setSubscreen(
                    new CyberDiaperChangeColorMenu(this.cyberDiaperSettings)
                );
            }
        });

        const putOnOffBtn = this.createButton({
            text: `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`,
            x: 130,
            y: 780,
            width: 800,
            height: 140,
            style: "inverted",
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onClick: () => {
                this.cyberDiaperSettings.locked = !this.cyberDiaperSettings.locked;
                putOnOffBtn.textContent = `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`;
            }
        });

        this.createText({
            text: "Model",
            x: 1000,
            y: 200,
            width: 900,
            fontSize: 5
        }).style.textAlign = "center";

        const modelBtn = this.createBackNextButton({
            currentIndex: Object.values(CyberDiaperModel)
                .indexOf(this.cyberDiaperSettings.model ?? CyberDiaperModel.BULKY_DIAPER),
            x: 1000,
            y: 260,
            width: 900,
            height: 80,
            items: Object.values(CyberDiaperModel)
                .map((i) => [getCyberDiaperModelName(i), i]),
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onChange: (model) => {
                this.cyberDiaperSettings.model = model;
                delete this.cyberDiaperSettings.color;
            }
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
            x: 1000,
            y: 365,
            width: 900,
            height: 100,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onClick: () => {
                this.cyberDiaperSettings.changePermission = getNextCyberDiaperChangePermission(
                    this.cyberDiaperSettings.changePermission ?? CyberDiaperChangePermission.EVERYONE
                );
                changePermissionBtn.textContent = `Change permission: ${permissionsTexts[this.cyberDiaperSettings.changePermission]
                    }`;
            }
        });

        this.createText({
            text: "For Extended Settings",
            x: 1000,
            y: 495,
            width: 900,
            fontSize: 5
        });

        const craftImport = this.createInput({
            placeholder: "Crafting code (Get it in crafting menu)",
            x: 1000,
            y: 560,
            width: 900,
            padding: 2,
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER)
        });

        this.createButton({
            x: 1000,
            y: 670,
            width: 900,
            padding: 2,
            text: "Import Settings From Craft",
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onClick: () => {
                const data: CraftingItem = JSON.parse(LZString.decompressFromBase64(craftImport.value));
                if (typeof data?.Name === "string") {
                    this.cyberDiaperSettings.name = data.Name;
                    nameInput.value = data.Name;
                }
                if (typeof data?.Description === "string") {
                    const decodedDescription = CraftingDescription.Decode(data.Description);
                    this.cyberDiaperSettings.description = data.Description;
                    descriptionInput.value = decodedDescription;
                }
                if (typeof data?.Item === "string") {
                    this.cyberDiaperSettings.model = data.Item === "BulkyDiaper" ? CyberDiaperModel.BULKY_DIAPER : CyberDiaperModel.POOFY_DIAPER;
                    modelBtn.textContent = `Model: ${getCyberDiaperModelName(this.cyberDiaperSettings.model ?? CyberDiaperModel.BULKY_DIAPER)}`
                }
                if (typeof data?.Color === "string") {
                    this.cyberDiaperSettings.color = data.Color === "Default" ?
                        [...AssetGet(Player.AssetFamily, "ItemPelvis", data.Item).DefaultColor]
                        : data.Color.split(",");
                }
                if (data?.TypeRecord) {
                    this.cyberDiaperSettings.typeRecord = data.TypeRecord;
                }
                if (typeof data?.Property === "string") {
                    this.cyberDiaperSettings.property = data.Property;
                }
                if (typeof data?.ItemProperty?.OverridePriority === "number" || Array.isArray(data?.ItemProperty?.OverridePriority)) {
                    this.cyberDiaperSettings.drawingPriority = data.ItemProperty.OverridePriority;
                }
            }
        });

        const saveChangesBtn = this.createButton({
            text: "Save Changes",
            x: 1520,
            y: 790,
            width: 360,
            height: 140,
            style: "green",
            isDisabled: () => !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_DIAPER),
            onClick: () => {
                if (InformationSheetSelection.IsPlayer()) {
                    modStorage.cyberDiaper = this.cyberDiaperSettings;
                    updateDiaperItem();
                    addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed settings of cyber diaper`, false);
                    syncStorage();
                } else {
                    messagesManager.sendPacket<ChangeCyberDiaperSettingsMessageData>(
                        "changeCyberDiaperSettings",
                        this.cyberDiaperSettings,
                        InformationSheetSelection.MemberNumber
                    );
                }
                this.exit();
            }
        });
        saveChangesBtn.style.fontWeight = "bold";
    }

    exit() {
        super.exit();
        this.setSubscreen(new MainMenu());
    }
}