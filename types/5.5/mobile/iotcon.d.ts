export {};
declare global {
	type ResourceType = string;
	type ResourceInterface = string;
	type QosLevel = 'HIGH' | 'LOW';
	type ResponseResult =
		| 'SUCCESS'
		| 'ERROR'
		| 'RESOURCE_CREATED'
		| 'RESOURCE_DELETED'
		| 'RESOURCE_CHANGED'
		| 'SLOW'
		| 'FORBIDDEN';
	type PresenceResponseResultType = 'OK' | 'STOPPED' | 'TIMEOUT';
	type PresenceTriggerType = 'CREATED' | 'UPDATED' | 'DESTROYED';
	type ConnectivityType = 'IP' | 'PREFER_UDP' | 'PREFER_TCP' | 'IPV4_ONLY' | 'IPV6_ONLY' | 'ALL';
	type ObservePolicy = 'IGNORE_OUT_OF_ORDER' | 'ACCEPT_OUT_OF_ORDER';
	type ObserveType = 'NO_TYPE' | 'REGISTER' | 'DEREGISTER';
	interface ResourcePolicy {
		isObservable?: boolean;
		isDiscoverable?: boolean;
		isActive?: boolean;
		isSlow?: boolean;
		isSecure?: boolean;
		isExplicitDiscoverable?: boolean;
	}

	interface Query {
		resourceType?: ResourceType | null;
		resourceInterface?: ResourceInterface | null;
		filter?: object | null;
	}

	interface IotconObject {
		iotcon: Iotcon;
	}

	interface Iotcon {
		deviceName: string;
		initialize(filePath: string): void;
		getClient(): Client;
		getServer(): Server;
		getTimeout(): number;
		setTimeout(timeout: number): void;
		addGeneratedPinListener(successCallback: GeneratedPinCallback): number;
		removeGeneratedPinListener(watchId: number): void;
	}

	interface Client {
		findResource(
			hostAddress: string | null,
			query: Query | null,
			connectivityType: ConnectivityType,
			successCallback: FoundResourceSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		addPresenceEventListener(
			hostAddress: string | null,
			resourceType: ResourceType | null,
			connectivityType: ConnectivityType,
			successCallback: PresenceEventCallback,
		): number;
		removePresenceEventListener(watchId: number): void;
		findDeviceInfo(
			hostAddress: string | null,
			query: Query | null,
			connectivityType: ConnectivityType,
			successCallback: FoundDeviceInfoSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		findPlatformInfo(
			hostAddress: string | null,
			query: Query | null,
			connectivityType: ConnectivityType,
			successCallback: FoundPlatformInfoSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface Server {
		getResources(): Array<Resource>;
		createResource(
			uriPath: string,
			resourceTypes: Array<ResourceType>,
			resourceInterfaces: Array<ResourceInterface>,
			listener: RequestCallback,
			policy?: ResourcePolicy,
		): Resource;
		removeResource(resource: Resource): void;
		startPresence(timeToLive: number): void;
		stopPresence(): void;
	}

	interface RemoteResource {
		uriPath: string;
		connectivityType: ConnectivityType;
		hostAddress: string;
		resourceTypes: Array<ResourceType>;
		resourceInterfaces: Array<ResourceInterface>;
		isObservable: boolean;
		isDiscoverable: boolean;
		isActive: boolean;
		isSlow: boolean;
		isSecure: boolean;
		isExplicitDiscoverable: boolean;
		deviceId: string;
		deviceName: string;
		options: Array<IotconOption> | null;
		cachedRepresentation: Representation | null;
		timeInterval: number;
		methodGet(
			responseCallback: RemoteResourceResponseCallback,
			query?: Query | null,
			errorCallback?: ErrorCallback | null,
		): void;
		methodPut(
			representation: Representation,
			responseCallback: RemoteResourceResponseCallback,
			query?: Query | null,
			errorCallback?: ErrorCallback | null,
		): void;
		methodPost(
			representation: Representation,
			responseCallback: RemoteResourceResponseCallback,
			query?: Query | null,
			errorCallback?: ErrorCallback | null,
		): void;
		methodDelete(responseCallback: RemoteResourceResponseCallback, errorCallback?: ErrorCallback | null): void;
		startObserving(
			observePolicy: ObservePolicy,
			successCallback: RemoteResourceResponseCallback,
			query?: Query | null,
		): void;
		stopObserving(): void;
		startCaching(updatedCallback?: CacheUpdatedCallback | null): void;
		stopCaching(): void;
		setResourceStateChangeListener(successCallback: ResourceStateChangeCallback): void;
		unsetResourceStateChangeListener(): void;
	}

	interface Resource {
		uriPath: string;
		resourceTypes: Array<ResourceType>;
		resourceInterfaces: Array<ResourceInterface>;
		isObservable: boolean;
		isDiscoverable: boolean;
		isActive: boolean;
		isSlow: boolean;
		isSecure: boolean;
		isExplicitDiscoverable: boolean;
		resources: Array<Resource>;
		observerIds: Array<number>;
		attributes: object | null;
		notify(qosLevel: QosLevel, observerIds?: Array<number> | null): void;
		addResourceTypes(types: Array<ResourceType>): void;
		addResourceInterface(interface: ResourceInterface): void;
		addChildResource(resource: Resource): void;
		removeChildResource(resource: Resource): void;
		setRequestListener(listener: RequestCallback): void;
		unsetRequestListener(): void;
	}

	class Representation {
		constructor();
		uriPath: string;
		resourceTypes: Array<ResourceType>;
		resourceInterfaces: Array<ResourceInterface>;
		attributes: object | null;
		children: Array<Representation> | null;
	}

	interface PresenceResponse {
		hostAddress: string;
		connectivityType: ConnectivityType;
		resourceType: ResourceType | null;
		resultType: PresenceResponseResultType;
		triggerType: PresenceTriggerType | null;
	}

	class IotconOption {
		constructor();
		id: number;
		data: string;
	}

	interface Request {
		hostAddress: string;
		connectivityType: ConnectivityType;
		representation: Representation | null;
		options: Array<IotconOption>;
		query: Query;
	}

	class Response {
		constructor();
		request: Request;
		result: ResponseResult;
		representation: Representation;
		options: Array<IotconOption> | null;
		send(): void;
	}

	interface RemoteResponse {
		result: ResponseResult;
		representation: Representation;
		options: Array<IotconOption> | null;
	}

	interface DeviceInfo {
		deviceName: string | null;
		specVersion: string | null;
		oicDeviceId: string | null;
		dataModelVersion: string | null;
	}

	interface PlatformInfo {
		platformId: string | null;
		manufacturerName: string | null;
		manufacturerUrl: string | null;
		modelNumber: string | null;
		manufactureDate: string | null;
		platformVersion: string | null;
		operatingSystemVersion: string | null;
		hardwareVersion: string | null;
		firmwareVersion: string | null;
		supportUrl: string | null;
		systemTime: string | null;
	}

	interface RequestCallback {
		onget(request: Request): void;
		onput(request: Request): void;
		onpost(request: Request): void;
		ondelete(request: Request): void;
		onobserving(request: Request, observeType: ObserveType, observeId: number): void;
	}

	interface FoundResourceSuccessCallback {
		onfound(remoteResource: RemoteResource): void;
	}

	interface PresenceEventCallback {
		onreceived(presenceResponse: PresenceResponse): void;
	}

	interface FoundDeviceInfoSuccessCallback {
		onsuccess(info: DeviceInfo): void;
	}

	interface FoundPlatformInfoSuccessCallback {
		onsuccess(info: PlatformInfo): void;
	}

	interface RemoteResourceResponseCallback {
		onsuccess(response: RemoteResponse): void;
	}

	interface ResourceStateChangeCallback {
		onchanged(isAlive: boolean): void;
	}

	interface CacheUpdatedCallback {
		onupdated(representation: Representation): void;
	}

	interface GeneratedPinCallback {
		onsuccess(pin: string): void;
	}
}
