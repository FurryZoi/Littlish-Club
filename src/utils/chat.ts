import { MOD_NAME, MOD_VERSION } from "@/constants";
import { modStorage } from "@/modules/storage";
import { getRandomNumber } from "./main";
import { AccessRight, hasAccessRightTo } from "@/modules/access";

const pendingRequests: Map<number, PendingRequest> = new Map();

interface PendingRequest {
	message: string
	data: any
	target: number,
	resolve: (data: any) => any,
	reject: (data: any) => any
}

interface RequestResponse {
	data?: any
	isError: boolean
}

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
	chatSendLocal(`${MOD_NAME} v${MOD_VERSION}\n\nChangelog:\n• Fixed few minor bugs\n• Logs system\n• UI changes\n• A lot of "hidden" technical changes`);
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

export function sendRequest(message: string, data: any, target: number): Promise<RequestResponse> {
	return new Promise((resolve, reject) => {
		const requestId = parseInt(`${Date.now()}${getRandomNumber(1000, 10000)}`);
		pendingRequests.set(requestId, {
			message,
			data,
			target,
			resolve,
			reject
		});
		chatSendModMessage("request", {
			requestId,
			message,
			data
		}, target);
		setTimeout(() => {
			pendingRequests.delete(requestId);
			resolve({
				isError: true
			});
		}, 6000);
	});
}

export function handleRequestResponse(requestId: number, data: any): void {
	const request = pendingRequests.get(requestId);
	if (!request) return;
	request.resolve({
		data
	});
}

export function handleRequest(requestId: number, message: string, data: any, sender: Character): void {
	switch (message) {
		case "getLogs":
			if (!hasAccessRightTo(sender, Player, AccessRight.READ_LOGS)) return;
			chatSendModMessage("requestResponse", {
				requestId,
				message,
				data: modStorage.logs?.list ?? []
			}, sender.MemberNumber);
			return;
	}
}
