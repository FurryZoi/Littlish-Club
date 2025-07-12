import { BaseSubscreen } from "zois-core/ui";

export class AttributionsMenu extends BaseSubscreen {
    get name() {
        return "Attributions";
    }

    load() {
        super.load();
        
        this.createButton({
            text: "Googlefonts",
            x: 200,
            y: 240,
            padding: 2,
            onClick: () => open("https://github.com/googlefonts/noto-emoji", "_blank")
        });

        this.createButton({
            text: "Freepik - Flaticon",
            x: 200,
            y: 350,
            padding: 2,
            onClick: () => open("https://www.flaticon.com", "_blank")
        });
    }
}