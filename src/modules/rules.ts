import { hookFunction, HookPriority } from "./bcModSdk";
import { modStorage } from "./storage";

export const rulesList: Rule[] = [
    {
        id: 1000,
        name: "Prevent taking ABDL items off",
        description: "Prevents baby from taking ABDL items off"
    },
    {
        id: 1001,
        name: "Prevent using admin powers",
        description: "Prevents baby from using room administration"
    },
    {
        id: 1002,
        name: "Prevent resisting urges",
        description: "Prevents baby from resisting any urges"
    },
    {
        id: 1003,
        name: "ABDL inventory",
        description: "Takes all the items from the baby except the ABDL"
    },
    {
        id: 1004,
        name: "Speak like baby",
        description: "Force baby to speak like little baby"
    },
    {
        id: 1005,
        name: "Walk like baby",
        description: "Prevents baby from standing"
    },
    {
        id: 1006,
        name: "Can't go in the shop alone",
        description: "Prevents baby from going to the club shop"
    },
    {
        id: 1007,
        name: "Fall asleep after milk bottle",
        description: "Baby will fall asleep after drinking the milk (if it doesn't have another effect)"
    }
];

export enum RuleId {
    PREVENT_TAKING_ABDL_ITEMS_OFF = 1000,
    PREVENT_USING_ADMIN_POWERS = 1001,
    PREVENT_RESISTING_URGES = 1002,
    ABDL_INVENTORY = 1003,
    SPEAK_LIKE_BABY = 1004,
    WALK_LIKE_BABY = 1005,
    CANT_GO_SHOP_ALONE = 1006,
    FALL_SLEEP_AFTER_MILK_BOTTLE = 1007
}

export interface Rule {
    id: number
    name: string
    description: string
}

export interface StorageRule {
    id: number
    state: boolean
    strict: boolean
    addedBy: number
    changedBy: number
    ts: number
}

export function isRuleActive(ruleId: RuleId): boolean {
    return isRuleEnabled(ruleId);
}

export function isRuleEnabled(ruleId: number): boolean {
    return modStorage.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
}

export function isRuleStrict(ruleId: number): boolean {
    return modStorage.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
}

export function loadRules(): void {
    hookFunction("Player.CanChangeToPose", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isRuleActive(RuleId.WALK_LIKE_BABY)) return false;
        return next(args);
    });

    hookFunction("PoseCanChangeUnaidedStatus", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!args[0].IsPlayer()) return next(args);
        if (isRuleActive(RuleId.WALK_LIKE_BABY)) return PoseChangeStatus.NEVER;
        return next(args);
    });

    hookFunction("ChatRoomCanAttemptStand", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isRuleActive(RuleId.WALK_LIKE_BABY)) return false;
        return next(args);
    });

    hookFunction("ChatAdminCanEdit", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isRuleActive(RuleId.PREVENT_USING_ADMIN_POWERS) && CurrentScreen === "ChatAdmin" && next(args) === true) {
            return ChatAdminMode === "create";
        }
        return next(args);
    });

    hookFunction("ServerSend", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const message = args[0];
        const params = args[1];
        if (
            message === "ChatRoomChat" &&
            ["Chat", "Whisper"].includes(params.Type) &&
            params.Content[0] !== "(" &&
            isRuleActive(RuleId.SPEAK_LIKE_BABY)
        ) params.Content = SpeechTransformBabyTalk(params.Content);
        return next(args);
    });

    hookFunction("DialogInventoryAdd", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const [C, item, isWorn, sortOrder] = args;
        const asset = item.Asset;

        if (DialogMenuMode !== "permissions") {
            if (
                !asset.Category?.includes("ABDL") &&
                isRuleActive(RuleId.ABDL_INVENTORY)
            ) return;
        }
        next(args);
    });

    hookFunction("ShopLoad", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!isRuleActive(RuleId.CANT_GO_SHOP_ALONE)) return next(args);
        // @ts-ignore
        window.ShopLCLeave = () => {
            CommonSetScreen("Room", "MainHall");
            DialogLeave();
            // @ts-ignore
            delete window.ShopLeave;
        };

        window.ShopVendor = CharacterLoadNPC("NPC_Shop_Vendor");
        InventoryWear(ShopVendor, "H1000", "Height", "Default");
        ShopVendor.Stage = "LC_BabyCantShopAlone1";
        ShopVendor.CurrentDialog = "Oh? Cutie, aren't you lost? Where are your parents?";
        CharacterSetCurrent(ShopVendor);
        DialogChangeMode("dialog");
    });

    hookFunction("ShopRun", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!isRuleActive(RuleId.CANT_GO_SHOP_ALONE)) return next(args);
        DrawCharacter(Player, 0, 0, 1);
        DrawCharacter(ShopVendor, 500, 0, 1);
        DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
        DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
    });

    hookFunction("CharacterBuildDialog", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const C = args[0];
        if (C.CharacterID === "NPC_Shop_Vendor" && isRuleActive(RuleId.CANT_GO_SHOP_ALONE)) {
            const stage1 = "LC_BabyCantShopAlone1";
            const stage2 = "LC_BabyCantShopAlone2";
            const stage3 = "LC_BabyCantShopAlone3";

            C.Dialog.push(
                {
                    Stage: stage1,
                    NextStage: stage2,
                    Option: "Huh? I am adult!",
                    Result: "(She starts laughing)"
                },
                {
                    Stage: stage1,
                    Option: "(Leave shop)",
                    Function: "LCLeave();"
                },
                {
                    Stage: stage2,
                    NextStage: stage3,
                    Option: "I'm old enough to go to the shop!",
                    Result: "Baby, please leave this shop, it's for adults only."
                },
                {
                    Stage: stage2,
                    Option: "(Leave shop)",
                    Function: "LCLeave();"
                },
                {
                    Stage: stage3,
                    Option: "(Leave shop)",
                    Function: "LCLeave();"
                }
            );
            return;
        }
        return next(args);
    });

}