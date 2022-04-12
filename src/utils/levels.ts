export const calcLevel = (messageCount: number) =>
	Math.floor(Math.cbrt(messageCount));

/** Returns the min amount of messages a user has sent to get their current level */
export const calcMessages = (level: number) => Math.pow(level, 3);

export const calcMessagesToNextLevel = (messageCount: number) => {
	const currentLevel = calcLevel(messageCount);
	const nextLevel = currentLevel + 1;
	const nextLevelMessages = calcMessages(nextLevel);
	const messagesToNextLevel = nextLevelMessages - messageCount;
	return messagesToNextLevel;
};
