export {};
declare global {
	type PowerState = PowerScreenState | PowerCpuState;
	type PowerResource = 'SCREEN' | 'CPU';
	type PowerScreenState = 'SCREEN_OFF' | 'SCREEN_DIM' | 'SCREEN_NORMAL';
	type PowerCpuState = 'CPU_AWAKE';
	interface PowerManagerObject {
		power: PowerManager;
	}
	interface Tizen extends PowerManagerObject {}

	interface PowerManager {
		request(resource: PowerResource, state: PowerState): void;
		release(resource: PowerResource): void;
		setScreenStateChangeListener(listener: ScreenStateChangeCallback): void;
		unsetScreenStateChangeListener(): void;
		getScreenBrightness(): number;
		setScreenBrightness(brightness: number): void;
		isScreenOn(): boolean;
		restoreScreenBrightness(): void;
		turnScreenOn(): void;
		turnScreenOff(): void;
	}

	interface ScreenStateChangeCallback {
		onchanged(previousState: PowerScreenState, changedState: PowerScreenState): void;
	}
}
