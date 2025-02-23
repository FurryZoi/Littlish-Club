import { MOD_NAME } from "@/constants";
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

        this.createText({
            text: `This feature is not supported yet, let's see how ${MOD_NAME} can integrate with ABCL.`,
            x: 400,
            y: 400,
            width: 1200,
            fontSize: 6
        }).style.textAlign = "center";
    }
}