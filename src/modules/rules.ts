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

export interface Rule {
    id: number
    name: string
    description: string
}

export function isRuleActive(ruleId: number): boolean {
    // For testing
    return [1002, 1004, 1005].includes(ruleId);
}