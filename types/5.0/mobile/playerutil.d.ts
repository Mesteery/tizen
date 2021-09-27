export {};
declare global {
	type LatencyMode = 'LOW' | 'MID' | 'HIGH';
	interface PlayerUtilManagerObject {
		playerutil: PlayerUtilManager;
	}
	interface Tizen extends PlayerUtilManagerObject {}

	interface PlayerUtilManager {
		getLatencyMode(): LatencyMode;
		setLatencyMode(mode: LatencyMode): void;
	}
}
