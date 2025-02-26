import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { NoteSettingsMenu } from "./noteSettingsMenu";
import { MainMenu } from "./mainMenu";
import { chatSendModMessage } from "@/utils/chat";


function addNote(note: Note, subscreen: NotesMenu, scrollView: HTMLDivElement, key: number): void {
    const btn = subscreen.createButton({
        text: `${note.author.name} (${note.author.id}) noted: ${note.text}`,
        place: false,
        padding: 2
    });
    btn.style.wordBreak = "break-all";
    btn.style.width = "90%";
    btn.addEventListener("click", () => {
        subscreen.setSubscreen(new NoteSettingsMenu(note, key));
    });
    scrollView.append(btn);
}

export class NotesMenu extends BaseSubscreen {
    get name() {
        return "Notes";
    }

    get icon(): string {
        return `Icons/WinkNone.png`;
    }

    load() {
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
        scrollView.style.rowGap = "1vw";

        (
            InformationSheetSelection.IsPlayer() ?
                modStorage
                : InformationSheetSelection.LITTLISH_CLUB
        ).notes?.list?.forEach((note, i) => {
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
            } else {
                chatSendModMessage("addNote", {
                    text: noteInput.value
                }, InformationSheetSelection.MemberNumber);
            }
            addNote(note, this, scrollView, (InformationSheetSelection.LITTLISH_CLUB ?? modStorage)?.notes?.list?.length ?? 0);
            noteInput.value = "";
        });
    }

    exit() {
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}