import { BaseSubscreen } from "zois-core/ui";
import { WardrobeMenu } from "../wardrobeMenu";
import { DISCORD_SERVER_LW_OUTFITS_CHANNEL_LINK } from "@/constants";

export class AboutWardrobeMenu extends BaseSubscreen {
    private currentAppearance: {
        name: string
        creator: string
        bundle: string
    };

    get name() {
        return "Littlish Wardrobe > About";
    }

    constructor(currentAppearance: {
        name: string
        creator: string
        bundle: string
    }) {
        super();
        this.currentAppearance = currentAppearance;
    }

    load() {
        super.load();

        this.createText({
            text: `<b>Littlish Wardrobe</b> is library of cute ABDL-themed outfits. Want to see your outfit there? Join our discord and send the base64 code of the outfit in <a href="${DISCORD_SERVER_LW_OUTFITS_CHANNEL_LINK}" target="_blank">this channel</a> and don't forget to specify your name.`,
            width: 1000,
            x: 500,
            y: 220,
            fontSize:  6,
        }).style.textAlign = "center";

        this.createText({
            text: "Outfit can <b>always</b> be renamed, changed and deleted at the request of the author.",
            width: 1000,
            x: 500,
            y: 650,
            fontSize: 6,
            padding: 2,
            withBackground: true
        }).style.textAlign = "center";
    }

    exit() {
        super.exit();
        this.setSubscreen(new WardrobeMenu(this.currentAppearance));
    }
}