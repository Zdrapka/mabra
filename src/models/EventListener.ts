export default interface EventListener {
	name: string;
	once: boolean;
	callback: (...args: any[]) => void;
}
