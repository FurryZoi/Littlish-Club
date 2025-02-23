import { BaseSubscreen } from "./baseSubscreen";

export class GeneralMenu extends BaseSubscreen {
    get name() {
        return "Global";
    }

    get icon(): string {
        return `https://www.bondageprojects.elementfx.com/${GameVersion}/BondageClub/Icons/General.png`;
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