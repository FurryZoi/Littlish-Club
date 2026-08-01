import { hookFunction, HookPriority } from "zois-core/mod-sdk";
import { MOD_NAME, REPO_URL } from "./constants";
import styles from "./styles.css";
import { initStorage, modStorage, syncStorage } from "./modules/storage";
import { loadRules } from "./modules/rules";
import { createApi } from "./modules/api";
import { loadCyberDiaper } from "./modules/cyberDiaper";
import { waitFor, bootstrap, isVersionNewer, getRandomNumber, injectStyles } from "zois-core";
import { toastsManager } from "zois-core/toasts";
import { version } from "../package.json";
import { loadUI } from "./modules/ui";
import { loadAccess } from "./modules/access";
import { messagesManager } from "zois-core/messaging";
import { logger } from "zois-core/logging";
import { MainMenu } from "./subscreens/mainMenu";


bootstrap({
    name: "Littlish Club",
    fullName: "Littlish Club",
    key: "LC",
    version,
    repository: REPO_URL,
    fontFamily: "Emilys Candy",
    onReady: () => {
        injectStyles(styles);

        initStorage();
        createApi();
        loadRules();
        loadCyberDiaper();
        loadUI();
        loadAccess();

        try {
            MainMenu.createCharacters();
            logger.log("Created MainMenu preview characters");
        } catch (e) {
            logger.error("Failed to create MainMenu preview characters", e);
        }

        logger.log(`v${version} loaded`);

        setTimeout(() => {
            toastsManager.success({
                title: "Littlish Club loaded",
                message: `v${version}`,
                duration: 4000
            });
        }, 1000);

        if (isVersionNewer(version, modStorage.version)) {
            waitFor(() => !!document.getElementById("InputChat")).then(() => {
                modStorage.version = version;
                syncStorage();
                const text = `<div class="lcChangelog"><b>Littlish Club</b> v${version}<br><br>Changes: <ul><li>Adapt to R124</li></ul></div>`;
                messagesManager.sendLocal(text);
            });
        }
    }
});

