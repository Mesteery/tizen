export {};
declare global {
	type SystemInfoPropertyId =
		| 'BATTERY'
		| 'CPU'
		| 'STORAGE'
		| 'DISPLAY'
		| 'DEVICE_ORIENTATION'
		| 'BUILD'
		| 'LOCALE'
		| 'NETWORK'
		| 'WIFI_NETWORK'
		| 'ETHERNET_NETWORK'
		| 'CELLULAR_NETWORK'
		| 'NET_PROXY_NETWORK'
		| 'SIM'
		| 'PERIPHERAL'
		| 'MEMORY'
		| 'CAMERA_FLASH'
		| 'ADS';
	type SystemInfoNetworkType = 'NONE' | '2G' | '2.5G' | '3G' | '4G' | 'WIFI' | 'ETHERNET' | 'NET_PROXY' | 'UNKNOWN';
	type SystemInfoDeviceOrientationStatus =
		| 'PORTRAIT_PRIMARY'
		| 'PORTRAIT_SECONDARY'
		| 'LANDSCAPE_PRIMARY'
		| 'LANDSCAPE_SECONDARY';
	type SystemInfoSimState =
		| 'ABSENT'
		| 'INITIALIZING'
		| 'READY'
		| 'PIN_REQUIRED'
		| 'PUK_REQUIRED'
		| 'NETWORK_LOCKED'
		| 'SIM_LOCKED'
		| 'UNKNOWN';
	type SystemInfoProfile = 'MOBILE' | 'WEARABLE' | 'TV';
	type SystemInfoLowMemoryStatus = 'NORMAL' | 'WARNING';
	interface SystemInfoOptions {
		timeout?: number;
		highThreshold?: number;
		lowThreshold?: number;
	}

	interface SystemInfoObject {
		systeminfo: SystemInfo;
	}

	interface SystemInfo {
		getTotalMemory(): number;
		getAvailableMemory(): number;
		getCapability(key: string): any;
		getCount(property: SystemInfoPropertyId): number;
		getPropertyValue(
			property: SystemInfoPropertyId,
			successCallback: SystemInfoPropertySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getPropertyValueArray(
			property: SystemInfoPropertyId,
			successCallback: SystemInfoPropertyArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		addPropertyValueChangeListener(
			property: SystemInfoPropertyId,
			successCallback: SystemInfoPropertySuccessCallback,
			options?: SystemInfoOptions | null,
			errorCallback?: ErrorCallback | null,
		): number;
		addPropertyValueArrayChangeListener(
			property: SystemInfoPropertyId,
			successCallback: SystemInfoPropertyArraySuccessCallback,
			options?: SystemInfoOptions | null,
			errorCallback?: ErrorCallback | null,
		): number;
		removePropertyValueChangeListener(listenerId: number): void;
	}

	interface SystemInfoPropertySuccessCallback {
		onsuccess(property: SystemInfoProperty): void;
	}

	interface SystemInfoPropertyArraySuccessCallback {
		onsuccess(properties: Array<SystemInfoProperty>): void;
	}

	interface SystemInfoProperty {}

	interface SystemInfoBattery {
		level: number;
		isCharging: boolean;
		timeToDischarge: number | null;
		timeToFullCharge: number | null;
	}

	interface SystemInfoCpu {
		load: number;
	}

	interface SystemInfoStorage {
		units: Array<SystemInfoStorageUnit>;
	}

	interface SystemInfoStorageUnit {
		type: string;
		capacity: number;
		availableCapacity: number;
		isRemovable: boolean;
	}

	interface SystemInfoDisplay {
		resolutionWidth: number;
		resolutionHeight: number;
		dotsPerInchWidth: number;
		dotsPerInchHeight: number;
		physicalWidth: number;
		physicalHeight: number;
		brightness: number;
	}

	interface SystemInfoDeviceOrientation {
		status: SystemInfoDeviceOrientationStatus;
		isAutoRotation: boolean;
	}

	interface SystemInfoBuild {
		model: string;
		manufacturer: string;
		buildVersion: string;
	}

	interface SystemInfoLocale {
		language: string;
		country: string;
	}

	interface SystemInfoNetwork {
		networkType: SystemInfoNetworkType;
	}

	interface SystemInfoWifiNetwork {
		status: string;
		ssid: string;
		ipAddress: string;
		ipv6Address: string;
		macAddress: string;
		signalStrength: number;
	}

	interface SystemInfoEthernetNetwork {
		cable: string;
		status: string;
		ipAddress: string;
		ipv6Address: string;
		macAddress: string;
	}

	interface SystemInfoCellularNetwork {
		status: string;
		apn: string;
		ipAddress: string;
		ipv6Address: string;
		mcc: number;
		mnc: number;
		cellId: number;
		lac: number;
		isRoaming: boolean;
		isFlightMode: boolean;
		imei: string;
	}

	interface SystemInfoNetProxyNetwork {
		status: string;
	}

	interface SystemInfoSIM {
		state: SystemInfoSimState;
		operatorName: string;
		msisdn: string;
		iccid: string;
		mcc: number;
		mnc: number;
		msin: string;
		spn: string;
	}

	interface SystemInfoPeripheral {
		isVideoOutputOn: boolean;
	}

	interface SystemInfoMemory {
		status: SystemInfoLowMemoryStatus;
	}

	interface SystemInfoCameraFlash {
		brightness: number;
		camera: string;
		levels: number;
		setBrightness(brightness: number): void;
	}

	interface SystemInfoADS {
		id: string;
	}
}
