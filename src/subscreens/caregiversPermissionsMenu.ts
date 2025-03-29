import { AccessRight, caregiverAccessRightsList, hasAccessRightTo, isCaregiverAccessRightEnabled, turnCaregiverAccessRight } from "@/modules/access";
import { BaseSubscreen } from "./baseSubscreen";
import { chatSendModMessage } from "@/utils/chat";
import { addLog } from "@/modules/logs";
import { getNickname } from "@/utils/characters";
import { syncStorage } from "@/modules/storage";
import { TurnCaregiversAccessRightMessageData } from "@/modules/messaging";

export class CaregiversPermissionsMenu extends BaseSubscreen {
    get name() {
        return "Family > Caregivers permissions";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        caregiverAccessRightsList.forEach((p, i) => {
            const btn = this.createButton({
                text: p.name,
                width: 1200,
                x: 400,
                y: 250 + 110 * i,
                padding: 2,
                style: isCaregiverAccessRightEnabled(InformationSheetSelection, p.id) ? "green" : "default"
            });
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)) {
                btn.classList.add("lcDisabled");
            }
            btn.addEventListener("click", () => {
                if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)) {
                    return btn.classList.add("lcDisabled");
                }
                if (InformationSheetSelection.IsPlayer()) {
                    turnCaregiverAccessRight(p.id);
                    addLog(
                        `${getNickname(Player)} (${Player.MemberNumber}) turned ${
                            isCaregiverAccessRightEnabled(Player, p.id) ? "on" : "off"
                        } caregiver access right "${p.name}"`,
                        false
                    );
                    syncStorage();
                } else {
                    chatSendModMessage<TurnCaregiversAccessRightMessageData>("turnCaregiversAccessRight", {
                        accessRightId: p.id
                    }, InformationSheetSelection.MemberNumber);
                }
                btn.setAttribute("data-lc-style", btn.getAttribute("data-lc-style") === "default" ? "green" : "default");
            });
        });
    }
}