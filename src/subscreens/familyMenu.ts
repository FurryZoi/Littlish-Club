import { BaseSubscreen } from "./baseSubscreen";

export class FamilyMenu extends BaseSubscreen {
    get name() {
        return "Family";
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
            x: 1150,
            y: 200,
            width: 700,
            height: 600,
            textArea: true
        });

        this.createButton({
            text: "Caregivers permissions",
            x: 1150,
            y: 825,
            width: 700,
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