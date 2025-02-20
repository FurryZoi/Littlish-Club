import { BaseSubscreen } from "./baseSubscreen";

export class FamilyMenu extends BaseSubscreen {
    get buttonText() {
        return "Family";
    }

    load() {
        this.createText({
            text: "Family",
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createInput({
            placeholder: "Caregivers member numbers",
            x: 500,
            y: 200,
            width: 1000,
            height: 600,
            textArea: true
        });
    }
}