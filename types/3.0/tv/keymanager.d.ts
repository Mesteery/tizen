export {};
declare global {
	type RawData = string;
	type PermissionType = 'NONE' | 'READ' | 'REMOVE' | 'READ_REMOVE';
	interface KeyManagerAlias {
		packageId?: PackageId;
		name?: string;
	}

	interface KeyManagerObject {
		keymanager: KeyManager;
	}
	interface Tizen extends KeyManagerObject {}

	interface KeyManager {
		saveData(
			name: string,
			rawData: RawData,
			password?: string | null,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		removeData(dataAlias: KeyManagerAlias): void;
		getData(dataAlias: KeyManagerAlias, password?: string | null): RawData;
		getDataAliasList(): Array<KeyManagerAlias>;
		setPermission(
			dataAlias: KeyManagerAlias,
			packageId: PackageId,
			permissionType: PermissionType,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
	}
}
