export {};
declare global {
	type PreferenceValueType = string | number | number | boolean;
	interface PreferenceManagerObject {
		preference: PreferenceManager;
	}
	interface Tizen extends PreferenceManagerObject {}

	interface PreferenceData {
		key: string;
		value: PreferenceValueType;
	}

	interface PreferenceManager {
		getAll(successCallback: PreferenceGetAllCallback, errorCallback?: ErrorCallback | null): void;
		setValue(key: string, value: PreferenceValueType): void;
		getValue(key: string): PreferenceValueType;
		remove(key: string): void;
		removeAll(): void;
		exists(key: string): boolean;
		setChangeListener(key: string, listener: PreferenceChangeCallback): void;
		unsetChangeListener(key: string): void;
	}

	interface PreferenceChangeCallback {
		onsuccess(data: PreferenceData): void;
	}

	interface PreferenceGetAllCallback {
		onsuccess(preferences: Array<PreferenceData>): void;
	}
}
