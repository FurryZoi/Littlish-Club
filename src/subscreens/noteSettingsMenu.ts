import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "zois-core/ui";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { messagesManager } from "zois-core/messaging";
import { addLog } from "@/modules/logs";
import { getNickname } from "zois-core";
import { DeleteNoteMessageData } from "@/types/messages";



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
        super.load();

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

        this.createButton({
            text: "Delete",
            x: 1550,
            y: 850,
            width: 360,
            padding: 2,
            isDisabled: () => (
                !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.DELETE_NOTES) &&
                this.note.author.id !== Player.MemberNumber
            ),
            onClick: () => {
                if (InformationSheetSelection.IsPlayer()) {
                    const [note] = modStorage.notes.list.splice(this.key - 1, 1);
                    addLog(`${getNickname(Player)} (${Player.MemberNumber}) deleted note: "${note.text}"`, false);
                    this.exit();
                } else {
                    messagesManager.sendPacket<DeleteNoteMessageData>("deleteNote", {
                        key: this.key
                    }, InformationSheetSelection.MemberNumber);
                    this.setPreviousSubscreen();
                }
            }
        });
    }

    exit() {
        super.exit();
        syncStorage();
    }
}