export {};
declare global {
	type AID = string;
	type NDEFRecordTextEncoding = 'UTF8' | 'UTF16';
	type NFCTagType =
		| 'GENERIC_TARGET'
		| 'ISO14443_A'
		| 'ISO14443_4A'
		| 'ISO14443_3A'
		| 'MIFARE_MINI'
		| 'MIFARE_1K'
		| 'MIFARE_4K'
		| 'MIFARE_ULTRA'
		| 'MIFARE_DESFIRE'
		| 'ISO14443_B'
		| 'ISO14443_4B'
		| 'ISO14443_BPRIME'
		| 'FELICA'
		| 'JEWEL'
		| 'ISO15693'
		| 'UNKNOWN_TARGET';
	type CardEmulationMode = 'ALWAYS_ON' | 'OFF';
	type SecureElementType = 'ESE' | 'UICC' | 'HCE';
	type CardEmulationCategoryType = 'PAYMENT' | 'OTHER';
	type HCEEventType = 'DEACTIVATED' | 'ACTIVATED' | 'APDU_RECEIVED';
	interface NFCManagerObject {
		nfc: NFCManager;
	}
	interface Tizen extends NFCManagerObject {}

	class NFCManager {
		static readonly NFC_RECORD_TNF_EMPTY: 0;
		static readonly NFC_RECORD_TNF_WELL_KNOWN: 1;
		static readonly NFC_RECORD_TNF_MIME_MEDIA: 2;
		static readonly NFC_RECORD_TNF_URI: 3;
		static readonly NFC_RECORD_TNF_EXTERNAL_RTD: 4;
		static readonly NFC_RECORD_TNF_UNKNOWN: 5;
		static readonly NFC_RECORD_TNF_UNCHANGED: 6;
		getDefaultAdapter(): NFCAdapter;
		setExclusiveMode(mode: boolean): void;
	}

	interface NFCAdapter {
		powered: boolean;
		cardEmulationMode: CardEmulationMode;
		activeSecureElement: SecureElementType | null;
		setTagListener(detectCallback: NFCTagDetectCallback, tagFilter?: Array<NFCTagType> | null): void;
		setPeerListener(detectCallback: NFCPeerDetectCallback): void;
		unsetTagListener(): void;
		unsetPeerListener(): void;
		addCardEmulationModeChangeListener(changeCallback: CardEmulationModeChangeCallback): number;
		removeCardEmulationModeChangeListener(watchId: number): void;
		addTransactionEventListener(type: SecureElementType, eventCallback: TransactionEventCallback): number;
		removeTransactionEventListener(watchId: number): void;
		addActiveSecureElementChangeListener(changeCallback: ActiveSecureElementChangeCallback): number;
		removeActiveSecureElementChangeListener(watchId: number): void;
		getCachedMessage(): NDEFMessage | null;
		setExclusiveModeForTransaction(mode: boolean): void;
		addHCEEventListener(eventCallback: HCEEventReceiveCallback): number;
		removeHCEEventListener(watchId: number): void;
		sendHostAPDUResponse(
			apdu: Array<number>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		isActivatedHandlerForAID(type: SecureElementType, aid: AID): boolean;
		isActivatedHandlerForCategory(type: SecureElementType, category: CardEmulationCategoryType): boolean;
		registerAID(type: SecureElementType, aid: AID, category: CardEmulationCategoryType): void;
		unregisterAID(type: SecureElementType, aid: AID, category: CardEmulationCategoryType): void;
		getAIDsForCategory(
			type: SecureElementType,
			category: CardEmulationCategoryType,
			successCallback: AIDArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		setPreferredApp(): void;
		unsetPreferredApp(): void;
	}

	interface NFCTag {
		type: NFCTagType;
		isSupportedNDEF: boolean;
		ndefSize: number;
		properties: object;
		isConnected: boolean;
		readNDEF(readCallback: NDEFMessageReadCallback, errorCallback?: ErrorCallback | null): void;
		writeNDEF(
			ndefMessage: NDEFMessage,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		transceive(data: Array<number>, dataCallback: ByteArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface NFCPeer {
		isConnected: boolean;
		setReceiveNDEFListener(successCallback: NDEFMessageReadCallback): void;
		unsetReceiveNDEFListener(): void;
		sendNDEF(
			ndefMessage: NDEFMessage,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	class NDEFMessage {
		constructor();
		recordCount: number;
		records: Array<NDEFRecord>;
		toByte(): Array<number>;
	}

	class NDEFRecord {
		constructor();
		tnf: number;
		type: Array<number>;
		id: Array<number>;
		payload: Array<number>;
	}

	class NDEFRecordText {
		constructor();
		text: string;
		languageCode: string;
		encoding: NDEFRecordTextEncoding;
	}

	class NDEFRecordURI {
		constructor();
		uri: string;
	}

	class NDEFRecordMedia {
		constructor();
		mimeType: string;
	}

	interface HCEEventData {
		eventType: HCEEventType;
		apdu: Array<number>;
		length: number;
	}

	interface AIDData {
		type: SecureElementType;
		aid: AID;
		readOnly: boolean;
	}

	interface NFCTagDetectCallback {
		onattach(nfcTag: NFCTag): void;
		ondetach(): void;
	}

	interface NFCPeerDetectCallback {
		onattach(nfcPeer: NFCPeer): void;
		ondetach(): void;
	}

	interface NDEFMessageReadCallback {
		onsuccess(ndefMessage: NDEFMessage): void;
	}

	interface ByteArraySuccessCallback {
		onsuccess(data: Array<number>): void;
	}

	interface CardEmulationModeChangeCallback {
		onchanged(mode: CardEmulationMode): void;
	}

	interface TransactionEventCallback {
		ondetected(appletId: Array<number>, data: Array<number>): void;
	}

	interface ActiveSecureElementChangeCallback {
		onchanged(type: SecureElementType): void;
	}

	interface HCEEventReceiveCallback {
		ondetected(data: HCEEventData): void;
	}

	interface AIDArraySuccessCallback {
		onsuccess(aids: Array<AIDData>): void;
	}
}
