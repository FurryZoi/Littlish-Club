import { currentSubscreen } from "@/subscreens/baseSubscreen";
import { getCaregiversOf, getMommyOf, hasAccessRightTo, isCaregiverOf, isMommyOf } from "./access";
import { isRuleActive, isSleeping } from "./rules";



export function createApi(): void {
    window.LITTLISH_CLUB = Object.freeze({
        inModSubscreen: () => !!currentSubscreen,
        getCaregiversOf,
        getMommyOf,
        isCaregiverOf,
        isMommyOf,
        hasAccessRightTo,
        isRuleActive,
        isSleeping
    });
}