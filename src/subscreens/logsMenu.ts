import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { NoteSettingsMenu } from "./noteSettingsMenu";
import { MainMenu } from "./mainMenu";
import { chatSendModMessage, sendRequest } from "@/utils/chat";
import { Log } from "@/modules/logs";
import { AccessRight, hasAccessRightTo } from "@/modules/access";


// function addNote(note: Note, subscreen: NotesMenu, scrollView: HTMLDivElement, key: number, pending = false): void {
//     console.log(key);
//     const btn = subscreen.createButton({
//         text: `${note.author.name} (${note.author.id}) noted: ${note.text}`,
//         place: false,
//         padding: 2
//     });
//     btn.style.wordBreak = "break-all";
//     btn.style.width = "90%";
//     if (pending) btn.classList.add("lcDisabled");
//     btn.addEventListener("click", () => {
//         subscreen.setSubscreen(new NoteSettingsMenu(note, key));
//     });
//     scrollView.append(btn);
//     scrollView.scrollTo(0, scrollView.scrollHeight);
// }

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

        const scrollView = this.createScrollView({
            scroll: "y",
            x: 150,
            y: 260,
            width: 1700,
            height: 600
        });
        scrollView.style.display = "flex";
        scrollView.style.flexDirection = "column";
        scrollView.style.alignItems = "center";
        scrollView.style.rowGap = "1vw";
        this.scrollView = scrollView;

        logs.forEach((log) => {
            const btn = this.createButton({
                text: `${log.message} at (${new Date(log.ts).toUTCString()})`,
                place: false,
                padding: 2
            });
            btn.style.wordBreak = "break-all";
            btn.style.width = "98%";
            // btn.addEventListener("click", () => {
            //     this.setSubscreen(new NoteSettingsMenu(note, key));
            // });
            scrollView.append(btn);
            scrollView.scrollTo(0, scrollView.scrollHeight);
        });
    }

    // update() {
    //     this.scrollView.innerHTML = "";
    //     const notesList: Readonly<Note[]> = InformationSheetSelection.IsPlayer() ?
    //         (modStorage.notes?.list ?? [])
    //         : (InformationSheetSelection.LITTLISH_CLUB?.notes?.list ?? []);
    //     notesList.forEach((note, i) => {
    //         addNote(note, this, this.scrollView, i + 1);
    //     });
    // }

    exit() {
        // syncStorage();
        this.setSubscreen(new MainMenu());
    }
}