interface Window {
    LSCG_REMOTE_WINDOW_OPEN?: boolean
    bcx?: {
        inBcxSubscreen: () => boolean
    },
    MPA?: {
        version: string
        menuLoaded: boolean
    }
    LITTLISH_CLUB: LITTLISH_CLUB_API
}