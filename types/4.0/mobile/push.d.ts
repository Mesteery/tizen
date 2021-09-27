export {};
declare global {
	type PushRegistrationId = string;
	type PushRegistrationState = 'REGISTERED' | 'UNREGISTERED';
	interface PushManagerObject {
		push: PushManager;
	}
	interface Tizen extends PushManagerObject {}

	interface PushManager {
		register(successCallback: PushRegisterSuccessCallback, errorCallback?: ErrorCallback | null): void;
		unregister(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		connect(
			stateChangeCallback: PushRegistrationStateChangeCallback,
			notificationCallback: PushNotificationCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		disconnect(): void;
		getRegistrationId(): PushRegistrationId;
		getUnreadNotifications(): void;
		getPushMessage(): PushMessage | null;
	}

	interface PushMessage {
		appData: string;
		alertMessage: string;
		message: string;
		date: Date;
		sender: string;
		sessionInfo: string;
		requestId: string;
	}

	interface PushRegisterSuccessCallback {
		onsuccess(id: PushRegistrationId): void;
	}

	interface PushRegistrationStateChangeCallback {
		onsuccess(state: PushRegistrationState): void;
	}

	interface PushNotificationCallback {
		onsuccess(message: PushMessage): void;
	}
}
