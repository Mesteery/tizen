export {};
declare global {
	type BluetoothAddress = string;
	type BluetoothUUID = string;
	type BluetoothLESolicitationUUID = string;
	type Bytes = Array<number> | string | Uint8Array;
	type BluetoothGATTServiceVariant = BluetoothGATTService | BluetoothGATTServerService;
	type BluetoothGATTCharacteristicVariant = BluetoothGATTCharacteristic | BluetoothGATTServerCharacteristic;
	type BluetoothGATTDescriptorVariant = BluetoothGATTDescriptor | BluetoothGATTServerDescriptor;
	type BluetoothSocketState = 'CLOSED' | 'OPEN';
	type BluetoothAdvertisePacketType = 'ADVERTISE' | 'SCAN_RESPONSE';
	type BluetoothAdvertisingState = 'STARTED' | 'STOPPED';
	type BluetoothAdvertisingMode = 'BALANCED' | 'LOW_LATENCY' | 'LOW_ENERGY';
	interface BluetoothLEAdvertiseDataInit {
		includeName?: boolean | null;
		uuids?: Array<BluetoothUUID> | null;
		solicitationuuids?: Array<BluetoothLESolicitationUUID> | null;
		appearance?: number | null;
		includeTxPowerLevel?: boolean | null;
		servicesData?: Array<BluetoothLEServiceData> | null;
		manufacturerData?: BluetoothLEManufacturerData | null;
	}

	interface BluetoothGATTServerServiceInit {
		serviceUuid?: BluetoothUUID;
		isPrimary?: boolean;
		includedServices?: Array<BluetoothGATTServerServiceInit> | null;
		characteristics?: Array<BluetoothGATTServerCharacteristicInit> | null;
	}

	interface BluetoothGATTServerCharacteristicInit {
		uuid?: BluetoothUUID;
		descriptors?: Array<BluetoothGATTServerDescriptorInit> | null;
		isBroadcast?: boolean;
		hasExtendedProperties?: boolean;
		isNotify?: boolean;
		isIndication?: boolean;
		isReadable?: boolean;
		isSignedWrite?: boolean;
		isWritable?: boolean;
		isWriteNoResponse?: boolean;
		readPermission?: boolean;
		writePermission?: boolean;
		encryptedReadPermission?: boolean;
		encryptedWritePermission?: boolean;
		encryptedSignedReadPermission?: boolean;
		encryptedSignedWritePermission?: boolean;
		readValueRequestCallback?: ReadValueRequestCallback | null;
		readValueSendResponseSuccessCallback?: SuccessCallback | null;
		readValueSendResponseErrorCallback?: ErrorCallback | null;
		writeValueRequestCallback?: WriteValueRequestCallback | null;
		writeValueSendResponseSuccessCallback?: SuccessCallback | null;
		writeValueSendResponseErrorCallback?: ErrorCallback | null;
	}

	interface BluetoothGATTServerDescriptorInit {
		uuid?: BluetoothUUID;
		readPermission?: boolean;
		writePermission?: boolean;
		encryptedReadPermission?: boolean;
		encryptedWritePermission?: boolean;
		encryptedSignedReadPermission?: boolean;
		encryptedSignedWritePermission?: boolean;
		readValueRequestCallback?: ReadValueRequestCallback | null;
		readValueSendResponseSuccessCallback?: SuccessCallback | null;
		readValueSendResponseErrorCallback?: ErrorCallback | null;
		writeValueRequestCallback?: WriteValueRequestCallback | null;
		writeValueSendResponseSuccessCallback?: SuccessCallback | null;
		writeValueSendResponseErrorCallback?: ErrorCallback | null;
	}

	interface BluetoothManagerObject {
		bluetooth: BluetoothManager;
	}
	interface Tizen extends BluetoothManagerObject {}

	class BluetoothLEServiceData {
		constructor();
		uuid: BluetoothUUID;
		data: string;
	}

	class BluetoothLEManufacturerData {
		constructor();
		id: string;
		data: string;
	}

	class BluetoothLEAdvertiseData {
		constructor();
		includeName: boolean | null;
		uuids: Array<BluetoothUUID> | null;
		solicitationuuids: Array<BluetoothLESolicitationUUID> | null;
		appearance: number | null;
		includeTxPowerLevel: boolean | null;
		servicesData: Array<BluetoothLEServiceData> | null;
		manufacturerData: BluetoothLEManufacturerData | null;
	}

	interface BluetoothManager {
		BASE_UUID: BluetoothUUID;
		deviceMajor: BluetoothClassDeviceMajor;
		deviceMinor: BluetoothClassDeviceMinor;
		deviceService: BluetoothClassDeviceService;
		getDefaultAdapter(): BluetoothAdapter;
		getLEAdapter(): BluetoothLEAdapter;
		getGATTServer(): BluetoothGATTServer;
		toByteArray(data: Bytes): Array<number>;
		toDOMString(data: Bytes): string;
		toUint8Array(data: Bytes): Uint8Array;
		uuidTo128bit(uuid: BluetoothUUID): BluetoothUUID;
		uuidToShortestPossible(uuid: BluetoothUUID): BluetoothUUID;
		uuidsEqual(uuid1: BluetoothUUID, uuid2: BluetoothUUID): boolean;
	}

	interface BluetoothAdapter {
		name: string;
		address: BluetoothAddress;
		powered: boolean;
		visible: boolean;
		setName(name: string, successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		setChangeListener(listener: BluetoothAdapterChangeCallback): void;
		unsetChangeListener(): void;
		discoverDevices(
			successCallback: BluetoothDiscoverDevicesSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		stopDiscovery(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		getKnownDevices(successCallback: BluetoothDeviceArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
		getDevice(
			address: BluetoothAddress,
			successCallback: BluetoothDeviceSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		createBonding(
			address: BluetoothAddress,
			successCallback: BluetoothDeviceSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		destroyBonding(
			address: BluetoothAddress,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		registerRFCOMMServiceByUUID(
			uuid: BluetoothUUID,
			name: string,
			successCallback: BluetoothServiceSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface BluetoothLEAdapter {
		startScan(successCallback: BluetoothLEScanCallback, errorCallback?: ErrorCallback | null): void;
		stopScan(): void;
		isScanning(): boolean;
		startAdvertise(
			advertiseData: BluetoothLEAdvertiseData,
			packetType: BluetoothAdvertisePacketType,
			successCallback: BluetoothLEAdvertiseCallback,
			errorCallback?: ErrorCallback | null,
			mode?: BluetoothAdvertisingMode | null,
			connectable?: boolean | null,
		): void;
		stopAdvertise(): void;
		addConnectStateChangeListener(listener: BluetoothLEConnectChangeCallback): number;
		removeConnectStateChangeListener(watchID: number): void;
	}

	interface BluetoothGATTService {
		serviceUuid: BluetoothUUID | null;
		services: Array<BluetoothGATTServiceVariant>;
		characteristics: Array<BluetoothGATTCharacteristicVariant>;
	}

	interface BluetoothGATTServerService {
		isPrimary: boolean;
		unregister(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
	}

	interface BluetoothGATTCharacteristic {
		descriptors: Array<BluetoothGATTDescriptorVariant>;
		isBroadcast: boolean;
		hasExtendedProperties: boolean;
		isNotify: boolean;
		isIndication: boolean;
		isReadable: boolean;
		isSignedWrite: boolean;
		isWritable: boolean;
		isWriteNoResponse: boolean;
		uuid: BluetoothUUID | null;
		readValue(successCallback: ReadValueSuccessCallback, errorCallback?: ErrorCallback | null): void;
		writeValue(value: Bytes, successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		addValueChangeListener(callback: ReadValueSuccessCallback): number;
		removeValueChangeListener(watchID: number): void;
	}

	interface BluetoothGATTServerCharacteristic {
		readPermission: boolean;
		writePermission: boolean;
		encryptedReadPermission: boolean;
		encryptedWritePermission: boolean;
		encryptedSignedReadPermission: boolean;
		encryptedSignedWritePermission: boolean;
		notifyAboutValueChange(
			value: Bytes,
			clientAddress: BluetoothAddress | null,
			notificationCallback?: NotificationCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		setReadValueRequestCallback(
			readValueRequestCallback: ReadValueRequestCallback,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			sendResponseSuccessCallback?: SuccessCallback | null,
			sendResponseErrorCallback?: ErrorCallback | null,
		): void;
		setWriteValueRequestCallback(
			writeValueRequestCallback: WriteValueRequestCallback,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			sendResponseSuccessCallback?: SuccessCallback | null,
			sendResponseErrorCallback?: ErrorCallback | null,
		): void;
	}

	interface BluetoothGATTDescriptor {
		uuid: BluetoothUUID | null;
		readValue(successCallback: ReadValueSuccessCallback, errorCallback?: ErrorCallback | null): void;
		writeValue(value: Bytes, successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
	}

	interface BluetoothGATTServerDescriptor {
		readPermission: boolean;
		writePermission: boolean;
		encryptedReadPermission: boolean;
		encryptedWritePermission: boolean;
		encryptedSignedReadPermission: boolean;
		encryptedSignedWritePermission: boolean;
		setReadValueRequestCallback(
			readValueRequestCallback: ReadValueRequestCallback,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			sendResponseSuccessCallback?: SuccessCallback | null,
			sendResponseErrorCallback?: ErrorCallback | null,
		): void;
		setWriteValueRequestCallback(
			writeValueRequestCallback: WriteValueRequestCallback,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			sendResponseSuccessCallback?: SuccessCallback | null,
			sendResponseErrorCallback?: ErrorCallback | null,
		): void;
	}

	interface BluetoothGATTServer {
		isRunning: boolean;
		services: Array<BluetoothGATTServerService>;
		start(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		stop(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		registerService(
			service: BluetoothGATTServerServiceInit,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		unregisterAllServices(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		getConnectionMtu(
			clientAddress: BluetoothAddress,
			callback: ConnectionMtuCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface BluetoothLEScanCallback {
		onsuccess(device: BluetoothLEDevice): void;
	}

	interface BluetoothLEAdvertiseCallback {
		onstate(state: BluetoothAdvertisingState): void;
	}

	interface BluetoothLEConnectChangeCallback {
		onconnected(device: BluetoothLEDevice): void;
		ondisconnected(device: BluetoothLEDevice): void;
	}

	interface ReadValueSuccessCallback {
		onread(value: Array<number>): void;
	}

	class GATTRequestReply {
		constructor();
		statusCode: number;
		data: Bytes | null;
	}

	interface ReadValueRequestCallback {
		onreadrequest(clientAddress: BluetoothAddress, offset: number): GATTRequestReply | null;
	}

	interface WriteValueRequestCallback {
		onwriterequest(
			clientAddress: BluetoothAddress,
			value: Array<number>,
			offset: number,
			replyRequired: boolean,
		): GATTRequestReply | null;
	}

	interface NotificationCallback {
		onnotificationsuccess(clientAddress: BluetoothAddress): void;
		onnotificationfail(clientAddress: BluetoothAddress, error: WebAPIException): void;
		onnotificationfinish(clientAddress: BluetoothAddress): void;
	}

	interface ConnectionMtuCallback {
		onsuccess(mtu: number): void;
	}

	interface BluetoothDevice {
		name: string;
		address: BluetoothAddress;
		deviceClass: BluetoothClass;
		isBonded: boolean;
		isTrusted: boolean;
		isConnected: boolean;
		uuids: Array<BluetoothUUID>;
		connectToServiceByUUID(
			uuid: BluetoothUUID,
			successCallback: BluetoothSocketSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface BluetoothLEDevice {
		address: BluetoothAddress;
		name: string | null;
		txpowerlevel: number | null;
		appearance: number | null;
		uuids: Array<BluetoothUUID> | null;
		solicitationuuids: Array<BluetoothLESolicitationUUID> | null;
		serviceData: Array<BluetoothLEServiceData> | null;
		manufacturerData: BluetoothLEManufacturerData | null;
		rssi: number | null;
		connect(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		disconnect(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		isConnected(): boolean;
		getService(uuid: BluetoothUUID): BluetoothGATTService;
		getServiceAllUuids(): Array<BluetoothUUID>;
		addConnectStateChangeListener(listener: BluetoothLEConnectChangeCallback): number;
		removeConnectStateChangeListener(watchID: number): void;
		getAttMtu(): number;
		requestAttMtuChange(newAttMtu: number): void;
		addAttMtuChangeListener(callback: ConnectionMtuCallback): number;
		removeAttMtuChangeListener(watchId: number): void;
	}

	interface BluetoothSocket {
		uuid: BluetoothUUID;
		state: BluetoothSocketState;
		peer: BluetoothDevice;
		onmessage: SuccessCallback | null;
		onclose: SuccessCallback | null;
		writeData(data: Bytes): number;
		readData(): Array<number>;
		close(): void;
	}

	interface BluetoothClass {
		major: number;
		minor: number;
		services: Array<number>;
		hasService(service: number): boolean;
	}

	class BluetoothClassDeviceMajor {
		static readonly MISC: 0x00;
		static readonly COMPUTER: 0x01;
		static readonly PHONE: 0x02;
		static readonly NETWORK: 0x03;
		static readonly AUDIO_VIDEO: 0x04;
		static readonly PERIPHERAL: 0x05;
		static readonly IMAGING: 0x06;
		static readonly WEARABLE: 0x07;
		static readonly TOY: 0x08;
		static readonly HEALTH: 0x09;
		static readonly UNCATEGORIZED: 0x1f;
	}

	class BluetoothClassDeviceMinor {
		static readonly COMPUTER_UNCATEGORIZED: 0x00;
		static readonly COMPUTER_DESKTOP: 0x01;
		static readonly COMPUTER_SERVER: 0x02;
		static readonly COMPUTER_LAPTOP: 0x03;
		static readonly COMPUTER_HANDHELD_PC_OR_PDA: 0x04;
		static readonly COMPUTER_PALM_PC_OR_PDA: 0x05;
		static readonly COMPUTER_WEARABLE: 0x06;
		static readonly PHONE_UNCATEGORIZED: 0x00;
		static readonly PHONE_CELLULAR: 0x01;
		static readonly PHONE_CORDLESS: 0x02;
		static readonly PHONE_SMARTPHONE: 0x03;
		static readonly PHONE_MODEM_OR_GATEWAY: 0x04;
		static readonly PHONE_ISDN: 0x05;
		static readonly AV_UNRECOGNIZED: 0x00;
		static readonly AV_WEARABLE_HEADSET: 0x01;
		static readonly AV_HANDSFREE: 0x02;
		static readonly AV_MICROPHONE: 0x04;
		static readonly AV_LOUDSPEAKER: 0x05;
		static readonly AV_HEADPHONES: 0x06;
		static readonly AV_PORTABLE_AUDIO: 0x07;
		static readonly AV_CAR_AUDIO: 0x08;
		static readonly AV_SETTOP_BOX: 0x09;
		static readonly AV_HIFI: 0x0a;
		static readonly AV_VCR: 0x0b;
		static readonly AV_VIDEO_CAMERA: 0x0c;
		static readonly AV_CAMCORDER: 0x0d;
		static readonly AV_MONITOR: 0x0e;
		static readonly AV_DISPLAY_AND_LOUDSPEAKER: 0x0f;
		static readonly AV_VIDEO_CONFERENCING: 0x10;
		static readonly AV_GAMING_TOY: 0x12;
		static readonly PERIPHERAL_UNCATEGORIZED: 0;
		static readonly PERIPHERAL_KEYBOARD: 0x10;
		static readonly PERIPHERAL_POINTING_DEVICE: 0x20;
		static readonly PERIPHERAL_KEYBOARD_AND_POINTING_DEVICE: 0x30;
		static readonly PERIPHERAL_JOYSTICK: 0x01;
		static readonly PERIPHERAL_GAMEPAD: 0x02;
		static readonly PERIPHERAL_REMOTE_CONTROL: 0x03;
		static readonly PERIPHERAL_SENSING_DEVICE: 0x04;
		static readonly PERIPHERAL_DEGITIZER_TABLET: 0x05;
		static readonly PERIPHERAL_CARD_READER: 0x06;
		static readonly PERIPHERAL_DIGITAL_PEN: 0x07;
		static readonly PERIPHERAL_HANDHELD_SCANNER: 0x08;
		static readonly PERIPHERAL_HANDHELD_INPUT_DEVICE: 0x09;
		static readonly IMAGING_UNCATEGORIZED: 0x00;
		static readonly IMAGING_DISPLAY: 0x04;
		static readonly IMAGING_CAMERA: 0x08;
		static readonly IMAGING_SCANNER: 0x10;
		static readonly IMAGING_PRINTER: 0x20;
		static readonly WEARABLE_WRITST_WATCH: 0x01;
		static readonly WEARABLE_PAGER: 0x02;
		static readonly WEARABLE_JACKET: 0x03;
		static readonly WEARABLE_HELMET: 0x04;
		static readonly WEARABLE_GLASSES: 0x05;
		static readonly TOY_ROBOT: 0x01;
		static readonly TOY_VEHICLE: 0x02;
		static readonly TOY_DOLL: 0x03;
		static readonly TOY_CONTROLLER: 0x04;
		static readonly TOY_GAME: 0x05;
		static readonly HEALTH_UNDEFINED: 0x00;
		static readonly HEALTH_BLOOD_PRESSURE_MONITOR: 0x01;
		static readonly HEALTH_THERMOMETER: 0x02;
		static readonly HEALTH_WEIGHING_SCALE: 0x03;
		static readonly HEALTH_GLUCOSE_METER: 0x04;
		static readonly HEALTH_PULSE_OXIMETER: 0x05;
		static readonly HEALTH_PULSE_RATE_MONITOR: 0x06;
		static readonly HEALTH_DATA_DISPLAY: 0x07;
		static readonly HEALTH_STEP_COUNTER: 0x08;
		static readonly HEALTH_BODY_COMPOSITION_ANALYZER: 0x09;
		static readonly HEALTH_PEAK_FLOW_MONITOR: 0x0a;
		static readonly HEALTH_MEDICATION_MONITOR: 0x0b;
		static readonly HEALTH_KNEE_PROSTHESIS: 0x0c;
		static readonly HEALTH_ANKLE_PROSTHESIS: 0x0d;
	}

	class BluetoothClassDeviceService {
		static readonly LIMITED_DISCOVERABILITY: 0x0001;
		static readonly POSITIONING: 0x0008;
		static readonly NETWORKING: 0x0010;
		static readonly RENDERING: 0x0020;
		static readonly CAPTURING: 0x0040;
		static readonly OBJECT_TRANSFER: 0x0080;
		static readonly AUDIO: 0x0100;
		static readonly TELEPHONY: 0x0200;
		static readonly INFORMATION: 0x0400;
	}

	interface BluetoothServiceHandler {
		uuid: BluetoothUUID;
		name: string;
		isConnected: boolean;
		onconnect: BluetoothSocketSuccessCallback | null;
		unregister(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
	}

	interface BluetoothAdapterChangeCallback {
		onstatechanged(powered: boolean): void;
		onnamechanged(name: string): void;
		onvisibilitychanged(visible: boolean): void;
	}

	interface BluetoothDeviceSuccessCallback {
		onsuccess(device: BluetoothDevice): void;
	}

	interface BluetoothDeviceArraySuccessCallback {
		onsuccess(devices: Array<BluetoothDevice>): void;
	}

	interface BluetoothDiscoverDevicesSuccessCallback {
		onstarted(): void;
		ondevicefound(device: BluetoothDevice): void;
		ondevicedisappeared(address: BluetoothAddress): void;
		onfinished(foundDevices: Array<BluetoothDevice>): void;
	}

	interface BluetoothSocketSuccessCallback {
		onsuccess(socket: BluetoothSocket): void;
	}

	interface BluetoothServiceSuccessCallback {
		onsuccess(handler: BluetoothServiceHandler): void;
	}
}
