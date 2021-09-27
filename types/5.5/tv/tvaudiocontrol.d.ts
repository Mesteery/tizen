export {};
declare global {
	type AudioOutputMode = 'PCM' | 'DOLBY' | 'DTS' | 'AAC' | 'DOLBY_DIGITAL_PLUS';
	type AudioBeepType =
		| 'UP'
		| 'DOWN'
		| 'LEFT'
		| 'RIGHT'
		| 'PAGE_LEFT'
		| 'PAGE_RIGHT'
		| 'BACK'
		| 'SELECT'
		| 'CANCEL'
		| 'WARNING'
		| 'KEYPAD'
		| 'KEYPAD_ENTER'
		| 'KEYPAD_DEL'
		| 'MOVE'
		| 'PREPARING';
	interface AudioControlManagerObject {
		tvaudiocontrol: AudioControlManager;
	}
	interface Tizen extends AudioControlManagerObject {}

	interface AudioControlManager {
		setMute(mute: boolean): void;
		isMute(): boolean;
		setVolume(volume: number): void;
		setVolumeUp(): void;
		setVolumeDown(): void;
		getVolume(): number;
		setVolumeChangeListener(callback: VolumeChangeCallback): void;
		unsetVolumeChangeListener(): void;
		getOutputMode(): AudioOutputMode;
		playSound(type: AudioBeepType): void;
	}

	interface VolumeChangeCallback {
		onchanged(volume: number): void;
	}
}
