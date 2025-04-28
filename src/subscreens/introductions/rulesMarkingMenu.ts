import { BaseSubscreen } from "@/subscreens/baseSubscreen";
import rulesMarkingImage from "@/images/rules-marking.png";

export class RulesMarkingMenu extends BaseSubscreen {
    get name() {
        return "Rules > Marking";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createImage({
            src: rulesMarkingImage,
            x: 350,
            y: 225,
            width: 1300
        });
        
        this.createText({
            text: `If the rule is highlighted in <span style="background: rgb(124, 255, 124);">green</span>, it means that it is enabled, if the rule's text color is <span style="background: red;">red</span>, it means that it is inactive at the moment due to trigger conditions. The heel icon means that the rule is strict (Strict rules can only be edited by mommy).`,
            x: 350,
            y: 725,
            padding: 2,
            width: 1300
        });
    }
}