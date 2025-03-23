import { chatSendActionMessage, chatSendLocal } from "@/utils/chat";
import { hookFunction, HookPriority } from "./bcModSdk";
import { ModStorage, modStorage, syncStorage } from "./storage";
import { MOD_NAME } from "@/constants";
import { getRandomNumber } from "@/utils/main";
import { getNickname, getPlayer } from "@/utils/characters";


const dialogMenuButtonClickHooks = new Map();
const buttonLabels = new Map();
const imageRedirects = new Map();


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
        description: "Force baby to speak like little baby",
        data: [
            {
                name: "altSpeech",
                text: "Alternative baby speech algorithm",
                type: "checkbox"
            }
        ]
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
    },
    {
        id: 1008,
        name: "Decrease size",
        description: "Decreases baby's size",
        data: [
            {
                name: "multiplier",
                text: "Size Multiplier",
                type: "number",
                min: 0.25,
                max: 1,
                step: 0.01
            }
        ]
    },
    {
        id: 1009,
        name: "Disable reset settings button",
        description: "Disables button to reset mod settings"
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
    FALL_SLEEP_AFTER_MILK_BOTTLE = 1007,
    DECREASE_SIZE = 1008,
    DISABLE_RESET_SETTINGS_BUTTON = 1009
}

export interface Rule {
    id: number
    name: string
    description: string
    data?: {
        name: string
        text: string
        type: "text" | "number" | "checkbox"
        min?: number
        max?: number
        step?: number
    }[]
}

export interface StorageRule {
    id: number
    state: boolean
    strict: boolean
    changedBy: number
    ts: number
    data?: Record<string, string | number | boolean>
    conditions?: {
        type?: "all" | "any"
        whenInRoomWithRole?: {
            inRoom: boolean
            role: "caregiver" | "mommy"
        }
        whenInRoomWhereAbdl?: {
            blocked: boolean
        }
    }
}

export function isRuleActive(C: Character, ruleId: RuleId): boolean {
    if (!isRuleEnabled(C, ruleId)) return false;
    const conditions = getRuleConditions(C, ruleId);
    if (!conditions?.whenInRoomWithRole && !conditions?.whenInRoomWhereAbdl) return true
    let whenInRoomWithRoleCondition = false;
    let whenInRoomWhereAbdlCondition = false;
    if (conditions.whenInRoomWithRole) {
        if ((conditions?.whenInRoomWithRole?.role ?? "caregiver") === "caregiver") {
            whenInRoomWithRoleCondition = (conditions?.whenInRoomWithRole?.inRoom ?? true) ?
                inRoomWithCaregiver(C)
                : !inRoomWithCaregiver(C);
        } else {
            whenInRoomWithRoleCondition = (conditions?.whenInRoomWithRole?.inRoom ?? true) ?
                inRoomWithMommy(C)
                : !inRoomWithMommy(C);
        }
    }
    if (conditions.whenInRoomWhereAbdl) {
        whenInRoomWhereAbdlCondition = (conditions?.whenInRoomWhereAbdl?.blocked ?? true) ?
            inRoomWhereAbdlIsBlocked()
            : !inRoomWhereAbdlIsBlocked();
    }
    const conditionsValues = [];
    if (conditions?.whenInRoomWithRole) conditionsValues.push(whenInRoomWithRoleCondition);
    if (conditions?.whenInRoomWhereAbdl) conditionsValues.push(whenInRoomWhereAbdlCondition);
    return (conditions?.type ?? "any") === "all" ?
        conditionsValues.every((b) => b)
        : conditionsValues.some((b) => b);

}

export function isRuleEnabled(C: Character, ruleId: number): boolean {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
}

export function isRuleStrict(C: Character, ruleId: number): boolean {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
}

export function getRuleParameter<T>(C: Character, ruleId: number, parameter: string): T | null {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.data?.[parameter] as T ?? null;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.data?.[parameter] as T ?? null;
}

export function getRuleConditions(C: Character, ruleId: number) {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.conditions ?? null;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.conditions ?? null;
}

export function isSleeping(C: Character): boolean {
    if (C.IsPlayer()) return modStorage.sleepState ?? false;
    return C.LITTLISH_CLUB?.sleepState ?? false;
}

export function inRoomWithCaregiver(C: Character): boolean {
    let storage: ModStorage;
    if (C.IsPlayer()) storage = modStorage;
    else storage = C.LITTLISH_CLUB;
    for (const c of ChatRoomCharacter) {
        if (storage?.caregivers?.list?.includes(c.MemberNumber)) return true;
    }
    return false;
}

export function inRoomWithMommy(C: Character): boolean {
    let storage: ModStorage;
    if (C.IsPlayer()) storage = modStorage;
    else storage = C.LITTLISH_CLUB;
    for (const c of ChatRoomCharacter) {
        if (storage?.mommy?.id === c.MemberNumber) return true;
    }
    return false;
}

export function inRoomWhereAbdlIsBlocked(): boolean {
    return ChatRoomData?.BlockCategory?.includes("ABDL");
}

function registerButton(name: string, label: string, icon: string, fn: () => void): void {
    imageRedirects.set(`Icons/${name}.png`, icon);
    buttonLabels.set(name, label);

    let hooks = dialogMenuButtonClickHooks.get(name);
    if (!hooks) {
        hooks = [];
        dialogMenuButtonClickHooks.set(name, hooks);
    }
    if (!hooks.includes(fn)) {
        hooks.push(fn);
    }
}

function alternativeBabyTalk(text: String): String {
    text = text.toLowerCase();

    text = text.replaceAll("is", "ith");
    text = text.replaceAll("are", "aw");
    text = text.replaceAll("am", "amm");
    text = text.replaceAll("no", "ni");
    text = text.replaceAll("s", "th");
    text = text.replaceAll("h", "hh");

    const babyWords = ['ba-bye', 'da-da', 'ma-ma', 'goo-goo', 'wee', 'ooh', 'gu', 'ga', 'agu', 'guga'];
    text = text.replace(/(\w+)\b/g, (word) => word + (getRandomNumber(1, text.split(" ").length) === 1 ? " " + babyWords[Math.floor(Math.random() * babyWords.length)] : ""));

    return text.trim();
}

export function loadRules(): void {
    const attempt = () => {
        const item = InventoryGet(Player, Player.FocusGroup?.Name);
        if (!item) return;
        const itemName = item.Craft ? item.Craft.Name : item.Asset.Description;
        if (
            item?.Asset?.Category?.includes("ABDL") &&
            isRuleActive(Player, RuleId.PREVENT_TAKING_ABDL_ITEMS_OFF)
        ) {
            chatSendActionMessage(
                `Baby ${CharacterNickname(
                    Player
                )} tried to remove ${itemName} without mommy's permission`
            );
        }
    }


    registerButton(
        "LC_Remove",
        `Blocked by ${MOD_NAME}`,
        `Icons/Remove.png`,
        attempt
    );
    registerButton(
        "LC_Escape",
        `Blocked by ${MOD_NAME}`,
        `Icons/Escape.png`,
        attempt
    );
    registerButton(
        "LC_Struggle",
        `Blocked by ${MOD_NAME}`,
        `Icons/Struggle.png`,
        attempt
    );
    registerButton(
        "LC_Dismount",
        `Blocked by ${MOD_NAME}`,
        `Icons/Dismount.png`,
        attempt
    );


    hookFunction("Player.CanChangeToPose", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isRuleActive(Player, RuleId.WALK_LIKE_BABY) || isSleeping(Player)) return false;
        return next(args);
    });

    hookFunction("PoseCanChangeUnaidedStatus", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!args[0].IsPlayer()) return next(args);
        if (isRuleActive(Player, RuleId.WALK_LIKE_BABY) || isSleeping(Player)) return PoseChangeStatus.NEVER;
        return next(args);
    });

    hookFunction("ChatRoomCanAttemptStand", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isRuleActive(Player, RuleId.WALK_LIKE_BABY) || isSleeping(Player)) return false;
        return next(args);
    });

    hookFunction("ChatAdminCanEdit", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isRuleActive(Player, RuleId.PREVENT_USING_ADMIN_POWERS) && CurrentScreen === "ChatAdmin" && next(args) === true) {
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
            params.Content[0] !== "("
        ) {
            if (isSleeping(Player)) return chatSendLocal("You are asleep, use OOC to speak");
            if (isRuleActive(Player, RuleId.SPEAK_LIKE_BABY)) {
                if (getRuleParameter<boolean>(Player, RuleId.SPEAK_LIKE_BABY, "altSpeech")) {
                    params.Content = alternativeBabyTalk(params.Content);
                } else {
                    params.Content = SpeechTransformBabyTalk(params.Content);
                }
            }
        }
        return next(args);
    });

    hookFunction("DialogInventoryAdd", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const [C, item, isWorn, sortOrder] = args;
        const asset = item.Asset;

        if (DialogMenuMode !== "permissions") {
            if (
                !asset.Category?.includes("ABDL") &&
                isRuleActive(Player, RuleId.ABDL_INVENTORY)
            ) return;
        }
        next(args);
    });

    hookFunction("ShopLoad", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!isRuleActive(Player, RuleId.CANT_GO_SHOP_ALONE)) return next(args);
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
        if (!isRuleActive(Player, RuleId.CANT_GO_SHOP_ALONE)) return next(args);
        DrawCharacter(Player, 0, 0, 1);
        DrawCharacter(ShopVendor, 500, 0, 1);
        DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
        DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
    });

    hookFunction("CharacterBuildDialog", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const C = args[0];
        if (C.CharacterID === "NPC_Shop_Vendor" && isRuleActive(Player, RuleId.CANT_GO_SHOP_ALONE)) {
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

    hookFunction("Player.CanChangeOwnClothes", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return false;
        return next(args);
    });

    hookFunction("Player.IsDeaf", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return true;
        return next(args);
    });

    hookFunction("Player.IsBlind", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return true;
        return next(args);
    });

    hookFunction("Player.GetDeafLevel", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return 4;
        return next(args);
    });

    hookFunction("Player.GetBlindLevel", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return 3;
        return next(args);
    });

    hookFunction("Player.CanInteract", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return false;
        return next(args);
    });

    hookFunction("InventoryGroupIsBlockedForCharacter", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return true;
        return next(args);
    });

    hookFunction("DialogClickExpressionMenu", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (isSleeping(Player)) return false;
        return next(args);
    });

    hookFunction("CharacterAppearanceSetItem", HookPriority.OBSERVE, (args, next) => {
        const createdItem: Item | null = next(args);
        const [C, Group, ItemAsset] = args as [Character, AssetGroupName, Asset | null];
        if (
            C.IsPlayer() &&
            ["ItemMouth", "ItemMouth2", "itemMouth3"].includes(Group) &&
            ItemAsset.Name === "MilkBottle" &&
            isRuleActive(Player, RuleId.FALL_SLEEP_AFTER_MILK_BOTTLE) &&
            !isSleeping(Player)
        ) {
            CharacterSetFacialExpression(Player, "Blush", "High");
            ChatRoomCharacterUpdate(Player);

            setTimeout(() => {
                document.body.style.filter = "blur(4px)";
                CharacterSetFacialExpression(Player, "Eyes", "Dazed");
                CharacterSetFacialExpression(Player, "Eyebrows", null);
                ChatRoomCharacterUpdate(Player);
                setTimeout(() => {
                    document.body.style.filter = null;
                    PoseSetActive(Player, "Kneel");
                    CharacterSetFacialExpression(Player, "Emoticon", "Sleep");
                    CharacterSetFacialExpression(Player, "Eyes", "Closed");
                    ChatRoomCharacterUpdate(Player);
                    modStorage.sleepState = true;
                    syncStorage();
                    chatSendLocal("You fall asleep");
                    chatSendActionMessage(`${getNickname(Player)} fell asleep, only spank or french kiss can wake <intensive> up`);
                }, getRandomNumber(6000, 8000));
            }, getRandomNumber(6000, 10000));
        }
        return createdItem;
    });

    ChatRoomRegisterMessageHandler({
        Priority: 10,
        Callback: (data, sender) => {
            if (!sender) return false;
            if (data.Type === "Activity" && !!data.Dictionary?.find) {
                const activityName = data.Dictionary.find((e) => {
                    // @ts-ignore
                    return !!e.ActivityName;
                    // @ts-ignore
                })?.ActivityName;
                const target = getPlayer(
                    data.Dictionary.find((e) => {
                        // @ts-ignore
                        return !!e.TargetCharacter;
                        // @ts-ignore
                    })?.TargetCharacter
                );
                if (target?.IsPlayer() && ["Spank", "FrenchKiss"].includes(activityName) && isSleeping(Player)) {
                    CharacterSetFacialExpression(Player, "Emoticon", null);
                    CharacterSetFacialExpression(Player, "Eyes", "Open");
                    ChatRoomCharacterUpdate(Player);
                    modStorage.sleepState = false;
                    syncStorage();
                }
            }
            return false;
        }
    });

    hookFunction("CharacterAppearanceGetCurrentValue", HookPriority.ADD_BEHAVIOR, (args, next) => {
        const [C, Group, Type] = args as [Character, AssetGroupName, string];
        if (
            !C || !(C.LITTLISH_CLUB || C.IsPlayer()) ||
            Group !== "Height" || Type !== "Zoom" || (Player.VisualSettings?.ForceFullHeight ?? false)
        ) return next(args);
        const sizeMultiplier = (getRuleParameter(C, RuleId.DECREASE_SIZE, "multiplier") ?? 1) as number;
        if (sizeMultiplier > 1 || sizeMultiplier < 0.25) return next(args);
        if (isRuleActive(C, RuleId.DECREASE_SIZE)) {
            return next(args) * sizeMultiplier;
        }
        return next(args);
    });

    hookFunction("CommonDrawAppearanceBuild", HookPriority.ADD_BEHAVIOR, (args, next) => {
        args[0].HeightRatio = CharacterAppearanceGetCurrentValue(args[0], "Height", "Zoom");
        return next(args);
    });

    hookFunction("DrawCharacter", HookPriority.ADD_BEHAVIOR, (args, next) => {
        args[0].HeightRatio = CharacterAppearanceGetCurrentValue(args[0], "Height", "Zoom");
        return next(args);
    });

    hookFunction("DialogMenuButtonBuild", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        next(args);
        const C: Character = args[0];
        const item = InventoryGet(C, C?.FocusGroup?.Name);
        if (
            C.IsPlayer() &&
            item &&
            item?.Asset?.Category?.includes("ABDL") &&
            isRuleActive(Player, RuleId.PREVENT_TAKING_ABDL_ITEMS_OFF)
        ) {
            {
                const removeIndex = DialogMenuButton.indexOf("Remove");
                const struggleIndex = DialogMenuButton.indexOf("Struggle");
                const dismountIndex = DialogMenuButton.indexOf("Dismount");
                const escapeIndex = DialogMenuButton.indexOf("Escape");

                if (removeIndex >= 0) {
                    // @ts-ignore
                    DialogMenuButton[removeIndex] = "LC_Remove";
                }
                if (struggleIndex >= 0) {
                    // @ts-ignore
                    DialogMenuButton[struggleIndex] = "LC_Struggle";
                }
                if (dismountIndex >= 0) {
                    // @ts-ignore
                    DialogMenuButton[dismountIndex] = "LC_Dismount";
                }
                if (escapeIndex >= 0) {
                    // @ts-ignore
                    DialogMenuButton[escapeIndex] = "LC_Escape";
                }
            }
        }
    });

    hookFunction("DialogItemClick", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const C = CharacterGetCurrent();
        const focusGroup = C?.FocusGroup;
        const item = InventoryGet(C, focusGroup?.Name);
        const clickedItem = args[0];
        if (DialogMenuMode !== "items") return next(args);
        if (!item) return next(args);

        if (
            C.IsPlayer() &&
            item &&
            item?.Asset?.Category?.includes("ABDL") &&
            isRuleActive(Player, RuleId.PREVENT_TAKING_ABDL_ITEMS_OFF)
        ) return;

        return next(args);
    });

    hookFunction("InterfaceTextGet", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const label = buttonLabels.get(args[0]?.replace("DialogMenu", ""));
        if (label) return label;
        return next(args);
    });

    hookFunction("DrawGetImage", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const redirect = imageRedirects.get(args[0]);
        if (redirect) {
            args[0] = redirect;
        }
        return next(args);
    });

    hookFunction("DialogIsMenuButtonDisabled", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (args[0]?.startsWith("LC_")) return true;
        return next(args);
    });

    hookFunction("DialogMenuButtonClick", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const C = CharacterGetCurrent();
        for (let I = 0; I < DialogMenuButton.length; I++) {
            if (MouseIn(1885 - I * 110, 15, 90, 90) && C) {
                const hooks = dialogMenuButtonClickHooks.get(DialogMenuButton[I]);
                if (hooks?.some((hook) => hook(C))) return true;
            }
        }
        return next(args);
    });

}
