import { AccessRight, caregiverAccessRightsList, hasAccessRightTo, isCaregiverAccessRightEnabled, turnCaregiverAccessRight } from "@/modules/access";
import { BaseSubscreen } from "./baseSubscreen";

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
                style: isCaregiverAccessRightEnabled(Player, p.id) ? "green" : "default"
            });
            if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)) {
                btn.classList.add("lcDisabled");
            }
            btn.addEventListener("click", () => {
                if (!hasAccessRightTo(Player, InformationSheetSelection, AccessRight.MANAGE_CAREGIVERS_ACCESS_RIGHTS)) {
                    btn.classList.add("lcDisabled");
                }
                turnCaregiverAccessRight(p.id);
                btn.setAttribute("data-lc-style", isCaregiverAccessRightEnabled(Player, p.id) ? "green" : "default");
            });
        });
    }
}