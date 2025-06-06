import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { NoteSettingsMenu } from "./noteSettingsMenu";
import { MainMenu } from "./mainMenu";
import { chatSendModMessage } from "@/utils/chat";
import { addLog } from "@/modules/logs";
import { getNickname } from "@/utils/characters";
import { AddNoteMessageData } from "@/modules/messaging";
import { MAX_NOTE_SIZE_IN_KBYTES } from "@/constants";
import { notify } from "@/modules/ui";


function addNote(note: Note, subscreen: NotesMenu, scrollView: HTMLDivElement, key: number, pending = false): void {
    const btn = subscreen.createButton({
        text: `${note.author.name} (${note.author.id}) added note "${note.text}" at ${new Date(note.ts).toUTCString()}`,
        place: false,
        padding: 2
    });
    btn.style.wordBreak = "break-all";
    btn.style.width = "98%";
    if (pending) btn.classList.add("lcDisabled");
    btn.addEventListener("click", () => {
        subscreen.setSubscreen(new NoteSettingsMenu(note, key));
    });
    scrollView.append(btn);
    scrollView.scrollTo(0, scrollView.scrollHeight);
}

export class NotesMenu extends BaseSubscreen {
    private scrollView: HTMLDivElement;

    get name() {
        return "Notes";
    }

    get icon(): string {
        return `Icons/WinkNone.png`;
    }

    load() {
        const notesList: Readonly<Note[]> = InformationSheetSelection.IsPlayer() ?
            (modStorage.notes?.list ?? [])
            : (InformationSheetSelection.LITTLISH_CLUB?.notes?.list ?? []);

        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        const scrollView = this.createScrollView({
            scroll: "y",
            x: 150,
            y: 260,
            width: 1700,
            height: 560
        });
        scrollView.style.display = "flex";
        scrollView.style.flexDirection = "column";
        scrollView.style.alignItems = "center";
        scrollView.style.rowGap = "1vw";
        this.scrollView = scrollView;

        notesList.forEach((note, i) => {
            addNote(note, this, scrollView, i + 1);
        });

        const noteInput = this.createInput({
            placeholder: "Type note here",
            x: 150,
            y: 840,
            width: 1400,
            padding: 2
        });

        const placeNoteBtn = this.createButton({
            text: "Add note",
            x: 1575,
            y: 840,
            width: 275,
            padding: 2
        });
        placeNoteBtn.addEventListener("click", () => {
            if (noteInput.value.trim() === "") return;
            if ((new TextEncoder().encode(noteInput.value).byteLength / 1024) > MAX_NOTE_SIZE_IN_KBYTES) {
                return notify(
                    `That note takes up more size than the set limit. You are evil.`,
                    4500
                );
            };
            const note: Note = {
                text: noteInput.value,
                author: {
                    name: CharacterNickname(Player),
                    id: Player.MemberNumber
                },
                ts: Date.now()
            };
            if (InformationSheetSelection.IsPlayer()) {
                if (!modStorage.notes) modStorage.notes = {};
                if (!modStorage.notes.list) modStorage.notes.list = [];
                modStorage.notes.list.push(note);
                addLog(`${getNickname(Player)} (${Player.MemberNumber}) added note: "${note.text}" at ${new Date(note.ts).toUTCString()}`, false);
            } else {
                chatSendModMessage<AddNoteMessageData>("addNote", {
                    text: noteInput.value
                }, InformationSheetSelection.MemberNumber);
            }
            addNote(note, this, scrollView, scrollView.children.length + 1, !InformationSheetSelection.IsPlayer());
            noteInput.value = "";
        });
    }

    update() {
        this.scrollView.innerHTML = "";
        const notesList: Readonly<Note[]> = InformationSheetSelection.IsPlayer() ?
            (modStorage.notes?.list ?? [])
            : (InformationSheetSelection.LITTLISH_CLUB?.notes?.list ?? []);
        notesList.forEach((note, i) => {
            addNote(note, this, this.scrollView, i + 1);
        });
    }

    exit() {
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}