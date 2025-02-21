import { BaseSubscreen } from "./baseSubscreen";

export class DiaperMenu extends BaseSubscreen {
    get name() {
        return "Diaper";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });
    }
}