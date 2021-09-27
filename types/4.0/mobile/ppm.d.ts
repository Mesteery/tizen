export {};
declare global {
	type PermissionType = 'PPM_ALLOW' | 'PPM_DENY' | 'PPM_ASK';
	type PermissionRequestResult = 'PPM_ALLOW_FOREVER' | 'PPM_DENY_FOREVER' | 'PPM_DENY_ONCE';
	interface PrivacyPrivilegeManagerObject {
		ppm: PrivacyPrivilegeManager;
	}
	interface Tizen extends PrivacyPrivilegeManagerObject {}

	interface PrivacyPrivilegeManager {
		checkPermission(privilege: string): PermissionType;
		requestPermission(
			privilege: string,
			successCallback: PermissionSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface PermissionSuccessCallback {
		onsuccess(result: PermissionRequestResult, privilege: string): void;
	}
}
