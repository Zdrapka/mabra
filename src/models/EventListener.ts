import CustomClientEvents from "./CustomClientEvents";

export interface EventListener {
	name: keyof CustomClientEvents;
	once: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	callback: (...args: any) => Promise<void> | void;
}
