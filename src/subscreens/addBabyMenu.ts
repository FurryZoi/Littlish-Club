import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "zois-core/ui";
import { messagesManager } from "zois-core/messaging";
import { hasMommy, isRequestedByPlayer } from "@/modules/access";


export class AddBabyMenu extends BaseSubscreen {
    get name() {
        return "Add baby";
    }

    load() {
        super.load();

        const container = this.createContainer({
            scroll: "y",
            x: 150,
            y: 200,
            width: 1700,
            height: 700
        });
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.rowGap = "1vw";

        ChatRoomCharacter?.forEach((C) => {
            const btn = this.createButton({
                text: isRequestedByPlayer(C) ? `${CharacterNickname(C)} (${C.MemberNumber}) [ Pending... ]` : `${CharacterNickname(C)} (${C.MemberNumber})`,
                parent: container,
                padding: 2,
                isDisabled: () => !C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C) || isRequestedByPlayer(C),
                onClick: () => {
                    messagesManager.sendPacket("addBaby", null, C.MemberNumber);
                    this.exit();
                }
            });
            btn.style.wordBreak = "break-all";
            btn.style.width = "98%";
        });
    }
}