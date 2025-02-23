import { BaseSubscreen } from "./baseSubscreen";

export class FamilyMenu extends BaseSubscreen {
    get name() {
        return "Family";
    }

    get icon(): string {
        return `https://www.bondageprojects.elementfx.com/${GameVersion}/BondageClub/Assets/Female3DCG/Emoticon/Hearts/Icon.png`
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createInput({
            placeholder: "Caregivers member numbers",
            x: 1000,
            y: 200,
            width: 850,
            height: 600,
            textArea: true
        });

        this.createButton({
            text: "Caregivers permissions",
            x: 1000,
            y: 825,
            width: 850,
            padding: 2
        });

        this.createText({
            text: `Mommy: -`,
            x: 150,
            y: 300
        }).style.fontWeight = "bold";

        this.createCheckbox({
            text: "Prevent baby from changing caregivers list",
            x: 150,
            y: 400,
            width: 600,
            isChecked: false
        });
    }
}