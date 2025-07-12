import { BaseSubscreen } from "zois-core/ui";

export class OneButtonMenu extends BaseSubscreen {
    private screenName: string;
    private content: string;
    private buttonText: string;
    private onClick: () => void;

    constructor({
        screenName,
        content,
        buttonText,
        onClick
    }: {
        screenName: string,
        content: string,
        buttonText: string
        onClick: () => void
    }) {
        super();
        this.screenName = screenName;
        this.content = content;
        this.buttonText = buttonText;
        this.onClick = onClick;
    }

    load() {
        super.load();
        this.createText({
            text: this.screenName,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createText({
            text: this.content,
            x: 400,
            y: 250,
            width: 1200,
            fontSize: 8
        }).style.textAlign = "center";

        this.createButton({
            text: this.buttonText,
            x: 100,
            y: 800,
            padding: 4,
            style: "inverted",
            onClick: () => {
                this.onClick();
                this.exit();
            }
        });
    }
}