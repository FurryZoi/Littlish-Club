import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { chatSendModMessage } from "@/utils/chat";



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

        const text = this.createText({
            text: this.note.text,
            x: 200,
            y: 260,
            width: 1600
        });
        text.style.textAlign = "center";
        text.style.wordBreak = "break-all";

        const date = this.createText({
            text: new Date(this.note.ts).toUTCString(),
            x: 90,
            y: 835,
            width: 360,
            withBackground: true,
        });
        date.style.textAlign = "center";

        const deleteBtn = this.createButton({
            text: "Delete",
            x: 1550,
            y: 850,
            width: 360,
            padding: 2
        });
        if (
            !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.DELETE_NOTES) &&
            this.note.author.id !== Player.MemberNumber
        ) {
            deleteBtn.classList.add("lcDisabled");
        }
        deleteBtn.addEventListener("click", () => {
            if (
                !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.DELETE_NOTES) &&
                this.note.author.id !== Player.MemberNumber
            ) {
                deleteBtn.classList.add("lcDisabled");
            }
            if (InformationSheetSelection.IsPlayer()) {
                modStorage.notes.list.splice(this.key - 1, 1);
                this.exit();
            } else {
                chatSendModMessage("deleteNote", {
                    key: this.key
                }, InformationSheetSelection.MemberNumber);
                this.setPreviousSubscreen();
            }
        });
    }

    exit() {
        syncStorage();
        this.setPreviousSubscreen();
    }
}