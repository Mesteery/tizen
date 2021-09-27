export {};
declare global {
	interface CallHistoryObject {
		callhistory: CallHistory;
	}

	interface RemoteParty {
		remoteParty: string | null;
		personId: PersonId | null;
	}

	interface CallHistoryEntry {
		uid: string;
		type: string;
		features: Array<string> | null;
		remoteParties: Array<RemoteParty>;
		startTime: Date;
		duration: number;
		direction: string;
		callingParty: string | null;
	}

	interface CallHistory {
		find(
			successCallback: CallHistoryEntryArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			filter?: AbstractFilter | null,
			sortMode?: SortMode | null,
			limit?: number | null,
			offset?: number | null,
		): void;
		remove(entry: CallHistoryEntry): void;
		removeBatch(
			entries: Array<CallHistoryEntry>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		removeAll(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		addChangeListener(observer: CallHistoryChangeCallback): number;
		removeChangeListener(handle: number): void;
	}

	interface CallHistoryEntryArraySuccessCallback {
		onsuccess(entries: Array<CallHistoryEntry>): void;
	}

	interface CallHistoryChangeCallback {
		onadded(newItems: Array<CallHistoryEntry>): void;
		onchanged(changedItems: Array<CallHistoryEntry>): void;
		onremoved(removedItems: Array<string>): void;
	}
}
