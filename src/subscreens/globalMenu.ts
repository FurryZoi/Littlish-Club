import { BaseSubscreen } from "./baseSubscreen";

export class GlobalMenu extends BaseSubscreen {
    get name() {
        return "Global";
    }

    get icon(): string {
        return `Icons/General.png`;
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        if (InformationSheetSelection.IsPlayer()) {
            this.createText({
                text: `Mod Data Size: ${
                    Math.round(new TextEncoder().encode(Player.ExtensionSettings?.LITTLISH_CLUB ?? "").byteLength / 100) / 10
                }KB`,
                x: 150,
                y: 240,
                fontSize: 6
            });
        }
    }
}