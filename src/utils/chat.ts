import { MOD_MESSAGE_KEY, MOD_NAME, MOD_VERSION } from "@/constants";
import { modStorage } from "@/modules/storage";
import { getRandomNumber } from "./main";
import { AccessRight, hasAccessRightTo } from "@/modules/access";
import { RequestMessageData, RequestResponseMessageData } from "@/modules/messaging";

const pendingRequests: Map<number, PendingRequest<any>> = new Map();

interface PendingRequest<T> {
	message: string
	data: T
	target: number,
	resolve: (data: T) => any,
	reject: (data: T) => any
}

interface RequestResponse<T> {
	data?: T
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
	chatSendLocal(`${MOD_NAME} v${MOD_VERSION}\n\nChangelog:\n• Fixed bug with "in room/not in room with role caregiver and higher" condition where mommy's presence in the room did not make the condition active\n• Added access validation in Littlish Wardrobe\n• Added extended list of ABDL items to make certain rules work better\n• Other fixes`);
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

export function chatSendModMessage<T>(msg: string, _data: T = null, targetNumber = null): void {
	const data: ServerChatRoomMessage = {
		Content: MOD_MESSAGE_KEY,
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
			type: MOD_MESSAGE_KEY,
			...data
		})
	};

	ServerSend("AccountBeep", beep);
}

export function sendRequest<T>(message: string, data: any, target: number): Promise<RequestResponse<T>> {
	return new Promise((resolve, reject) => {
		const requestId = parseInt(`${Date.now()}${getRandomNumber(1000, 10000)}`);
		pendingRequests.set(requestId, {
			message,
			data,
			target,
			resolve,
			reject
		});
		chatSendModMessage<RequestMessageData>("request", {
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
			chatSendModMessage<RequestResponseMessageData>("requestResponse", {
				requestId,
				message,
				data: modStorage.logs?.list ?? []
			}, sender.MemberNumber);
			return;
	}
}
