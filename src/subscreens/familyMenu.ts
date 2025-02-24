import { modStorage, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { CaregiversPermissionsMenu } from "./caregiversPermissionsMenu";
import { MainMenu } from "./mainMenu";

export class FamilyMenu extends BaseSubscreen {
    get name() {
        return "Family";
    }

    get icon(): string {
        return `Assets/Female3DCG/Emoticon/Hearts/Icon.png`
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        const caregiversInput = this.createInput({
            placeholder: "Caregivers member numbers",
            x: 1000,
            y: 200,
            width: 850,
            height: 600,
            textArea: true
        });
        caregiversInput.value = modStorage.caregivers?.list?.join(", ") ?? "";

        if (!modStorage.caregivers?.canChangeList) caregiversInput.classList.add("lcDisabled");
        caregiversInput.addEventListener("change", () => {
            if (!modStorage.caregivers?.canChangeList) return caregiversInput.classList.add("lcDisabled");
            if (!modStorage.caregivers) modStorage.caregivers = {};
            modStorage.caregivers.list = caregiversInput.value
                .split(",")
                .map((c) => parseInt(c.trim()))
                .filter((c) => typeof c === "number");
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
            text: `Mommy: -`,
            x: 150,
            y: 300
        }).style.fontWeight = "bold";

        const checkBox = this.createCheckbox({
            text: "Prevent baby from changing caregivers list",
            x: 150,
            y: 400,
            width: 600,
            isChecked: !modStorage.caregivers?.canChangeList
        });
        checkBox.addEventListener("change", () => {
            if (!modStorage.caregivers) modStorage.caregivers = {};
            modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
            caregiversInput.classList.toggle("lcDisabled");
        });
    }

    exit() {
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}