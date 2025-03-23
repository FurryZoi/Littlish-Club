import { modStorage, Note, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { chatSendModMessage } from "@/utils/chat";
import { hasMommy, isRequestedByPlayer } from "@/modules/access";


export class AddBabyMenu extends BaseSubscreen {
    get name() {
        return "Add baby";
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
                padding: 2
            });
            btn.style.wordBreak = "break-all";
            btn.style.width = "98%";
            btn.addEventListener("click", () => {
                if (!C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C)) return;
                chatSendModMessage("addBaby", null, C.MemberNumber);
                this.exit();
            });
            if (!C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C) || isRequestedByPlayer(C)) btn.classList.add("lcDisabled");
            scrollView.append(btn);
        });
    }
}