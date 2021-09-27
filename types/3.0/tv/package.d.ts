export {};
declare global {
	type PackageId = string;
	interface PackageManagerObject {
		package: PackageManager;
	}
	interface Tizen extends PackageManagerObject {}

	interface PackageManager {
		install(
			packageFileURI: string,
			progressCallback: PackageProgressCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		uninstall(id: PackageId, progressCallback: PackageProgressCallback, errorCallback?: ErrorCallback | null): void;
		getPackagesInfo(
			successCallback: PackageInformationArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getPackageInfo(id?: PackageId | null): PackageInformation;
		setPackageInfoEventListener(eventCallback: PackageInformationEventCallback): void;
		unsetPackageInfoEventListener(): void;
	}

	interface PackageInformation {
		id: PackageId;
		name: string;
		iconPath: string;
		version: string;
		totalSize: number;
		dataSize: number;
		lastModified: Date;
		author: string;
		description: string;
		appIds: Array<ApplicationId>;
	}

	interface PackageInformationArraySuccessCallback {
		onsuccess(informationArray: Array<PackageInformation>): void;
	}

	interface PackageProgressCallback {
		onprogress(id: PackageId, progress: number): void;
		oncomplete(id: PackageId): void;
	}

	interface PackageInformationEventCallback {
		oninstalled(info: PackageInformation): void;
		onupdated(info: PackageInformation): void;
		onuninstalled(id: PackageId): void;
	}
}
