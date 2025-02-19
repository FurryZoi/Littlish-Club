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
	chatSendLocal("Changelog");
}

export function chatSendCustomAction(message: string): void {
	if (!ServerPlayerIsInChatRoom()) return;

	const isFemale = CharacterPronounDescription(Player) === "She/Her";
	const capPossessive = isFemale ? "Her" : "His";
	const capIntensive = isFemale ? "Her" : "Him";
	const capSelfIntensive = isFemale ? "Herself" : "Himself";
	const capPronoun = isFemale ? "She" : "He";

	message = message
		.replaceAll("<Possessive>", capPossessive)
		.replaceAll("<possessive>", capPossessive.toLocaleLowerCase())
		.replaceAll("<Intensive>", capIntensive)
		.replaceAll("<intensive>", capIntensive.toLocaleLowerCase())
		.replaceAll("<SelfIntensive>", capSelfIntensive)
		.replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase())
		.replaceAll("<Pronoun>", capPronoun)
		.replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());
        
	ServerSend("ChatRoomChat", {
		Content: "Beep", 
		Type: "Action",
		Dictionary: [
			// EN
			{ Tag: "Beep", Text: "msg" },
			// CN
			{ Tag: "发送私聊", Text: "msg" },
			// DE
			{ Tag: "Biep", Text: "msg" },
			// FR
			{ Tag: "Sonner", Text: "msg" },
			// Message itself
			{ Tag: "msg", Text: message }
		]
	});
}

export function chatSendModMessage(msg: string, _data = null, targetNumber = null): void {
	const data: ServerChatRoomMessage = {
		Content: "litlishClubMsg",
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
