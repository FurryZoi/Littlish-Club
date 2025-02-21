import { BaseSubscreen } from "./baseSubscreen";

export class NotesMenu extends BaseSubscreen {
    get name() {
        return "Notes";
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