export {};
declare global {
	type SyncProfileId = string;
	type SyncMode = 'MANUAL' | 'PERIODIC' | 'PUSH';
	type SyncType =
		| 'TWO_WAY'
		| 'SLOW'
		| 'ONE_WAY_FROM_CLIENT'
		| 'REFRESH_FROM_CLIENT'
		| 'ONE_WAY_FROM_SERVER'
		| 'REFRESH_FROM_SERVER';
	type SyncInterval = '5_MINUTES' | '15_MINUTES' | '1_HOUR' | '4_HOURS' | '12_HOURS' | '1_DAY' | '1_WEEK' | '1_MONTH';
	type SyncServiceType = 'CONTACT' | 'EVENT';
	type SyncStatus = 'SUCCESS' | 'FAIL' | 'STOP' | 'NONE';
	interface DataSynchronizationManagerObject {
		datasync: DataSynchronizationManager;
	}
	interface Tizen extends DataSynchronizationManagerObject {}

	class SyncInfo {
		constructor();
		url: string;
		id: string;
		password: string;
		mode: SyncMode;
		type: SyncType | null;
		interval: SyncInterval | null;
	}

	class SyncServiceInfo {
		constructor();
		enable: boolean;
		serviceType: SyncServiceType;
		serverDatabaseUri: string;
		id: string | null;
		password: string | null;
	}

	class SyncProfileInfo {
		constructor();
		profileId: SyncProfileId;
		profileName: string;
		syncInfo: SyncInfo;
		serviceInfo: Array<SyncServiceInfo> | null;
	}

	interface SyncStatistics {
		syncStatus: SyncStatus;
		serviceType: SyncServiceType;
		lastSyncTime: Date;
		serverToClientTotal: number;
		serverToClientAdded: number;
		serverToClientUpdated: number;
		serverToClientRemoved: number;
		clientToServerTotal: number;
		clientToServerAdded: number;
		clientToServerUpdated: number;
		clientToServerRemoved: number;
	}

	interface DataSynchronizationManager {
		add(profile: SyncProfileInfo): void;
		update(profile: SyncProfileInfo): void;
		remove(profileId: SyncProfileId): void;
		getMaxProfilesNum(): number;
		getProfilesNum(): number;
		get(profileId: SyncProfileId): SyncProfileInfo;
		getAll(): Array<SyncProfileInfo>;
		startSync(profileId: SyncProfileId, progressCallback?: SyncProgressCallback | null): void;
		stopSync(profileId: SyncProfileId): void;
		getLastSyncStatistics(profileId: SyncProfileId): Array<SyncStatistics>;
	}

	interface SyncProgressCallback {
		onprogress(
			profileId: SyncProfileId,
			serviceType: SyncServiceType,
			isFromServer: boolean,
			totalPerService: number,
			syncedPerService: number,
		): void;
		oncompleted(profileId: SyncProfileId): void;
		onstopped(profileId: SyncProfileId): void;
		onfailed(profileId: SyncProfileId, error: WebAPIError): void;
	}
}
