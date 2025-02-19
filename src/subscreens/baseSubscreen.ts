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
        fontSize: fontSize + 'px',
        fontFamily: CommonGetFontName()
    });
};

function autosetFontSize(element: HTMLElement) {
    const Font = MainCanvas.canvas.clientWidth <= MainCanvas.canvas.clientHeight * 2 ? MainCanvas.canvas.clientWidth / 50 : MainCanvas.canvas.clientHeight / 25;

    Object.assign(element.style, {
        fontSize: Font + 'px',
        fontFamily: CommonGetFontName()
    });
};

export function setPreviousSubscreen(): void {
    setSubscreen(previousSubscreen);
}

export function setSubscreen(subscreen: BaseSubscreen | null): void {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    currentSubscreen.load();
}

export let currentSubscreen: BaseSubscreen | null;
export let previousSubscreen: BaseSubscreen | null = null;


export abstract class BaseSubscreen {
    get currentSubscreen(): BaseSubscreen | null {
        return currentSubscreen;
    }

    get name(): string {
        return "";
    }

    run() {

    }
    load?() { }
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
    createButton(
        text, x, y, w, h, fontSize,
        anchor: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = "top-left"
    ): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("lcButton");
        setPosition(btn, x, y, anchor);
        setSize(btn, w, h);
        autosetFontSize(btn);
        window.addEventListener("resize", () => {
            setPosition(btn, x, y, anchor);
            setSize(btn, w, h);
            autosetFontSize(btn);
        });
        document.body.append(btn);
        return btn;
    }
}