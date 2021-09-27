export {};
declare global {
	type SystemSettingType = 'HOME_SCREEN' | 'LOCK_SCREEN' | 'INCOMING_CALL' | 'NOTIFICATION_EMAIL';
	interface SystemSettingObject {
		systemsetting: SystemSettingManager;
	}

	interface SystemSettingManager {
		setProperty(
			type: SystemSettingType,
			value: string,
			successCallback: SuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getProperty(
			type: SystemSettingType,
			successCallback: SystemSettingSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface SystemSettingSuccessCallback {
		onsuccess(value: string): void;
	}
}
