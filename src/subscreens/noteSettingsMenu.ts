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

export class NoteSettingsMenu extends BaseSubscreen {
    private note: Note;
    private key: number;

    get name() {
        return `Notes > #${this.key}`;
    }

    constructor(note: Note, key: number) {
        super();
        this.note = note;
        this.key = key;
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createText({
            text: this.note.text,
            x: 200,
            y: 260,
            width: 1600
        }).style.textAlign = "center";

        this.createText({
            text: new Date(this.note.ts).toUTCString(),
            x: 1550,
            y: 260,
            width: 360,
            withBackground: true,
        }).style.textAlign = "center";

        const deleteBtn = this.createButton({
            text: "Delete",
            x: 1550,
            y: 850,
            width: 360,
            padding: 2
        });
        deleteBtn.addEventListener("click", () => {
            modStorage.notes.list.splice(this.key - 1, 1);
            this.exit();
        });
    }

    exit() {
        syncStorage();
        this.setPreviousSubscreen();
    }
}