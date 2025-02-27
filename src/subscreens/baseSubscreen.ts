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
    x: number
    y: number
    fontSize?: number | "auto"
    withBackground?: boolean
    width?: number
    height?: number
    padding?: number
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

interface CreateInputArgs {
    value?: string
    placeholder?: string
    x: number
    y: number
    width: number
    height?: number
    textArea?: boolean
    fontSize?: number | "auto"
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    padding?: number
}

interface CreateCheckboxArgs {
    isChecked: boolean
    x: number
    y: number
    width?: number,
    text: string
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

interface CreateScrollViewArgs {
    scroll: "x" | "y" | "all"
    x: number
    y: number
    width: number,
    height?: number
    anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
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

export function setPreviousSubscreen(): void {
    setSubscreen(previousSubscreen);
}

export function setSubscreen(subscreen: BaseSubscreen | null): void {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    if (currentSubscreen) currentSubscreen.load();
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
        fontSize = "auto", anchor = "top-left", padding
    }: CreateTextArgs): HTMLParagraphElement {
        const p = document.createElement("p");
        p.textContent = text;
        p.style.color = color ?? "var(--tmd-text, black)";
        if (withBackground) p.style.background = "var(--tmd-element,rgb(239, 239, 239))";
        p.style.fontFamily = "Emilys Candy";

        const setProperties = () => {
            setPosition(p, x, y, anchor);
            setSize(p, width, height);
            if (padding) setPadding(p, padding);
            if (fontSize === "auto") autosetFontSize(p);
            else setFontSize(p, fontSize);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        document.body.append(p);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(p);
        return p;
    }
    createInput({
        value, placeholder, x, y, width, height, textArea = false,
        fontSize = "auto", anchor = "top-left", padding
    }: CreateInputArgs): HTMLInputElement | HTMLTextAreaElement {
        const input = document.createElement(textArea ? "textarea" : "input");
        input.classList.add("lcInput");
        if (placeholder) input.placeholder = placeholder;
        if (value) input.value = value;

        const setProperties = () => {
            setPosition(input, x, y, anchor);
            setSize(input, width, height);
            if (padding) setPadding(input, padding);
            if (fontSize === "auto") autosetFontSize(input);
            else setFontSize(input, fontSize);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        document.body.append(input);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(input);
        return input;
    }
    createCheckbox({
        text, x, y, isChecked, width,
        anchor = "top-left"
    }: CreateCheckboxArgs): HTMLInputElement {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"
        checkbox.checked = isChecked;
        checkbox.classList.add("lcCheckbox");

        const p = document.createElement("p");
        p.textContent = text;
        p.style.color = "var(--tmd-text, black)";
        p.style.fontFamily = "Emilys Candy";

        const setProperties = () => {
            setPosition(checkbox, x, y, anchor);
            setPosition(p, x + 100, y, anchor);
            setSize(checkbox, 65, 65);
            if (width) setSize(p, width, null);
            setFontSize(p, 5);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        document.body.append(checkbox, p);
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
            setPosition(div, x, y, anchor);
            setSize(div, width, height);
        }

        setProperties();
        window.addEventListener("resize", setProperties);
        document.body.append(div);
        this.resizeEventListeners.push(setProperties);
        this.htmlElements.push(div);
        return div;
    }
}