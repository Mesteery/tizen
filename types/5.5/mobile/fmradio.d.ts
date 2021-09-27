export {};
declare global {
	type RadioState = 'PLAYING' | 'SCANNING' | 'READY';
	type RadioInterruptReason =
		| 'RADIO_INTERRUPTED_BY_MEDIA'
		| 'RADIO_INTERRUPTED_BY_SYSTEM'
		| 'RADIO_INTERRUPTED_BY_ALARM'
		| 'RADIO_INTERRUPTED_BY_NOTIFICATION'
		| 'RADIO_INTERRUPTED_BY_EMERGENCY'
		| 'RADIO_INTERRUPTED_BY_VOICE_INFORMATION'
		| 'RADIO_INTERRUPTED_BY_VOICE_RECOGNITION'
		| 'RADIO_INTERRUPTED_BY_RINGTONE'
		| 'RADIO_INTERRUPTED_BY_VOIP'
		| 'RADIO_INTERRUPTED_BY_CALL'
		| 'RADIO_INTERRUPTED_BY_MEDIA_EXTERNAL_ONLY';
	interface FMRadioObject {
		fmradio: FMRadioManager;
	}

	interface FMRadioManager {
		frequency: number;
		frequencyUpperBound: number;
		frequencyLowerBound: number;
		signalStrength: number;
		state: RadioState;
		isAntennaConnected: boolean;
		mute: boolean;
		start(frequency?: number | null): void;
		stop(): void;
		seekUp(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		seekDown(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		scanStart(radioScanCallback: FMRadioScanCallback, errorCallback?: ErrorCallback | null): void;
		scanStop(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		setFMRadioInterruptedListener(interruptCallback: FMRadioInterruptCallback): void;
		unsetFMRadioInterruptedListener(): void;
		setAntennaChangeListener(changeCallback: AntennaChangeCallback): void;
		unsetAntennaChangeListener(): void;
	}

	interface FMRadioScanCallback {
		onfrequencyfound(frequency: number): void;
		onfinished(frequencies: Array<number>): void;
	}

	interface FMRadioInterruptCallback {
		oninterrupted(reason: RadioInterruptReason): void;
		oninterruptfinished(): void;
	}

	interface AntennaChangeCallback {
		onchanged(isAntennaConnected: boolean): void;
	}
}
