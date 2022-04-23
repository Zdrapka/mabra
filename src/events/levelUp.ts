import EventListener from "../models/EventListener";

const levelUp: EventListener<"levelUp"> = {
	name: "levelUp",
	async callback(member, channel, level) {
		await channel.send(`${member} has leveled up to level ${level}!`);
	},
};

export default levelUp;
