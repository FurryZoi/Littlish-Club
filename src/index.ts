import { chatSendLocal } from "@/utils/chat";
import { hookFunction, HookPriority } from "./modules/bcModSdk";
import milkBottle from "@/images/milk-bottle.png";
import { MOD_NAME } from "./constants";
import { loadUI } from "./modules/ui";
import styles from "./styles.css";


const init = () => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.append(style);
    console.log(`${MOD_NAME} loaded`);
    // @ts-ignore
    window.LITTLISH_CLUB = {};
    loadUI();
};

if (CurrentScreen == null || CurrentScreen === "Login") {
    hookFunction("LoginResponse", HookPriority.OBSERVE, (args, next) => {
        next(args);
        const response = args[0];
        if (
            typeof response?.Name === "string" &&
            typeof response?.AccountName === "string"
        ) init();
    });
} else init();

