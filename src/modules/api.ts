import { BaseSubscreen, getCurrentSubscreen } from "zois-core/ui";
import { getCaregiversOf, getMommyOf, hasAccessRightTo, isCaregiverOf, isMommyOf } from "./access";
import { isRuleActive, isSleeping } from "./rules";



export function createApi(): void {
    window.LITTLISH_CLUB = Object.freeze({
        inModSubscreen: () => getCurrentSubscreen() instanceof BaseSubscreen,
        getCaregiversOf,
        getMommyOf,
        isCaregiverOf,
        isMommyOf,
        hasAccessRightTo,
        isRuleActive,
        isSleeping
    });
}