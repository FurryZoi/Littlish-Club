import { currentSubscreen } from "@/subscreens/baseSubscreen";
import { getCaregiversOf, getMommy } from "./access";



export function createApi(): void {
    window.LITTLISH_CLUB = {
        inModSubscreen: () => !!currentSubscreen,
        getCaregiversOf,
        getMommyOf: (C) => getMommy(C)
    }
}