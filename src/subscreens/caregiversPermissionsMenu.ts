import { BaseSubscreen } from "./baseSubscreen";

export class CaregiversPermissionsMenu extends BaseSubscreen {
    get name() {
        return "Family > Caregivers permissions";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        ["Manage diaper", "Manage rules", "Delete notes"].forEach((p, i) => {
            this.createButton({
                text: p,
                width: 1200,
                x: 400,
                y: 250 + 110 * i,
                padding: 2
            });
        });
    }
}