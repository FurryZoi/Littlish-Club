import { MOD_FULL_NAME, MOD_NAME, MOD_VERSION, REPO_URL } from "@/constants";
import bcModSdk, { PatchHook, ModSDKModInfo, GetDotedPathType } from "bondage-club-mod-sdk";

export enum HookPriority {
    Observe = 0,
    AddBehavior = 1,
    ModifyBehavior = 5,
    OverrideBehavior = 10,
    Top = 100
}

const modSdk = bcModSdk.registerMod({
    name: MOD_NAME,
    fullName: MOD_FULL_NAME,
    version: MOD_VERSION,
    repository: REPO_URL
});

export function hookFunction(functionName: string, priority: HookPriority, hook: PatchHook): () => void {
    return modSdk.hookFunction(functionName, priority, hook);
}

export function patchFunction(functionName: string, patches: Record<string, string | null>): void {
    modSdk.patchFunction(functionName, patches);
}

export function callOriginal<TFunctionName extends string>(
    target: TFunctionName,
    args: [...Parameters<GetDotedPathType<typeof globalThis, TFunctionName>>],
    context?: any
): ReturnType<GetDotedPathType<typeof globalThis, TFunctionName>> {
    return modSdk.callOriginal(target, args);
}

export function getActiveMods(): ModSDKModInfo[] {
    return bcModSdk.getModsInfo();
}

export function findModByName(name: string): boolean {
    return !!bcModSdk.getModsInfo().find((m) => m.name === name);
}