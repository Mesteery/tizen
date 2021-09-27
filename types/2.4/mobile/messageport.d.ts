export {};
declare global {
	interface MessagePortDataItem {
		key?: string;
		value?: string;
	}

	interface MessagePortManagerObject {
		messageport: MessagePortManager;
	}
	interface Tizen extends MessagePortManagerObject {}

	interface MessagePortManager {
		requestLocalMessagePort(localMessagePortName: string): LocalMessagePort;
		requestTrustedLocalMessagePort(localMessagePortName: string): LocalMessagePort;
		requestRemoteMessagePort(appId: ApplicationId, remoteMessagePortName: string): RemoteMessagePort;
		requestTrustedRemoteMessagePort(appId: ApplicationId, remoteMessagePortName: string): RemoteMessagePort;
	}

	interface LocalMessagePort {
		messagePortName: string;
		isTrusted: boolean;
		addMessagePortListener(listener: MessagePortCallback): number;
		removeMessagePortListener(watchId: number): void;
	}

	interface RemoteMessagePort {
		messagePortName: string;
		appId: ApplicationId;
		isTrusted: boolean;
		sendMessage(data: Array<MessagePortDataItem>, localMessagePort?: LocalMessagePort | null): void;
	}

	interface MessagePortCallback {
		onreceived(data: Array<MessagePortDataItem>, remoteMessagePort: RemoteMessagePort | null): void;
	}
}
