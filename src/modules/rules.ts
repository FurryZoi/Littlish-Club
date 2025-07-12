import { messagesManager } from "zois-core/messaging";
import { hookFunction, HookPriority } from "zois-core/modsApi";
import { ModStorage, modStorage, syncStorage } from "./storage";
import { extendedABDLItemNames, MOD_NAME } from "@/constants";
import { getRandomNumber } from "zois-core";
import { getNickname, getPlayer } from "zois-core";
import paciferImage from "@/images/pacifier.png";
import { setSubscreen } from "zois-core/ui";
import { ItemListMenu } from "@/subscreens/common/itemListMenu";
import { RuleSettingsMenu } from "@/subscreens/ruleSettingsMenu";
import { toastsManager } from "zois-core/popups";
import { AccessRight, getCaregiversOf, getMommyOf, hasAccessRightTo } from "./access";
import { DictMenu } from "@/subscreens/common/dictMenu";


const dialogMenuButtonClickHooks = new Map();
const buttonLabels = new Map();
const imageRedirects = new Map();
let timerLastRulesCycleCall = 0;


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
                text: "Size multiplier",
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
    },
    {
        id: 1010,
        name: "Pacifier-checkboxes",
        description: "Replaces the default checkbox with the pacifier-checkbox in ALL places where possible"
    },
    {
        id: 1011,
        name: "Force nickname",
        description: "Force nickname",
        data: [
            {
                name: "nickname",
                text: "Nickname",
                type: "text",
            },
            {
                name: "color",
                text: "Label color",
                type: "color",
            }
        ]
    },
    {
        id: 1012,
        name: "Prevent using bondage on other",
        description: "Prevents baby from using bondage items on other characters",
        data: [
            {
                name: "allowAbdlItems",
                type: "checkbox",
                text: "Allow using ABDL items"
            }
        ]
    },
    {
        id: 1013,
        name: "Prevent joining ABDL blocked rooms",
        description: "Prevents baby from joining rooms with blocked ABDL category"
    },
    {
        id: 1014,
        name: "Prevent using Littlish Wardrobe on self",
        description: "Prevents baby from applying outfits from Littlish Wardrobe on self"
    },
    {
        id: 1015,
        name: "Prevent joining certain rooms",
        description: "Prevents baby from joining rooms with certain names",
        data: [
            {
                name: "roomNames",
                type: "list",
                listNumbersOnly: false,
                text: "Room names"
            },
            {
                name: "whitelistMode",
                type: "checkbox",
                text: "Whitelist mode"
            }
        ]
    },
    {
        id: 1016,
        name: "Force title",
        description: "Forces title for baby",
        data: [
            {
                name: "title",
                type: "extended",
                text: "Title",
                get: async (rule, ruleSettings) => {
                    let titles: TitleName[];
                    if (InformationSheetSelection.IsPlayer()) {
                        titles = TitleList.filter((t) => t.Requirement()).map((t) => t.Name);
                    } else {
                        const spinnerId = toastsManager.spinner({
                            message: "Loading titles"
                        });
                        const res = await messagesManager.sendRequest<TitleName[]>({
                            message: "getValidTitles",
                            target: InformationSheetSelection.MemberNumber,
                            type: "packet"
                        });
                        toastsManager.removeSpinner(spinnerId);
                        if (res.isError) {
                            return toastsManager.error({
                                message: "Loading error",
                                duration: 4000
                            });
                        }
                        titles = res.data;
                    }
                    setSubscreen(
                        new ItemListMenu({
                            screenName: "Pick title you want to force",
                            items: titles.map((t) => {
                                return {
                                    text: TextGet("Title" + t),
                                    value: t
                                };
                            }),
                            columns: "1fr 1fr 1fr",
                            onExit: () => {
                                setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                            },
                            onClick: (title: string) => {
                                if (!ruleSettings.data) ruleSettings.data = {};
                                ruleSettings.data.title = title;
                                setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                            }
                        })
                    );
                },
                validate: (value) => typeof value === "string" && !!TitleList.find((t) => t.Name === value)
            }
        ]
    },
    {
        id: 1017,
        name: "Show custom names",
        description: "Replaces characters real name with custom ones",
        data: [
            {
                name: "customNames",
                text: "Custom names",
                type: "extended",
                get: (rule, ruleSettings) => {
                    setSubscreen(
                        new DictMenu({
                            screenName: "Enter custom names",
                            keyName: "Member number",
                            valueName: "Custom name",
                            keyNumberOnly: true,
                            valueNumberOnly: false,
                            items: ruleSettings.data?.customNames ?? {},
                            onExit: () => {
                                setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                            },
                            onSave: (customNames) => {
                                if (!ruleSettings.data) ruleSettings.data = {};
                                ruleSettings.data.customNames = customNames;
                                setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                            }
                        })
                    );
                },
                validate: (value) => {
                    return (
                        Object.keys(value)?.every((d) => !Number.isNaN(parseInt(d))) &&
                        Object.values(value)?.every((d) => typeof d === "string")
                    );
                }
            }
        ]
    },
    {
        id: 1018,
        name: "Prevent freeing self",
        description: "Prevents baby from removing restraints from themselves"
    },
    {
        id: 1019,
        name: "Prevent using certain chat commands",
        description: "Prevents baby using certain chat commands",
        data: [
            {
                name: "commands",
                text: "Commands",
                type: "list",
                listNumbersOnly: false
            }
        ]
    },
    {
        id: 1020,
        name: "Summoning rattle",
        description: "Activates the feature to summon baby from any chat room",
        data: [
            {
                name: "timeout",
                text: "Timeout in seconds (Default: 5)",
                type: "number",
                min: 1
            }
        ]
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
    DISABLE_RESET_SETTINGS_BUTTON = 1009,
    PACIFIER_CHECKBOXES = 1010,
    CONTROL_NICKNAME = 1011,
    PREVENT_USING_BONDAGE_ON_OTHER = 1012,
    PREVENT_jOINING_ABDL_BLOCKED_ROOMS = 1013,
    PREVENT_APPLYING_OUTFITS_FROM_LITTLISH_WARDROBE_ON_SELF = 1014,
    PREVENT_JOINING_CERTAIN_ROOMS = 1015,
    FORCE_TITLE = 1016,
    SHOW_CUSTOM_NAMES = 1017,
    PREVENT_FREEING_SELF = 1018,
    PREVENT_USING_CERTAIN_CHAT_COMMANDS = 1019,
    SUMMONING_RATTLE = 1020
}

export interface Rule {
    id: number
    name: string
    description: string
    data?: {
        name: string
        text: string
        type: "text" | "number" | "checkbox" | "color" | "list" | "extended"
        min?: number
        max?: number
        step?: number
        listNumbersOnly?: boolean
        get?: (rule: Rule, ruleSettings: StorageRule) => void
        validate?: (value: unknown) => boolean
    }[]
}

export interface StorageRule {
    id: number
    state: boolean
    strict: boolean
    changedBy: number
    ts: number
    data?: Record<string, unknown>
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
                inRoomWithCaregiver(C) || inRoomWithMommy(C)
                : !(inRoomWithCaregiver(C) || inRoomWithMommy(C));
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

export function isRuleEnabled(C: Character, ruleId: RuleId): boolean {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
}

export function isRuleStrict(C: Character, ruleId: RuleId): boolean {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
}

export function getRuleParameter<T>(C: Character, ruleId: RuleId, parameter: string): T | null {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.data?.[parameter] as T ?? null;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.data?.[parameter] as T ?? null;
}

export function getRuleConditions(C: Character, ruleId: RuleId) {
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

function alternativeBabyTalk(text: string): string {
    text = text.toLowerCase();

    text = text.replaceAll("s", "th");
    text = text.replaceAll("h", "hh");
    text = text.replaceAll("is", "ith");
    text = text.replaceAll("are", "aw");
    text = text.replaceAll("am", "amm");
    text = text.replaceAll("no", "ni");
    text = text.replaceAll("yeth", "yeshs");
    text = text.replaceAll("sorry", "sowwy");
    text = text.replaceAll("thanks", "tanks");
    text = text.replaceAll("this", "dis");
    text = text.replaceAll("the", "da");
    text = text.replaceAll("hello", "hewo");
    text = text.replaceAll("so", "sho");

    const babyWords = ['ba-ba', 'da-da', 'ma-ma', 'goo-goo', 'wee', 'ooh', 'gu', 'ga', 'agu', 'guga'];
    text = text.replace(/(\w+)\b/g, (word) => word + (getRandomNumber(1, text.split(" ").length) === 1 ? " " + babyWords[Math.floor(Math.random() * babyWords.length)] : ""));

    return text.trim();
}

function chatRoomSearchCanJoinRoom(room: ChatRoomSearchResult): [boolean, string] {
    if (isRuleActive(Player, RuleId.PREVENT_jOINING_ABDL_BLOCKED_ROOMS) && room?.BlockCategory?.includes("ABDL")) {
        return [
            false,
            `Rule "${rulesList.find((r) => r.id === RuleId.PREVENT_jOINING_ABDL_BLOCKED_ROOMS).name}" prevented you from joining that room`
        ];
    }
    if (!isRuleActive(Player, RuleId.PREVENT_JOINING_CERTAIN_ROOMS)) return [true, ""];
    const roomNames = ((getRuleParameter(Player, RuleId.PREVENT_JOINING_CERTAIN_ROOMS, "roomNames") ?? []) as string[])
        .map((n) => n.trim().toLowerCase());
    const whitelistMode = getRuleParameter(Player, RuleId.PREVENT_JOINING_CERTAIN_ROOMS, "whitelistMode");
    if (
        whitelistMode ?
            !roomNames.includes(room.Name.toLowerCase())
            : roomNames.includes(room.Name.toLowerCase())
    ) {
        return [
            false,
            `Rule "${rulesList.find((r) => r.id === RuleId.PREVENT_JOINING_CERTAIN_ROOMS).name}" prevented you from joining that room`
        ];
    }
    return [true, ""];
}

export function loadRules(): void {
    const attempt = () => {
        const item = InventoryGet(Player, Player.FocusGroup?.Name);
        if (!item) return;
        const itemName = item.Craft ? item.Craft.Name : item.Asset.Description;
        if (isRuleActive(Player, RuleId.PREVENT_FREEING_SELF) && item?.Asset?.IsRestraint) {
            messagesManager.sendAction(
                `Baby ${CharacterNickname(
                    Player
                )} helplessly tried to remove ${itemName}`
            );
        } else if (
            (
                item?.Asset?.Category?.includes("ABDL") ||
                extendedABDLItemNames.includes(item?.Asset?.Name)
            ) &&
            isRuleActive(Player, RuleId.PREVENT_TAKING_ABDL_ITEMS_OFF)
        ) {
            messagesManager.sendAction(
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

    messagesManager.onRequest("getValidTitles", (data, sender: Character) => {
        if (!hasAccessRightTo(sender, Player, AccessRight.MANAGE_RULES)) return;
        const titles = TitleList.filter((t) => t.Requirement()).map((t) => t.Name);
        console.log(titles);
        return titles;
    });

    messagesManager.onRequest("summon", (data, senderNumber: MemberNumber, senderName) => {
        if (getMommyOf(Player)?.id !== senderNumber && !getCaregiversOf(Player).includes(senderNumber)) return;
        if (!isRuleActive(Player, RuleId.SUMMONING_RATTLE)) return;
        if (typeof data?.roomName !== "string") return;
        toastsManager.info({
            title: "Summoning",
            message: `${senderName} summoned you, you will be moved in ${getRuleParameter(Player, RuleId.SUMMONING_RATTLE, "timeout") ?? "5"}s`,
            duration: 6000
        });
        setTimeout(() => {
            if (ServerPlayerIsInChatRoom()) {
                messagesManager.sendChat(`${CharacterNickname(Player)} was summoned.`);
                ChatRoomLeave();
                CommonSetScreen("Online", "ChatSearch");
            }
            ChatSearchLastQueryJoinTime = CommonTime();
            ChatSearchLastQueryJoin = data.roomName;
            ServerSend("ChatRoomJoin", { Name: data.roomName });
        }, (getRuleParameter(Player, RuleId.SUMMONING_RATTLE, "timeout") ?? 5) as number * 1000);
        return {
            success: true
        };
    });

    hookFunction("Player.CanChangeToPose", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (
            (
                isRuleActive(Player, RuleId.WALK_LIKE_BABY) &&
                !Player.Effect.includes("OnBed")
            ) ||
            isSleeping(Player)
        ) return false;
        return next(args);
    });

    hookFunction("PoseCanChangeUnaidedStatus", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!args[0].IsPlayer()) return next(args);
        if (
            (
                isRuleActive(Player, RuleId.WALK_LIKE_BABY) &&
                !Player.Effect.includes("OnBed")
            ) ||
            isSleeping(Player)
        ) return PoseChangeStatus.NEVER;
        return next(args);
    });

    hookFunction("ChatRoomCanAttemptStand", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (
            (
                isRuleActive(Player, RuleId.WALK_LIKE_BABY) &&
                !Player.Effect.includes("OnBed")
            ) ||
            isSleeping(Player)
        ) return false;
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
            if (isSleeping(Player)) return messagesManager.sendLocal("You are asleep, use OOC to speak");
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
        const [C, item, isWorn, sortOrder] = args as [Character, Item, boolean, DialogSortOrder];
        const asset = item.Asset;

        if (DialogMenuMode !== "permissions") {
            if (
                !asset.Category?.includes("ABDL") &&
                !extendedABDLItemNames.includes(asset.Name) &&
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
                    messagesManager.sendLocal("You fall asleep");
                    messagesManager.sendAction(`${getNickname(Player)} fell asleep, only spank or french kiss can wake <intensive> up`);
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
            return sizeMultiplier;
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
            (
                (
                    (
                        item?.Asset?.Category?.includes("ABDL") ||
                        extendedABDLItemNames.includes(item?.Asset?.Name)
                    ) &&
                    isRuleActive(Player, RuleId.PREVENT_TAKING_ABDL_ITEMS_OFF)
                ) ||
                (
                    isRuleActive(Player, RuleId.PREVENT_FREEING_SELF) &&
                    item?.Asset?.IsRestraint
                )
            )
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
        console.log(C, clickedItem, isRuleActive(Player, RuleId.PREVENT_USING_BONDAGE_ON_OTHER));

        if (
            C.IsPlayer() &&
            (
                item?.Asset?.Category?.includes("ABDL") ||
                extendedABDLItemNames.includes(item?.Asset?.Name)
            ) &&
            isRuleActive(Player, RuleId.PREVENT_TAKING_ABDL_ITEMS_OFF)
        ) return;

        if (
            !C.IsPlayer() &&
            clickedItem?.Asset?.IsRestraint &&
            isRuleActive(Player, RuleId.PREVENT_USING_BONDAGE_ON_OTHER)
        ) {
            if (
                getRuleParameter(Player, RuleId.PREVENT_USING_BONDAGE_ON_OTHER, "allowAbdlItems") &&
                clickedItem.Asset.Category?.includes("ABDL")
            ) return next(args);
            return;
        }

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

    hookFunction("DrawButton", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        const [Left, Top, Width, Height, Label, Color, Image] = args as [number, number, number, number, string, string, string];
        if (
            isRuleActive(Player, RuleId.PACIFIER_CHECKBOXES) &&
            Width === Height &&
            Width === 64 &&
            Image === "Icons/Checked.png"
        ) args[6] = paciferImage;
        return next(args);
    });

    const observer = new MutationObserver((mutationList, observer) => {
        if (!isRuleActive(Player, RuleId.PACIFIER_CHECKBOXES)) return;
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node: HTMLElement) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "INPUT") {
                        if (node.classList.contains("checkbox")) {
                            node.classList.add("paciCheckbox");
                        }
                    }
                });
            }
        }
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    hookFunction("TimerProcess", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (timerLastRulesCycleCall + 2000 <= CommonTime()) {
            if (
                isRuleActive(Player, RuleId.CONTROL_NICKNAME) &&
                Player.Nickname !== (getRuleParameter(Player, RuleId.CONTROL_NICKNAME, "nickname") ?? "")
            ) {
                const status = CharacterSetNickname(Player, getRuleParameter(Player, RuleId.CONTROL_NICKNAME, "nickname") ?? "");
                if (typeof status === "string") {
                    modStorage.rules.list.find((r) => r.id === RuleId.CONTROL_NICKNAME).data.nickname = CharacterNickname(Player);
                    syncStorage();
                }
            }
            if (
                isRuleActive(Player, RuleId.CONTROL_NICKNAME) &&
                Player.LabelColor !== (getRuleParameter(Player, RuleId.CONTROL_NICKNAME, "color") ?? Player.LabelColor)
            ) {
                Player.LabelColor = getRuleParameter(Player, RuleId.CONTROL_NICKNAME, "color");
                ServerAccountUpdate.QueueData({ LabelColor: getRuleParameter(Player, RuleId.CONTROL_NICKNAME, "color") });
            }
            if (
                isRuleActive(Player, RuleId.WALK_LIKE_BABY) &&
                !DialogIsKneeling(Player) &&
                PoseAvailable(Player, "BodyLower", "Kneel") &&
                !Player.Effect.includes("OnBed")
            ) {
                PoseSetActive(Player, "Kneel", true);
                ChatRoomCharacterUpdate(Player);
            }
            if (
                isRuleActive(Player, RuleId.FORCE_TITLE) &&
                Player.Title !== (getRuleParameter(Player, RuleId.FORCE_TITLE, "title") ?? Player.Title)
            ) {
                TitleSet(getRuleParameter(Player, RuleId.FORCE_TITLE, "title"));
            }
            timerLastRulesCycleCall = CommonTime();
        }
        return next(args);
    });

    hookFunction("ChatSearchJoin", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (
            !isRuleActive(Player, RuleId.PREVENT_jOINING_ABDL_BLOCKED_ROOMS) &&
            !isRuleActive(Player, RuleId.PREVENT_JOINING_CERTAIN_ROOMS)
        ) return next(args);
        CommonGenerateGrid(ChatSearchResult, ChatSearchResultOffset, ChatSearchListParams, (room, x, y, width, height) => {
            if (!MouseIn(x, y, width, height)) return false;
            const canJoinResult = chatRoomSearchCanJoinRoom(room);
            if (!canJoinResult[0]) {
                toastsManager.error({
                    message: canJoinResult[1],
                    duration: 5000
                });
                return false;
            }
            const RoomName = room.Name;
            if (ChatSearchLastQueryJoin != RoomName || (ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1000 < CommonTime())) {
                ChatSearchLastQueryJoinTime = CommonTime();
                ChatSearchLastQueryJoin = RoomName;
                ServerSend("ChatRoomJoin", { Name: RoomName });
            }
            return true;
        });
    });

    hookFunction("ChatSearchNormalDraw", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (
            !isRuleActive(Player, RuleId.PREVENT_jOINING_ABDL_BLOCKED_ROOMS) &&
            !isRuleActive(Player, RuleId.PREVENT_JOINING_CERTAIN_ROOMS)
        ) return next(args);
        next(args);
        CommonGenerateGrid(ChatSearchResult, ChatSearchResultOffset, ChatSearchListParams, (room, x, y, width, height) => {
            if (!chatRoomSearchCanJoinRoom(room)[0]) {
                DrawButton(x, y, width, height, "", "#fa7db1", undefined, "Blocked by Littlish Club", true);
                DrawTextFit((room.Friends != null && room.Friends.length > 0 ? "(" + room.Friends.length + ") " : "") + ChatSearchMuffle(room.Name) + " - " + ChatSearchMuffle(room.Creator) + " " + room.MemberCount + "/" + room.MemberLimit + "", x + 315, y + 25, 620, "black");
                DrawTextFit(ChatSearchMuffle(room.Description), x + 315, y + 62, 620, "black");
            }
            return false;
        });
    });

    hookFunction("TitleIsForced", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!!InformationSheetSelection && isRuleActive(InformationSheetSelection, RuleId.FORCE_TITLE)) return true;
        return next(args);
    });

    hookFunction("CommandExecute", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!isRuleActive(Player, RuleId.PREVENT_USING_CERTAIN_CHAT_COMMANDS)) return next(args);
        let trigger = false;
        (getRuleParameter<string[]>(Player, RuleId.PREVENT_USING_CERTAIN_CHAT_COMMANDS, "commands") ?? []).forEach((c) => {
            if (args[0].startsWith(c)) {
                messagesManager.sendAction(
                    `${getNickname(
                        Player
                    )} tried to use blocked command ${c}`
                );
                trigger = true;
                return;
            }
        });
        if (trigger) return false;
        return next(args);
    });

    hookFunction("CharacterNickname", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!isRuleActive(Player, RuleId.SHOW_CUSTOM_NAMES)) return next(args);
        if (typeof getRuleParameter(Player, RuleId.SHOW_CUSTOM_NAMES, "customNames")?.[args[0].MemberNumber] === "string") {
            return getRuleParameter(Player, RuleId.SHOW_CUSTOM_NAMES, "customNames")?.[args[0].MemberNumber];
        }
        return next(args);
    });
}
