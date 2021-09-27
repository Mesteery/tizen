export {};
declare global {
	type FeedbackType = 'TYPE_SOUND' | 'TYPE_VIBRATION';
	type FeedbackPattern =
		| 'TAP'
		| 'SIP'
		| 'KEY0'
		| 'KEY1'
		| 'KEY2'
		| 'KEY3'
		| 'KEY4'
		| 'KEY5'
		| 'KEY6'
		| 'KEY7'
		| 'KEY8'
		| 'KEY9'
		| 'KEY_STAR'
		| 'KEY_SHARP'
		| 'KEY_BACK'
		| 'HOLD'
		| 'HW_TAP'
		| 'HW_HOLD'
		| 'MESSAGE'
		| 'EMAIL'
		| 'WAKEUP'
		| 'SCHEDULE'
		| 'TIMER'
		| 'GENERAL'
		| 'POWERON'
		| 'POWEROFF'
		| 'CHARGERCONN'
		| 'CHARGING_ERROR'
		| 'FULLCHARGED'
		| 'LOWBATT'
		| 'LOCK'
		| 'UNLOCK'
		| 'VIBRATION_ON'
		| 'SILENT_OFF'
		| 'BT_CONNECTED'
		| 'BT_DISCONNECTED'
		| 'LIST_REORDER'
		| 'LIST_SLIDER'
		| 'VOLUME_KEY';
	interface FeedbackManagerObject {
		feedback: FeedbackManager;
	}
	interface Tizen extends FeedbackManagerObject {}

	interface FeedbackManager {
		play(pattern: FeedbackPattern, type?: FeedbackType | null): void;
		stop(): void;
		isPatternSupported(pattern: FeedbackPattern, type: FeedbackType): boolean;
	}
}
