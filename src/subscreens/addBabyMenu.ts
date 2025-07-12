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

        const scrollView = this.createScrollView({
            scroll: "y",
            x: 150,
            y: 200,
            width: 1700,
            height: 700
        });
        scrollView.style.display = "flex";
        scrollView.style.flexDirection = "column";
        scrollView.style.alignItems = "center";
        scrollView.style.rowGap = "1vw";

        ChatRoomCharacter?.forEach((C) => {
            const btn = this.createButton({
                text: isRequestedByPlayer(C) ? `${CharacterNickname(C)} (${C.MemberNumber}) [ Pending... ]` : `${CharacterNickname(C)} (${C.MemberNumber})`,
                place: false,
                padding: 2,
                isDisabled: () => !C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C) || isRequestedByPlayer(C),
                onClick: () => {
                    messagesManager.sendPacket("addBaby", null, C.MemberNumber);
                    this.exit();
                }
            });
            btn.style.wordBreak = "break-all";
            btn.style.width = "98%";
            scrollView.append(btn);
        });
    }
}