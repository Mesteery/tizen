export {};
declare global {
	interface WebSettingObject {
		websetting: WebSettingManager;
	}

	interface WebSettingManager {
		setUserAgentString(
			userAgent: string,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		removeAllCookies(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
	}
}
