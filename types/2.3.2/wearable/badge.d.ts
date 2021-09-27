export {};
declare global {
	interface BadgeManagerObject {
		badge: BadgeManager;
	}
	interface Tizen extends BadgeManagerObject {}

	interface BadgeManager {
		maxBadgeCount: number;
		setBadgeCount(appId: ApplicationId, count: number): void;
		getBadgeCount(appId: ApplicationId): number;
		addChangeListener(appIdList: Array<ApplicationId>, successCallback: BadgeChangeCallback): void;
		removeChangeListener(appIdList: Array<ApplicationId>): void;
	}

	interface BadgeChangeCallback {
		onsuccess(appId: ApplicationId, count: number): void;
	}
}
