export {};
declare global {
	type NetworkType = 'CELLULAR' | 'UNKNOWN';
	interface NetworkBearerSelectionObject {
		networkbearerselection: NetworkBearerSelection;
	}

	interface NetworkBearerSelection {
		requestRouteToHost(
			networkType: NetworkType,
			domainName: string,
			successCallback: NetworkSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		releaseRouteToHost(
			networkType: NetworkType,
			domainName: string,
			successCallback: SuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface NetworkSuccessCallback {
		onsuccess(): void;
		ondisconnected(): void;
	}
}
