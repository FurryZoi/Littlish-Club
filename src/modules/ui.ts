import { hookFunction, HookPriority } from "@/modules/bcModSdk";
import milkBottle from "@/images/milk-bottle.png";
import { MOD_BUTTON_POSITION, MOD_NAME } from "@/constants";
import { currentSubscreen, setPreviousSubscreen, setSubscreen } from "@/subscreens/baseSubscreen";
import { MainMenu } from "@/subscreens/mainMenu";
import { modStorage } from "./storage";
import { AcceptRequestMenu } from "@/subscreens/acceptRequestMenu";


export function notify(message: string, time: number = 4000): void {
    ServerBeep = {
        Message: message,
        Timer: Date.now() + time
    };
}

export function loadUI(): void {
    hookFunction("InformationSheetRun", HookPriority.TOP, (args, next) => {
        if (
            (
                InformationSheetSelection.IsPlayer() ||
                InformationSheetSelection.LITTLISH_CLUB
            ) &&
            !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) &&
            !window.LSCG_REMOTE_WINDOW_OPEN &&
            !window.LITTLISH_CLUB.inModSubscreen() &&
            !window.MPA?.menuLoaded
        ) {
            DrawButton(
                ...MOD_BUTTON_POSITION, "",
                "White", milkBottle,
                MOD_NAME
            );
        }
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return currentSubscreen.run();
        }
        next(args);
    });

    hookFunction("InformationSheetClick", HookPriority.OBSERVE, (args, next) => {
        if (
            (
                InformationSheetSelection.IsPlayer() ||
                InformationSheetSelection.LITTLISH_CLUB
            ) &&
            !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) &&
            !window.LSCG_REMOTE_WINDOW_OPEN &&
            !window.LITTLISH_CLUB.inModSubscreen() &&
            !window.MPA?.menuLoaded &&
            MouseIn(...MOD_BUTTON_POSITION)
        ) {
            if (typeof modStorage.requestReciviedFrom?.id === "number") setSubscreen(new AcceptRequestMenu());
            else setSubscreen(new MainMenu());
        }
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return currentSubscreen.click();
        }
        next(args);
    });

    hookFunction("InformationSheetExit", HookPriority.OBSERVE, (args, next) => {
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return currentSubscreen.exit();
        }
        next(args);
    });
}