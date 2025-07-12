import { BaseSubscreen } from "zois-core/ui";


interface DictMenuData {
    screenName: string
    keyName: string
    valueName: string
    keyNumberOnly: boolean
    valueNumberOnly: boolean
    items: Record<string | number, string | number>
    onExit: () => void
    onSave: (value: unknown) => void
}

function addItemToDict(subscreen: DictMenu, view: HTMLDivElement, item: [string | number, string | number]) {
    const dictLine = document.createElement("div");
    dictLine.style.cssText = "display: flex; align-items: center; column-gap: 1vw; margin-top: 1vw;";
    dictLine.append(
        subscreen.createButton({
            text: String(item[0]),
            place: false,
            width: 855,
            padding: 2,
        }),
        subscreen.createButton({
            text: String(item[1]),
            place: false,
            width: 855,
            padding: 2,
        }),
        subscreen.createButton({
            place: false,
            width: 90,
            height: 90,
            icon: "Icons/Cancel.png",
            onClick: () => {
                dictLine.remove();
                delete subscreen.items[item[0]];
            }
        }),
    );
    view.append(dictLine);
}

export class DictMenu extends BaseSubscreen {
    private screenName: DictMenuData["screenName"];
    private keyName: DictMenuData["keyName"];
    private valueName: DictMenuData["valueName"];
    private keyNumberOnly: DictMenuData["keyNumberOnly"];
    private valueNumberOnly: DictMenuData["valueNumberOnly"];
    public items: DictMenuData["items"];
    private onExit: DictMenuData["onExit"];
    private onSave: DictMenuData["onSave"];
    private scrollView: HTMLDivElement;

    constructor({
        screenName,
        keyName,
        valueName,
        keyNumberOnly,
        valueNumberOnly,
        items,
        onExit,
        onSave
    }: DictMenuData) {
        super();
        console.log(items)
        this.screenName = screenName;
        this.keyName = keyName;
        this.valueName = valueName;
        this.keyNumberOnly = keyNumberOnly;
        this.valueNumberOnly = valueNumberOnly;
        this.items = items;
        this.onExit = onExit;
        this.onSave = onSave;
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
            text: this.keyName,
            x: 100,
            y: 210,
            width: 855
        }).style.textAlign = "center";

        this.createText({
            text: this.valueName,
            x: 950,
            y: 210,
            width: 855
        }).style.textAlign = "center";

        const view = this.createScrollView({
            scroll: "y",
            x: 100,
            y: 260,
            width: 1800,
            height: 480
        });
        this.scrollView = view;

        Object.keys(this.items).forEach((key) => {
            addItemToDict(this, view, [key, this.items[key]]);
        });

        const key = this.createInput({
            placeholder: this.keyName,
            x: 100,
            y: 745,
            width: 600,
            padding: 2,
        });
        key.setAttribute("type", this.keyNumberOnly ? "number" : "text");

        const value = this.createInput({
            placeholder: this.valueName,
            x: 750,
            y: 745,
            width: 600,
            padding: 2,
        });
        value.setAttribute("type", this.valueNumberOnly ? "number" : "text");

        this.createButton({
            text: "Add",
            x: 1400,
            y: 745,
            width: 500,
            padding: 2,
            onClick: () => {
                if (key.value.trim() === "" || value.value.trim() === "") return;
                this.items[key.value] = value.value;
                addItemToDict(this, view, [key.value, value.value]);
                key.value = "";
                value.value = "";
            }
        });

        this.createButton({
            text: "Save",
            x: 1400,
            y: 850,
            width: 500,
            padding: 3,
            style: "inverted",
            onClick: () => {
                this.onSave(this.items);
            }
        });
    }

    exit() {
        super.exit();
        this.onExit();
    }
}