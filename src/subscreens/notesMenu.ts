import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";


function addNote(note: Note, subscreen: NotesMenu, scrollView: HTMLDivElement): void {
    const btn = subscreen.createButton({
        text: `${note.author.name} (${note.author.id}) noted: ${note.text}`,
        place: false,
        padding: 2
    });
    btn.style.wordBreak = "break-all";
    btn.style.width = "90%";
    scrollView.append(btn);
}

export class NotesMenu extends BaseSubscreen {
    get name() {
        return "Notes";
    }

    get icon(): string {
        return `Icons/WinkNone.png`
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

        modStorage.notes?.list?.forEach((note, i) => {
            addNote(note, this, scrollView);
        });

        const noteInput = this.createInput({
            placeholder: "Paste note here",
            x: 150,
            y: 840,
            width: 1400,
            padding: 2
        });

        const placeNoteBtn = this.createButton({
            text: "Place note",
            x: 1600,
            y: 840,
            width: 250,
            padding: 2
        });
        placeNoteBtn.addEventListener("click", () => {
            if (noteInput.value.trim() === "") return;
            if (!modStorage.notes) modStorage.notes = {};
            if (!modStorage.notes.list) modStorage.notes.list = [];
            const note: Note = {
                text: noteInput.value,
                author: {
                    name: CharacterNickname(Player),
                    id: Player.MemberNumber
                },
                ts: Date.now()
            };
            modStorage.notes.list.push(note);
            addNote(note, this, scrollView);
            noteInput.value = "";
        });
    }

    exit() {
        syncStorage();
        this.setPreviousSubscreen();
    }
}