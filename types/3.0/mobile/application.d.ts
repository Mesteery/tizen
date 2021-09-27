export {};
declare global {
	type ApplicationId = string;
	type ApplicationContextId = string;
	type UserEventData = object;
	type EventData = SystemEventData | UserEventData;
	type ApplicationControlLaunchMode = 'SINGLE' | 'GROUP';
	interface EventInfo {
		appId?: ApplicationId;
		name?: string;
	}

	interface ApplicationManagerObject {
		application: ApplicationManager;
	}
	interface Tizen extends ApplicationManagerObject {}

	interface ApplicationManager {
		getCurrentApplication(): Application;
		kill(
			contextId: ApplicationContextId,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		launch(id: ApplicationId, successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		launchAppControl(
			appControl: ApplicationControl,
			id?: ApplicationId | null,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			replyCallback?: ApplicationControlDataArrayReplyCallback | null,
		): void;
		findAppControl(
			appControl: ApplicationControl,
			successCallback: FindAppControlSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getAppsContext(successCallback: ApplicationContextArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
		getAppContext(contextId?: ApplicationContextId | null): ApplicationContext;
		getAppsInfo(
			successCallback: ApplicationInformationArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getAppInfo(id?: ApplicationId | null): ApplicationInformation;
		getAppCerts(id?: ApplicationId | null): Array<ApplicationCertificate>;
		getAppSharedURI(id?: ApplicationId | null): string;
		getAppMetaData(id?: ApplicationId | null): Array<ApplicationMetaData>;
	}

	interface Application {
		appInfo: ApplicationInformation;
		contextId: ApplicationContextId;
		exit(): void;
		hide(): void;
		getRequestedAppControl(): RequestedApplicationControl;
		addEventListener(event: EventInfo, callback: EventCallback): number;
		removeEventListener(watchId: number): void;
		broadcastEvent(event: EventInfo, data: UserEventData): void;
		broadcastTrustedEvent(event: EventInfo, data: UserEventData): void;
	}

	interface ApplicationInformation {
		id: ApplicationId;
		name: string;
		iconPath: string;
		version: string;
		show: boolean;
		categories: Array<string>;
		installDate: Date;
		size: number;
		packageId: PackageId;
	}

	interface ApplicationContext {
		id: ApplicationContextId;
		appId: ApplicationId;
	}

	class ApplicationControlData {
		constructor();
		key: string;
		value: Array<string>;
	}

	class ApplicationControl {
		constructor();
		operation: string;
		uri: string | null;
		mime: string | null;
		category: string | null;
		data: Array<ApplicationControlData>;
		launchMode: ApplicationControlLaunchMode;
	}

	interface RequestedApplicationControl {
		appControl: ApplicationControl;
		callerAppId: ApplicationId;
		replyResult(data?: Array<ApplicationControlData> | null): void;
		replyFailure(): void;
	}

	interface ApplicationCertificate {
		type: string;
		value: string;
	}

	interface ApplicationMetaData {
		key: string;
		value: string;
	}

	interface ApplicationInformationArraySuccessCallback {
		onsuccess(informationArray: Array<ApplicationInformation>): void;
	}

	interface FindAppControlSuccessCallback {
		onsuccess(informationArray: Array<ApplicationInformation>, appControl: ApplicationControl): void;
	}

	interface ApplicationContextArraySuccessCallback {
		onsuccess(contexts: Array<ApplicationContext>): void;
	}

	interface ApplicationControlDataArrayReplyCallback {
		onsuccess(data?: Array<ApplicationControlData> | null): void;
		onfailure(): void;
	}

	interface ApplicationInformationEventCallback {
		oninstalled(info: ApplicationInformation): void;
		onupdated(info: ApplicationInformation): void;
		onuninstalled(id: ApplicationId): void;
	}

	interface SystemEventData {
		value: string;
		type: string;
	}

	interface EventCallback {
		onevent(event: EventInfo, data: EventData): void;
	}
}
