export const calcLevel = (messageCount: number) => Math.floor(Math.cbrt(messageCount));

/** Returns the min amount of messages a user has sent to get their current level */
export const calcMessages = (level: number) => level ** 3;

export const calcMessagesToNextLevel = (messageCount: number) => {
	const currentLevel = calcLevel(messageCount);
	const nextLevelMessages = calcMessages(currentLevel + 1);
	return nextLevelMessages - messageCount;
};
