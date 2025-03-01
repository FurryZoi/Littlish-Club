import { currentSubscreen } from "@/subscreens/baseSubscreen";
import { getCaregiversOf, getMommyOf, hasAccessRightTo } from "./access";



export function createApi(): void {
    window.LITTLISH_CLUB = {
        inModSubscreen: () => !!currentSubscreen,
        getCaregiversOf,
        getMommyOf,
        hasAccessRightTo
    }
}