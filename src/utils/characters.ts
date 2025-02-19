export function getPlayer(value: string | number): Character {
	if (!value) return;
	return ChatRoomCharacter.find((Character) => {
		return (
			Character.MemberNumber == value ||
			Character.Name.toLowerCase() === value ||
			Character.Nickname?.toLowerCase() === value
		);
	});
}

export function getNickname(target: Character): string {
	return CharacterNickname(target);
}