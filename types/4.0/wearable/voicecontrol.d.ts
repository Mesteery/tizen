export {};
declare global {
	type VoiceControlResultEvent = 'SUCCESS' | 'FAILURE';
	type VoiceControlCommandType = 'FOREGROUND';
	interface VoiceControlClientManagerObject {
		voicecontrol: VoiceControlClientManager;
	}
	interface Tizen extends VoiceControlClientManagerObject {}

	interface VoiceControlClientManager {
		getVoiceControlClient(): VoiceControlClient;
	}

	interface VoiceControlClient {
		getCurrentLanguage(): string;
		setCommandList(list: Array<VoiceControlCommand>, type?: VoiceControlCommandType | null): void;
		unsetCommandList(type?: VoiceControlCommandType | null): void;
		addResultListener(listener: VoiceControlResultCallback): number;
		removeResultListener(id: number): void;
		addLanguageChangeListener(listener: VoiceControlLanguageChangeCallback): number;
		removeLanguageChangeListener(id: number): void;
		release(): void;
	}

	class VoiceControlCommand {
		constructor();
		command: string;
		type: VoiceControlCommandType;
	}

	interface VoiceControlLanguageChangeCallback {
		onlanguagechanged(previous: string, current: string): void;
	}

	interface VoiceControlResultCallback {
		onresult(event: VoiceControlResultEvent, list: Array<VoiceControlCommand>, results: string): void;
	}
}
