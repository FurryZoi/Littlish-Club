import { hookFunction, HookPriority } from "./modules/bcModSdk";
import { MOD_NAME, MOD_VERSION } from "./constants";
import { loadUI } from "./modules/ui";
import styles from "./styles.css";
import { initStorage, modStorage, syncStorage } from "./modules/storage";
import { loadRules } from "./modules/rules";
import { createApi } from "./modules/api";
import { loadCyberDiaper } from "./modules/cyberDiaper";
import { waitFor } from "./utils/main";
import { chatSendChangelog } from "./utils/chat";
import { loadMessaging } from "./modules/messaging";


const init = () => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.append(style);
    console.log(`${MOD_NAME} loaded`);
    initStorage();
    loadMessaging();
    createApi();
    loadUI();
    loadRules();
    loadCyberDiaper();

    if (MOD_VERSION !== modStorage.version) {
        waitFor(() => !!document.getElementById("InputChat")).then(() => {
            modStorage.version = MOD_VERSION;
            syncStorage();
            chatSendChangelog();
        });
    }
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

