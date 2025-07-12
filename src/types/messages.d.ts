import { CaregiverAccessRightId } from "./access";
import { StorageCyberDiaper } from "./cyberDiaper";
import { StorageRule } from "./rules";
import { PublicModStorage } from "./storage";



export interface SyncStorageMessageData {
    storage: PublicModStorage
}

export interface ChangeCaregiversListMessageData {
    list: number[]
}

export interface TurnCaregiversAccessRightMessageData {
    accessRightId: CaregiverAccessRightId
}

export type ChangeRuleSettingsMessageData = Partial<StorageRule>;

export interface AddNoteMessageData {
    text: string
}

export interface DeleteNoteMessageData {
    key: number
}

export type ChangeCyberDiaperSettingsMessageData = StorageCyberDiaper;

export interface DeleteLogsMessageData {
    count: number
}