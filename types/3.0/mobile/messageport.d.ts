export {};
declare global {
	type ByteStream = number;
	type StringDataItemValue = string | Array<string>;
	type ByteStreamDataItemValue = ByteStream | Array<ByteStream>;
	type MessagePortDataItem = MessagePortStringDataItem | MessagePortByteStreamDataItem;
	interface MessagePortStringDataItem {
		key?: string;
		value?: StringDataItemValue;
	}

	interface MessagePortByteStreamDataItem {
		key?: string;
		value?: ByteStreamDataItemValue;
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
