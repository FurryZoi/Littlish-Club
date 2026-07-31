import { AccessRight, caregiverAccessRightsList, hasAccessRightTo, isCaregiverAccessRightEnabled, turnCaregiverAccessRight } from "@/modules/access";
import { BaseSubscreen } from "zois-core/ui";
import { messagesManager } from "zois-core/messaging";
import { addLog } from "@/modules/logs";
import { getNickname } from "zois-core";
import { syncStorage } from "@/modules/storage";
import { TurnCaregiversAccessRightMessageData } from "@/types/messages";

export class CaregiversPermissionsMenu extends BaseSubscreen {
    get name() {
        return "Family > Caregivers permissions";
    }

    public override load() {
        super.load();

        caregiverAccessRightsList.forEach((p, i) => {
            this.createCheckbox({
                text: p.name,
                width: 1200,
                x: 200,
                y: 250 + 90 * i,
                isChecked: InformationSheetSelection !== null && isCaregiverAccessRightEnabled(InformationSheetSelection, p.id),
                isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS),
                onChange: () => {
                    if (InformationSheetSelection?.IsPlayer()) {
                        turnCaregiverAccessRight(p.id);
                        addLog(
                            `${getNickname(Player)} (${Player.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, p.id) ? "on" : "off"
                            } caregiver access right "${p.name}"`,
                            false
                        );
                        syncStorage();
                    } else {
                        messagesManager.sendPacket<TurnCaregiversAccessRightMessageData>("turnCaregiversAccessRight", {
                            accessRightId: p.id
                        }, InformationSheetSelection?.MemberNumber);
                    }
                }
            });
        });
    }
}