import { hookFunction, HookPriority } from "zois-core/modsApi";
import { MOD_NAME, REPO_URL } from "./constants";
import styles from "./styles.css";
import { initStorage, modStorage, syncStorage } from "./modules/storage";
import { loadRules } from "./modules/rules";
import { createApi } from "./modules/api";
import { loadCyberDiaper } from "./modules/cyberDiaper";
import { waitForStart, waitFor, registerCore, isVersionNewer, getRandomNumber, injectStyles } from "zois-core";
import { toastsManager } from "zois-core/popups";
import { version } from "../package.json";
import { loadUI } from "./modules/ui";
import { loadAccess } from "./modules/access";
import { messagesManager } from "zois-core/messaging";


waitForStart(() => {
    registerCore({
        name: "Littlish Club",
        fullName: "Littlish Club",
        key: "LC",
        version,
        repository: REPO_URL,
        fontFamily: "Emilys Candy"
    });

    injectStyles(styles);

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
        duration: 4000
    });

    if (isVersionNewer(version, modStorage.version)) {
        waitFor(() => !!document.getElementById("InputChat")).then(() => {
            modStorage.version = version;
            syncStorage();
            const text = `<div class="lcChangelog"><b>Littlish Club</b> v${version}<br><br>Changes: <ul><li>Deleted "Decrease size" rule due to pdfiles issues.</li><li>"Manage ABCL Settings" caregivers access permission.</li></ul></div>`;
            messagesManager.sendLocal(text);
        });
    }
});

