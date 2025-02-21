import { modStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";

export class NotesMenu extends BaseSubscreen {
    get name() {
        return "Notes";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        modStorage.notes?.list?.forEach((note, i) => {
            this.createButton({
                text: `${note.author.name} (${note.author.id}) noted: ${note.text}`,
                x: 150,
                y: 260 + 80 * i,
                width: 1700
            }).style.wordBreak = "break-all";
        });

        const noteInput = this.createInput({
            placeholder: "Paste note here",
            x: 150,
            y: 850,
            width: 1400,
            padding: 2
        });

        const placeNoteBtn = this.createButton({
            text: "Place note",
            x: 1600,
            y: 850,
            width: 250,
            padding: 2
        });
        placeNoteBtn.addEventListener("click", () => {
            if (!modStorage.notes) modStorage.notes = {};
            if (!modStorage.notes.list) modStorage.notes.list = [];
            modStorage.notes.list.push({
                text: noteInput.value,
                author: {
                    name: Player.Name,
                    id: Player.MemberNumber
                },
                ts: Date.now()
            });
            noteInput.value = "";
        });
    }
}