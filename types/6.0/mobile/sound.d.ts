export {};
declare global {
	type SoundType = 'SYSTEM' | 'NOTIFICATION' | 'ALARM' | 'MEDIA' | 'VOICE' | 'RINGTONE';
	type SoundModeType = 'SOUND' | 'VIBRATE' | 'MUTE';
	type SoundDeviceType =
		| 'SPEAKER'
		| 'RECEIVER'
		| 'AUDIO_JACK'
		| 'BLUETOOTH'
		| 'HDMI'
		| 'MIRRORING'
		| 'USB_AUDIO'
		| 'MIC';
	type SoundIOType = 'IN' | 'OUT' | 'BOTH';
	interface SoundManagerObject {
		sound: SoundManager;
	}
	interface Tizen extends SoundManagerObject {}

	interface SoundManager {
		getSoundMode(): SoundModeType;
		setVolume(type: SoundType, volume: number): void;
		getVolume(type: SoundType): number;
		setSoundModeChangeListener(callback: SoundModeChangeCallback): void;
		unsetSoundModeChangeListener(): void;
		setVolumeChangeListener(callback: SoundVolumeChangeCallback): void;
		unsetVolumeChangeListener(): void;
		getConnectedDeviceList(): Array<SoundDeviceInfo>;
		getActivatedDeviceList(): Array<SoundDeviceInfo>;
		addDeviceStateChangeListener(callback: SoundDeviceStateChangeCallback): number;
		removeDeviceStateChangeListener(id: number): void;
	}

	interface SoundDeviceInfo {
		id: number;
		name: string;
		device: SoundDeviceType;
		direction: SoundIOType;
		isConnected: boolean;
		isActivated: boolean;
	}

	interface SoundModeChangeCallback {
		onsuccess(mode: SoundModeType): void;
	}

	interface SoundVolumeChangeCallback {
		onsuccess(type: SoundType, volume: number): void;
	}

	interface SoundDeviceStateChangeCallback {
		onchanged(info: SoundDeviceInfo): void;
	}
}
