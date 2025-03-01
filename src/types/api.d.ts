declare interface LITTLISH_CLUB_API {
    inModSubscreen(): boolean
    getCaregiversOf(C: Character): number[]
    getMommyOf(C: Character): {
        name: string
        id: number
    }
}