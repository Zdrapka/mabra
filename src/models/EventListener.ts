import CustomClientEvents from "./CustomClientEvents";

export default interface EventListener<Key extends keyof CustomClientEvents> {
	name: Key;
	once?: boolean;
	callback: (...args: CustomClientEvents[Key]) => Promise<void> | void;
}
