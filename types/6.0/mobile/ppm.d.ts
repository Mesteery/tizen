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
		checkPermissions(privileges: Array<string>): Array<PrivilegeStatus>;
		requestPermission(
			privilege: string,
			successCallback: PermissionSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		requestPermissions(
			privileges: Array<string>,
			successCallback: PermissionRequestSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface PrivilegeStatus {
		privilege: string;
		type: PermissionType;
	}

	interface RequestStatus {
		privilege: string;
		result: PermissionRequestResult;
	}

	interface PermissionSuccessCallback {
		onsuccess(result: PermissionRequestResult, privilege: string): void;
	}

	interface PermissionRequestSuccessCallback {
		onsuccess(result: Array<RequestStatus>): void;
	}
}
