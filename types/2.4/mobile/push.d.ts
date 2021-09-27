export {};
declare global {
	type PushRegistrationId = string;
	interface PushManagerObject {
		push: PushManager;
	}
	interface Tizen extends PushManagerObject {}

	interface PushManager {
		registerService(
			appControl: ApplicationControl,
			successCallback: PushRegisterSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		unregisterService(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		connectService(notificationCallback: PushNotificationCallback): void;
		disconnectService(): void;
		getRegistrationId(): PushRegistrationId;
		getUnreadNotifications(): void;
	}

	interface PushMessage {
		appData: string;
		alertMessage: string;
		date: Date;
	}

	interface PushRegisterSuccessCallback {
		onsuccess(id: PushRegistrationId): void;
	}

	interface PushNotificationCallback {
		onsuccess(message: PushMessage): void;
	}
}
