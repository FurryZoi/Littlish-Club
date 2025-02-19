import { chatSendLocal } from "@/utils/chat";
import { hookFunction, HookPriority } from "./modules/bcModSdk";
import milkBottle from "@/images/milk-bottle.png";
import { MOD_NAME } from "./constants";

const init = () => {
    chatSendLocal("Littlish Club loaded!");
    
    hookFunction("InformationSheetRun", HookPriority.Observe, (args, next) => {
        if (
            InformationSheetSelection.IsPlayer() &&
            !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) &&
            !window.LSCG_REMOTE_WINDOW_OPEN
        ) {
            DrawButton(
                1705, 75, 90, 90, "",
                "White", milkBottle,
                MOD_NAME
            );
        }
        next(args);
    });
};

if (CurrentScreen == null || CurrentScreen === "Login") {
    hookFunction("LoginResponse", HookPriority.Observe, (args, next) => {
        next(args);
        const response = args[0];
        if (
            typeof response?.Name === "string" &&
            typeof response?.AccountName === "string"
        ) init();
    });
} else init();

