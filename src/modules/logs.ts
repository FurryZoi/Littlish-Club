import { modStorage, syncStorage } from "./storage";


export interface Log {
    message: string
    ts: number
}

export function addLog(message: string, push: boolean = true): void {
    if (!modStorage.logs) modStorage.logs = {};
    if (!modStorage.logs.list) modStorage.logs.list = [];
    modStorage.logs.list.push({
        message,
        ts: Date.now()
    });
    if (push) syncStorage();
}