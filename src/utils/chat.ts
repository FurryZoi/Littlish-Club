import { MOD_NAME, MOD_VERSION } from "@/constants";

export function chatSendLocal(message: string | Node): void {
	if (!ServerPlayerIsInChatRoom()) return;

	const div = document.createElement("div");
	div.setAttribute("class", "ChatMessage ChatMessageLocalMessage");
	div.setAttribute("data-time", ChatRoomCurrentTime());
	div.setAttribute("data-sender", `${Player.MemberNumber}`);
	div.style.background = "#55edc095";
	div.style.margin = "0.15em 0";

	if (typeof message === "string") div.textContent = message;
	else div.appendChild(message);

	document.querySelector("#TextAreaChatLog").appendChild(div);
	ElementScrollToEnd("TextAreaChatLog");
}

export function chatSendChangelog(): void {
	chatSendLocal(`${MOD_NAME} v${MOD_VERSION}\n\nChangelog:\n• Cyber Diaper (BETA)\n • Fixed conflicts with MPA\n • Reset settings button\n • New rule condition\n • "Fall asleep after milk bottle" rule\n • Local notifications\n • Alternative baby speech algorithm\n • Rules strict mode\n • Fixed bugs\n\nThese are the changes in the last 4 days.`);
}

export function chatSendActionMessage(msg: string, target: undefined | number = undefined, dictionary: ChatMessageDictionaryEntry[] = []) {
	if (!msg || !ServerPlayerIsInChatRoom()) return;

	const isFemale = CharacterPronounDescription(Player) === "She/Her";
	const capPossessive = isFemale ? "Her" : "His";
	const capIntensive = isFemale ? "Her" : "Him";
	const capSelfIntensive = isFemale ? "Herself" : "Himself";
	const capPronoun = isFemale ? "She" : "He";

	msg = msg
		.replaceAll("<Possessive>", capPossessive)
		.replaceAll("<possessive>", capPossessive.toLocaleLowerCase())
		.replaceAll("<Intensive>", capIntensive)
		.replaceAll("<intensive>", capIntensive.toLocaleLowerCase())
		.replaceAll("<SelfIntensive>", capSelfIntensive)
		.replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase())
		.replaceAll("<Pronoun>", capPronoun)
		.replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());

	ServerSend('ChatRoomChat', {
	  Content: 'LittlishClub_CUSTOM_ACTION',
	  Type: 'Action',
	  Target: target ?? undefined,
	  Dictionary: [
		{ Tag: 'MISSING TEXT IN "Interface.csv": LittlishClub_CUSTOM_ACTION', Text: msg },
		...dictionary,
	  ],
	});
}

export function chatSendModMessage(msg: string, _data = null, targetNumber = null): void {
	const data: ServerChatRoomMessage = {
		Content: "lcClubMsg",
		Dictionary: {
			// @ts-ignore
			msg
		},
		Type: "Hidden",
	};
	// @ts-ignore
	if (_data) data.Dictionary.data = _data;
	if (targetNumber) data.Target = targetNumber;
	ServerSend("ChatRoomChat", data);
}

export function chatSendBeep(data: any, targetId: number): void {
	const beep = {
		IsSecret: true,
		BeepType: "Leash",
		MemberNumber: targetId,
		Message: JSON.stringify({
			type: "DOGS",
			...data
		})
	};

	ServerSend("AccountBeep", beep);
}
