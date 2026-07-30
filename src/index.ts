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

        logger.log(`v${version} loaded`);
        toastsManager.success({
            title: "Littlish Club loaded",
            message: `v${version}`,
            duration: 4000
        });

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

