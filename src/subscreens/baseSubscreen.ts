interface CreateButtonArgs {
    text?: string
    x?: number
    y?: number
    fontSize?: number | "auto"
    width?: number
    height?: number
    padding?: number
    style?: "default" | "green" | "inverted"
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    place?: boolean
    icon?: string
}

interface CreateTextArgs {
    text?: string
    color?: "string"
    x?: number
    y?: number
    fontSize?: number | "auto"
    withBackground?: boolean
    width?: number
    height?: number
    padding?: number
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    place?: boolean
}

interface CreateInputArgs {
    value?: string
    placeholder?: string
    x?: number
    y?: number
    width: number
    height?: number
    textArea?: boolean
    fontSize?: number | "auto"
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    padding?: number
    place?: boolean
}

interface CreateCheckboxArgs {
    isChecked: boolean
    x?: number
    y?: number
    width?: number
    text: string
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    place?: boolean
}

interface CreateScrollViewArgs {
    scroll: "x" | "y" | "all"
    x: number
    y: number
    width: number,
    height?: number
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

interface CreateInputListArgs {
    value?: string[] | number[]
    title?: string
    x?: number
    y?: number
    width: number
    height?: number
    fontSize?: number | "auto"
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    padding?: number
    place?: boolean
    numbersOnly?: boolean
}

function getRelativeHeight(height: number) {
    return height * (MainCanvas.canvas.clientHeight / 1000);
}

function getRelativeWidth(width: number) {
    return width * (MainCanvas.canvas.clientWidth / 2000);
}

function getRelativeY(yPos: number, anchorPosition: 'top' | 'bottom' = 'top') {
    const scaleY = MainCanvas.canvas.clientHeight / 1000;
    return anchorPosition === 'top'
        ? MainCanvas.canvas.offsetTop + yPos * scaleY
        : MainCanvas.canvas.offsetTop + MainCanvas.canvas.clientHeight - yPos * scaleY;
}

function getRelativeX(xPos: number, anchorPosition: 'left' | 'right' = 'left') {
    const scaleX = MainCanvas.canvas.clientWidth / 2000;
    return anchorPosition === 'left'
        ? MainCanvas.canvas.offsetLeft + xPos * scaleX
        : MainCanvas.canvas.offsetLeft + MainCanvas.canvas.clientWidth - xPos * scaleX;
}


function setPosition(element: HTMLElement, xPos: number, yPos: number, anchorPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-left') {
    const yAnchor = anchorPosition === 'top-left' || anchorPosition === 'top-right' ? 'top' : 'bottom';
    const xAnchor = anchorPosition === 'top-left' || anchorPosition === 'bottom-left' ? 'left' : 'right';

    const y = getRelativeY(yPos, yAnchor);
    const x = getRelativeX(xPos, xAnchor);

    Object.assign(element.style, {
        position: 'fixed',
        [xAnchor]: x + 'px',
        [yAnchor]: y + 'px',
    });
}

function setSize(element: HTMLElement, width: number, height: number) {
    const w = getRelativeWidth(width);
    const h = getRelativeHeight(height);

    Object.assign(element.style, {
        "width": w + 'px',
        "height": h + 'px',
    });
}

function setFontSize(element: HTMLElement, targetFontSize: number) {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;

    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;

    const fontSize = targetFontSize * scaleFactor;

    Object.assign(element.style, {
        fontSize: fontSize + 'px'
    });
}

function setPadding(element: HTMLElement, targetPadding: number) {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;

    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;

    const paddingValue = targetPadding * scaleFactor;

    Object.assign(element.style, {
        padding: paddingValue + 'px',
    });
}

function autosetFontSize(element: HTMLElement) {
    const Font = MainCanvas.canvas.clientWidth <= MainCanvas.canvas.clientHeight * 2 ? MainCanvas.canvas.clientWidth / 50 : MainCanvas.canvas.clientHeight / 25;

    Object.assign(element.style, {
        fontSize: Font + 'px'
    });
}

function loadSubscreen(subscreen: BaseSubscreen): void {
    subscreen.createButton({
        x: 1815,
        y: 75,
        width: 90,
        height: 90,
        icon: "Icons/Exit.png"
    }).addEventListener("click", () => subscreen.exit());
    subscreen.load();
}

export function setPreviousSubscreen(): void {
    setSubscreen(previousSubscreen);
}

export function setSubscreen(subscreen: BaseSubscreen | null): void {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    if (currentSubscreen) loadSubscreen(currentSubscreen);
    if (previousSubscreen) previousSubscreen.unload();
}

export let currentSubscreen: BaseSubscreen | null;
export let previousSubscreen: BaseSubscreen | null = null;


export abstract class BaseSubscreen {
    private htmlElements: HTMLElement[] = [];
    private resizeEventListeners: EventListener[] = [];

    get currentSubscreen(): BaseSubscreen | null {
        return currentSubscreen;
    }

    get name(): string {
        return "";
    }

    run() {

    }
    load?() { }
    unload?() {
        this.htmlElements.forEach((e) => {
            e.remove();
        });
        this.resizeEventListeners.forEach((e) => {
            removeEventListener("resize", e);
        });
    }
    click?() { }
    exit?() {
        setPreviousSubscreen();
    }
    update?() { }
    setPreviousSubscreen() {
        setPreviousSubscreen();
    }
    setSubscreen(subscreen: BaseSubscreen | null) {
        setSubscreen(subscreen);
    }

    createButton({
        text, x, y, width, height, fontSize = "auto",
        anchor = "top-left", padding, style = "default",
        place = true, icon
    }: CreateButtonArgs): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("lcButton");
        btn.setAttribute("data-lc-style", style);

        if (icon) {
            const div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.left = "0";
            div.style.top = "0";
            div.style.display = "flex";
            div.style.alignItems = "center"
            const img = document.createElement("img");
            img.src = icon;
            // img.style.aspectRatio = "1/1";
            img.style.height = "80%";
            if (text) {
                img.style.position = "absolute";
                img.style.left = "1vw";
            } else {
                div.style.justifyContent = "center";
            }
            div.append(img);
            btn.append(div);
        }

        const setProperties = () => {
            if (x && y) setPosition(btn, x, y, anchor);
            setSize(btn, width, height);
            if (padding) setPadding(btn, padding);
            if (fontSize === "auto") autosetFontSize(btn);
            else setFontSize(btn, fontSize);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        if (place) document.body.append(btn);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(btn);
        return btn;
    }

    createText({
        text, color, x, y, width, height, withBackground = false,
        fontSize = "auto", anchor = "top-left", padding, place = true
    }: CreateTextArgs): HTMLParagraphElement {
        const p = document.createElement("p");
        p.innerHTML = text;
        p.style.color = color ?? "var(--tmd-text, black)";
        if (withBackground) p.style.background = "var(--tmd-element,rgb(239, 239, 239))";
        p.style.fontFamily = "Emilys Candy";

        const setProperties = () => {
            if (x && y) setPosition(p, x, y, anchor);
            setSize(p, width, height);
            if (padding) setPadding(p, padding);
            if (fontSize === "auto") autosetFontSize(p);
            else setFontSize(p, fontSize);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        if (place) document.body.append(p);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(p);
        return p;
    }

    createInput({
        value, placeholder, x, y, width, height, textArea = false,
        fontSize = "auto", anchor = "top-left", padding, place = true
    }: CreateInputArgs): HTMLInputElement | HTMLTextAreaElement {
        const input = document.createElement(textArea ? "textarea" : "input");
        input.classList.add("lcInput");
        if (placeholder) input.placeholder = placeholder;
        if (value) input.value = value;

        const setProperties = () => {
            if (x && y) setPosition(input, x, y, anchor);
            setSize(input, width, height);
            if (padding) setPadding(input, padding);
            if (fontSize === "auto") autosetFontSize(input);
            else setFontSize(input, fontSize);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        if (place) document.body.append(input);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(input);
        return input;
    }

    createCheckbox({
        text, x, y, isChecked, width,
        anchor = "top-left", place = true
    }: CreateCheckboxArgs): HTMLInputElement {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"
        checkbox.checked = isChecked;
        checkbox.classList.add("lcCheckbox", "checkbox");

        const p = document.createElement("p");
        p.textContent = text;
        p.style.color = "var(--tmd-text, black)";
        p.style.fontFamily = "Emilys Candy";

        const setProperties = () => {
            if (x && y) setPosition(checkbox, x, y, anchor);
            setPosition(p, x + 100, y, anchor);
            setSize(checkbox, 65, 65);
            if (width) setSize(p, width, null);
            setFontSize(p, 5);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        if (place) document.body.append(checkbox, p);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(checkbox, p);
        return checkbox;
    }

    createScrollView({
        scroll, x, y, width, height,
        anchor = "top-left"
    }: CreateScrollViewArgs): HTMLDivElement {
        const div = document.createElement("div");
        if (scroll === "all") div.style.overflow = "scroll";
        if (scroll === "x") div.style.overflowX = "scroll";
        if (scroll === "y") div.style.overflowY = "scroll";

        const setProperties = () => {
            if (x && y) setPosition(div, x, y, anchor);
            setSize(div, width, height);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        document.body.append(div);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(div);
        return div;
    }

    createInputList({
        x, y, width, height, title, value,
        anchor = "top-left", place = true, numbersOnly = false,
    }: CreateInputListArgs): [HTMLDivElement, () => (number[] | string[])] {
        const items = [];
        const div = document.createElement("div");
        div.style.cssText = `
        display: flex; flex-direction: column; gap: 1vw; border: 2px solid var(--tmd-accent, black);
        font-family: Emilys Candy; border-radius: 4px; padding: 0.75vw;
        `;

        const buttonsElement = document.createElement("div");
        buttonsElement.style.cssText = "display: flex; justify-content: center; column-gap: 1vw; width: 100%;";

        const titleElement = document.createElement("b");
        titleElement.textContent = title + ":";
        titleElement.style.cssText = "width: 100%; font-size: clamp(10px, 2.4vw, 24px); color: var(--tmd-text, black);";

        const itemsElement = document.createElement("div");
        itemsElement.style.cssText = `display: flex; gap: 1vw; flex-wrap: wrap; align-content: flex-start;
        overflow-y: scroll;`;

        const input = document.createElement("input");
        input.style.cssText = "border: none; outline: none; background: none; height: fit-content; flex-grow: 1; padding: 0.8vw; width: 6vw; font-size: clamp(8px, 2vw, 20px);";

        const addButton = (icon: string, onClick: () => void) => {
            const b = document.createElement("button");
            b.style.cssText = "cursor: pointer; display: grid; place-items: center; background: var(--tmd-element-hover, #e0e0e0); width: 10%; max-width: 40px; aspect-ratio: 1/1; border-radius: 8px; border: none;";
            const img = DrawGetImage(icon);
            img.style.cssText = "width: 90%;";
            b.append(img);
            buttonsElement.append(b);
            b.addEventListener("click", onClick);
        }

        const addItem = (text: string) => {
            const item = document.createElement("div");
            item.style.cssText = "cursor: pointer; background: var(--tmd-element-hover, rgb(206, 206, 206)); color: var(--tmd-text, black); height: fit-content; padding: 0.8vw; border-radius: 0.8vw; font-size: clamp(8px, 2vw, 20px);";
            item.textContent = text;
            itemsElement.insertBefore(item, input);
            item.addEventListener("click", (e) => {
                if (item.style.border === "") item.style.border = "2px solid red";
                else item.style.border = "";
                e.stopPropagation();
            });
            items.push(text);
        }

        const setProperties = () => {
            if (x && y) setPosition(div, x, y, anchor);
            setSize(div, width, height);
        }

        addButton("Icons/Cancel.png", () => {
            itemsElement.innerHTML = "";
            items.splice(0, items.length);
            itemsElement.append(input);
            value.forEach((v) => addItem(String(v)));
        });
        addButton("Icons/Trash.png", () => {
            for (const c of [...itemsElement.children]) {
                if (c.getAttribute("style").includes("border: 2px solid red;")) {
                    items.splice(items.indexOf(c.textContent), 1);
                    c.remove();
                }
            }
        });
        setProperties();
        window.addEventListener("resize", setProperties);
        input.addEventListener("keypress", (e) => {
            if (document.activeElement === input) {
                switch (e.key) {
                    case "Enter":
                        if (numbersOnly && Number.isNaN(parseInt(input.value))) return;
                        if (!numbersOnly && input.value.trim() === "") return;
                        addItem(input.value);
                        input.value = "";
                        break;
                }
            }
        });
        div.addEventListener("click", (e) => { if (e.currentTarget == div) input.focus() });
        itemsElement.append(input);
        div.append(buttonsElement, titleElement, itemsElement);
        document.body.append(div);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(div);
        value.forEach((v) => addItem(String(v)));
        return [
            div,
            () => numbersOnly ? items.map((i) => parseInt(i)) : items 
        ];
    }
}