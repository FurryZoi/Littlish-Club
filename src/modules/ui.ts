import { hookFunction, HookPriority } from "zois-core/modsApi";
import milkBottle from "@/images/milk-bottle.png";
import { MOD_BUTTON_POSITION, MOD_NAME } from "@/constants";
import { getCurrentSubscreen, setPreviousSubscreen, setSubscreen } from "zois-core/ui";
import { MainMenu } from "@/subscreens/mainMenu";
import { modStorage } from "./storage";
import { AcceptRequestMenu } from "@/subscreens/acceptRequestMenu";


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
            return getCurrentSubscreen().run();
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
            if (window.InformationSheetUnload) InformationSheetUnload();
            if (typeof modStorage.requestReciviedFrom?.id === "number") {
                setSubscreen(new AcceptRequestMenu());
            } else {
                setSubscreen(new MainMenu());
            }
        }
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return getCurrentSubscreen().click();
        }
        next(args);
    });

    hookFunction("InformationSheetExit", HookPriority.OBSERVE, (args, next) => {
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return getCurrentSubscreen().exit();
        }
        next(args);
    });
}