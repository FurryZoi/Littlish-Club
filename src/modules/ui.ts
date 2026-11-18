import { hookFunction, HookPriority } from "zois-core/mod-sdk";
import milkBottle from "@/images/milk-bottle.png";
import { MOD_BUTTON_POSITION, MOD_NAME } from "@/constants";
import { getCurrentSubscreen, setSubscreen } from "zois-core/ui";
import { MainMenu } from "@/subscreens/mainMenu";
import { modStorage } from "./storage";
import { AcceptRequestMenu } from "@/subscreens/acceptRequestMenu";


export function loadUI(): void {
    hookFunction("InformationSheetRun", HookPriority.TOP, (args, next) => {
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return getCurrentSubscreen()?.run();
        }
        return next(args);
    });

    hookFunction("InformationSheetClick", HookPriority.OBSERVE, (args, next) => {
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return getCurrentSubscreen()?.click();
        }
        return next(args);
    });

    hookFunction("InformationSheetExit", HookPriority.OBSERVE, (args, next) => {
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return getCurrentSubscreen()?.exit();
        }
        return next(args);
    });

    hookFunction("InformationSheetResize", HookPriority.OBSERVE, (args, next) => {
        if (window.LITTLISH_CLUB.inModSubscreen()) {
            return getCurrentSubscreen()?.resize();
        }
        return next(args);
    });

    hookFunction("InformationSheetLoad", HookPriority.OBSERVE, async (args, next) => {
        const result = await next(args);
        if (
            !InformationSheetSelection?.IsPlayer() &&
            !InformationSheetSelection?.LITTLISH_CLUB
        ) return result;
        const button = ElementButton.Create(
            "lc-open-settings-screen-button",
            () => {
                InformationSheetUnload();
                if (typeof modStorage.requestReciviedFrom?.id === "number") {
                    setSubscreen(new AcceptRequestMenu());
                } else {
                    setSubscreen(new MainMenu());
                }
            },
            {
                image: milkBottle,
                tooltip: MOD_NAME,
            }
        );
        const container = ElementWrap(`${InformationSheetIDs.screen}-menu`);
        if (container) container.append(button);
        return result;
    });
}