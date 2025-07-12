import { hookFunction, HookPriority } from "zois-core/modsApi";
import { MOD_NAME, REPO_URL } from "./constants";
import styles from "./styles.css";
import { initStorage, modStorage, syncStorage } from "./modules/storage";
import { loadRules } from "./modules/rules";
import { createApi } from "./modules/api";
import { loadCyberDiaper } from "./modules/cyberDiaper";
import { waitFor, registerCore, isVersionNewer, getRandomNumber } from "zois-core";
import { toastsManager } from "zois-core/popups";
import { version } from "../package.json";
import { loadUI } from "./modules/ui";
import { loadAccess } from "./modules/access";
import { messagesManager } from "zois-core/messaging";


registerCore({
    name: "Littlish Club",
    fullName: "Littlish Club",
    key: "LC",
    version,
    repository: REPO_URL,
    fontFamily: "Emilys Candy"
});

const init = () => {
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.head.append(style);

    initStorage();
    createApi();
    loadRules();
    loadCyberDiaper();
    loadUI();
    loadAccess();

    console.log(`${MOD_NAME} v${version} loaded`);
    toastsManager.success({
        title: "Littlish Club loaded",
        message: `v${version}`,
        duration: 6000
    });

    if (isVersionNewer(version, modStorage.version)) {
        waitFor(() => !!document.getElementById("InputChat")).then(() => {
            modStorage.version = version;
            syncStorage();
            const text = `<div class="lcChangelog"><b>Littlish Club</b> v${version}<br><br>Changes: <ul><li>Added 5 rules.</li><li>"Summoning rattle" feature.</li><li>Pop-up messages system.</li><li>Technical changes.</li></ul></div>`;
            messagesManager.sendLocal(text);
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
        ) setTimeout(init, getRandomNumber(3000, 6000));
    });
} else setTimeout(init, getRandomNumber(3000, 6000));

