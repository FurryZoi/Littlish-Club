declare interface LITTLISH_CLUB_API {
    inModSubscreen(): boolean
    getCaregiversOf(C: Character): number[]
    getMommyOf(C: Character): {
        name: string
        id: number
    } | null,
    hasAccessRightTo(C1: Character, C2: Character, accessRight: import("@/modules/access").AccessRight): boolean
}
