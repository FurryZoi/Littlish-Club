import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { NoteSettingsMenu } from "./noteSettingsMenu";
import { MainMenu } from "./mainMenu";
import { chatSendModMessage, sendRequest } from "@/utils/chat";
import { addLog, Log } from "@/modules/logs";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { getNickname } from "@/utils/characters";
import { DeleteLogsMessageData } from "@/modules/messaging";


export class LogsMenu extends BaseSubscreen {
    private scrollView: HTMLDivElement;

    get name() {
        return "Logs";
    }

    get icon(): string {
        return `Icons/Title.png`;
    }

    async load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.READ_LOGS)) {
            return this.createText({
                text: "403 | Not enough rights to read logs",
                x: 400,
                y: 400,
                width: 1200,
                fontSize: 8
            }).style.textAlign = "center";
        }

        let logs: Log[];

        if (InformationSheetSelection.IsPlayer()) {
            logs = modStorage.logs?.list ?? [];
        } else {
            const statusText = this.createText({
                text: "Loading Logs...",
                x: 400,
                y: 400,
                width: 1200,
                fontSize: 8
            });
            statusText.style.textAlign = "center";
            const res = await sendRequest<Log[]>("getLogs", null, InformationSheetSelection.MemberNumber);
            if (res.isError) return statusText.textContent = "Loading Error :(";
            statusText.remove();
            logs = res.data;
        }

        if (logs.length === 0) return;

        const scrollView = this.createScrollView({
            scroll: "y",
            x: 150,
            y: 240,
            width: 1700,
            height: 580
        });
        scrollView.style.display = "flex";
        scrollView.style.flexDirection = "column";
        scrollView.style.alignItems = "center";
        scrollView.style.rowGap = "1vw";
        this.scrollView = scrollView;

        logs.forEach((log) => this.createLogButton(log));

        const deleteLogsInput = this.createInput({
            placeholder: "How much logs to delete",
            x: 150,
            y: 845,
            width: 840,
            padding: 2
        });
        deleteLogsInput.setAttribute("type", "number");
        deleteLogsInput.addEventListener("input", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.DELETE_LOGS)) {
                return deleteLogsInput.classList.add("lcDisabled");
            }
            if (parseInt(deleteLogsInput.value) > scrollView.children.length) deleteLogsInput.value = String(scrollView.children.length);
            if (parseInt(deleteLogsInput.value) < 0) deleteLogsInput.value = "0";
            for (const c of [...scrollView.children]) {
                const style = c.getAttribute("style");
                if (style.includes("border: 2px solid red;")) {
                    c.setAttribute("style", style.replaceAll("border: 2px solid red;", ""));
                }
            }
            for (let i = 0; i < parseInt(deleteLogsInput.value); i++) {
                const style = scrollView.children[i].getAttribute("style");
                scrollView.children[i].setAttribute("style", style + "border: 2px solid red;");
            }
        });

        const deleteLogsBtn = this.createButton({
            text: "Delete",
            x: 1010,
            y: 845,
            width: 840,
            padding: 2
        });
        deleteLogsBtn.addEventListener("click", () => {
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.DELETE_LOGS)) {
                return deleteLogsBtn.classList.add("lcDisabled");
            }
            const count = parseInt(deleteLogsInput.value);
            if (count === 0) return;
            const children = [...scrollView.children];
            for (let i = 0; i < count; i++) children[i].remove();
            deleteLogsInput.value = "";
            if (InformationSheetSelection.IsPlayer()) {
                const logObject = addLog(`${getNickname(Player)} (${Player.MemberNumber}) deleted log entries (${count})`, false);
                this.createLogButton(logObject);
                modStorage.logs.list.splice(0, count);
                syncStorage();
            } else {
                chatSendModMessage<DeleteLogsMessageData>("deleteLogs", {
                    count
                }, InformationSheetSelection.MemberNumber);
                this.createLogButton({
                    message: `${getNickname(Player)} (${Player.MemberNumber}) deleted log entries (${count})`,
                    ts: Date.now()
                });
            }
        });

        if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.DELETE_LOGS)) {
            deleteLogsInput.classList.add("lcDisabled");
            deleteLogsBtn.classList.add("lcDisabled");
        }
    }

    createLogButton(log: Log) {
        const btn = this.createButton({
            text: `${log.message} at (${new Date(log.ts).toUTCString()})`,
            place: false,
            padding: 2
        });
        btn.style.wordBreak = "break-all";
        btn.style.width = "98%";
        this.scrollView.append(btn);
        this.scrollView.scrollTo(0, this.scrollView.scrollHeight);
    }

    exit() {
        this.setSubscreen(new MainMenu());
    }
}