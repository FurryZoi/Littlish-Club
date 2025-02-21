import { BaseSubscreen } from "./baseSubscreen";

export class GeneralMenu extends BaseSubscreen {
    get name() {
        return "General";
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