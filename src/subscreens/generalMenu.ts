import { BaseSubscreen } from "./baseSubscreen";

export class GeneralMenu extends BaseSubscreen {
    get buttonText() {
        return "General";
    }

    load() {
        this.createText({
            text: "General",
            x: 100,
            y: 60,
            fontSize: 10
        });
    }
}