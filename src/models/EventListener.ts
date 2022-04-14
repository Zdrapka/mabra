import CustomClientEvents from "./CustomClientEvents";

export interface EventListener {
	name: keyof CustomClientEvents;
	once: boolean;
	callback: (...args: any[]) => void;
}
