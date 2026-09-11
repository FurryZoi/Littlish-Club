import { BaseSubscreen } from "zois-core/ui";


interface ItemListMenuData {
    screenName: string,
    items: {
        text: string
        value: unknown
    }[]
    columns: string
    onExit: () => void
    onClick: (value: unknown) => void
}

export class ItemListMenu extends BaseSubscreen {
    public override get name(): string {
        return this.screenName;
    }

    private screenName: ItemListMenuData["screenName"];
    private items: ItemListMenuData["items"];
    private columns: ItemListMenuData["columns"];
    private _onExit: ItemListMenuData["onExit"];
    private _onClick: ItemListMenuData["onClick"];

    constructor({
        screenName,
        items,
        columns,
        onExit,
        onClick
    }: ItemListMenuData) {
        super();
        this.screenName = screenName;
        this.items = items;
        this.columns = columns;
        this._onExit = onExit;
        this._onClick = onClick;
    }

    public override onLoad() {
        // this.createText({
        //     text: this.screenName,
        //     x: 100,
        //     y: 60,
        //     fontSize: 10
        // });

        // this.createText({
        //     text: this.content,
        //     x: 400,
        //     y: 250,
        //     width: 1200,
        //     fontSize: 8
        // }).style.textAlign = "center";

        const view = this.createContainer({
            scroll: "y",
            x: 200,
            y: 220,
            width: 1600,
            height: 650
        });
        view.style.display = "grid";
        view.style.gridTemplateColumns = this.columns;
        view.style.gap = "1vw";

        this.items.forEach((item) => {
            this.createButton({
                text: item.text,
                parent: view,
                padding: 2,
                onClick: () => {
                    this._onClick(item.value);
                }
            });
        });
    }

    public override onExit() {
        this._onExit();
    }
}