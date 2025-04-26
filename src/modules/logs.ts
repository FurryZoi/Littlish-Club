import { modStorage, syncStorage } from "./storage";


export interface Log {
    message: string
    ts: number
}

export function addLog(message: string, push: boolean = true): Log {
    if (!modStorage.logs) modStorage.logs = {};
    if (!modStorage.logs.list) modStorage.logs.list = [];
    const l = modStorage.logs.list.push({
        message,
        ts: Date.now()
    });
    if (push) syncStorage();
    return modStorage.logs.list[l - 1];
}