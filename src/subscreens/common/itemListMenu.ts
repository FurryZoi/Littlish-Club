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
    private screenName: ItemListMenuData["screenName"];
    private items: ItemListMenuData["items"];
    private columns: ItemListMenuData["columns"];
    private onExit: ItemListMenuData["onExit"];
    private onClick: ItemListMenuData["onClick"];

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
        this.onExit = onExit;
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

        // this.createText({
        //     text: this.content,
        //     x: 400,
        //     y: 250,
        //     width: 1200,
        //     fontSize: 8
        // }).style.textAlign = "center";

        const view = this.createScrollView({
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
            view.append(
                this.createButton({
                    text: item.text,
                    place: false,
                    padding: 2,
                    onClick: () => {
                        this.onClick(item.value);
                    }
                })
            );
        });
    }

    exit() {
        super.exit();
        this.onExit();
    }
}