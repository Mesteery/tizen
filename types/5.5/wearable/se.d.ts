export {};
declare global {
	interface SEServiceManagerObject {
		seService: SEService;
	}
	interface Tizen extends SEServiceManagerObject {}

	interface SEService {
		getReaders(successCallback: ReaderArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
		registerSEListener(listener: SEChangeListener): number;
		unregisterSEListener(id: number): void;
		shutdown(): void;
	}

	interface Reader {
		isPresent: boolean;
		getName(): string;
		openSession(successCallback: SessionSuccessCallback, errorCallback?: ErrorCallback | null): void;
		closeSessions(): void;
	}

	interface Session {
		isClosed: boolean;
		openBasicChannel(
			aid: Array<number>,
			successCallback: ChannelSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		openLogicalChannel(
			aid: Array<number>,
			successCallback: ChannelSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getATR(): Array<number>;
		close(): void;
		closeChannels(): void;
	}

	interface Channel {
		isBasicChannel: boolean;
		close(): void;
		transmit(
			command: Array<number>,
			successCallback: TransmitSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getSelectResponse(): Array<number>;
	}

	interface SEChangeListener {
		onSEReady(reader: Reader): void;
		onSENotReady(reader: Reader): void;
		onSEError(reader: Reader, error: WebAPIError): void;
	}

	interface ReaderArraySuccessCallback {
		onsuccess(readers: Array<Reader>): void;
	}

	interface SessionSuccessCallback {
		onsuccess(session: Session): void;
	}

	interface ChannelSuccessCallback {
		onsuccess(channel: Channel): void;
	}

	interface TransmitSuccessCallback {
		onsuccess(response: Array<number>): void;
	}
}
