import { BaseSubscreen } from "./baseSubscreen";

export class DiaperMenu extends BaseSubscreen {
    get name() {
        return "Diaper";
    }

    get icon(): string {
        return `https://www.bondageprojects.elementfx.com/${GameVersion}/BondageClub/Icons/Diaper.png`
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