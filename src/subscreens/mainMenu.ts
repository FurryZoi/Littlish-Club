import { MOD_NAME } from "@/constants";
import { BaseSubscreen } from "./baseSubscreen";

export class MainMenu extends BaseSubscreen {
    run() {
        DrawText(MOD_NAME, 1000, 200, "Black");
    }
    load() {
        const btn = this.createButton("Test Button", 1000, 500, 400, 50, 10);
    }
}