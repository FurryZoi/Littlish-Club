import { BaseSubscreen } from "@/subscreens/baseSubscreen";

export class ExploringModeMenu extends BaseSubscreen {
    get name() {
        return "Exploring Mode";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createText({
            text: "As long as you don't have mommy, you are in exporing mode. This mode allows you to explore how all the mod's functions work. It removes all restrictions and allows you to fully manage all your mod settings. But you get excited early, as soon as you have a mommy, you will lose that freedom and your mommy will take control of you...",
            width: 1200,
            x: 400,
            y: 350
        });
    }
}