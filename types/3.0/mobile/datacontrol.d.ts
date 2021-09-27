export {};
declare global {
	type DataType = 'MAP' | 'SQL';
	interface RowData {
		columns?: Array<string>;
		values?: Array<string>;
	}

	interface DataControlManagerObject {
		datacontrol: DataControlManager;
	}
	interface Tizen extends DataControlManagerObject {}

	interface DataControlManager {
		getDataControlConsumer(providerId: string, dataId: string, type: DataType): DataControlConsumerObject;
	}

	interface DataControlConsumerObject {
		type: DataType;
		providerId: string;
		dataId: string;
	}

	interface SQLDataControlConsumer {
		insert(
			reqId: number,
			insertionData: RowData,
			successCallback?: DataControlInsertSuccessCallback | null,
			errorCallback?: DataControlErrorCallback | null,
		): void;
		update(
			reqId: number,
			updateData: RowData,
			where: string,
			successCallback?: DataControlSuccessCallback | null,
			errorCallback?: DataControlErrorCallback | null,
		): void;
		remove(
			reqId: number,
			where: string,
			successCallback?: DataControlSuccessCallback | null,
			errorCallback?: DataControlErrorCallback | null,
		): void;
		select(
			reqId: number,
			columns: Array<string>,
			where: string,
			successCallback: DataControlSelectSuccessCallback,
			errorCallback?: DataControlErrorCallback | null,
			page?: number | null,
			maxNumberPerPage?: number | null,
			order?: string | null,
		): void;
	}

	interface MappedDataControlConsumer {
		addValue(
			reqId: number,
			key: string,
			value: string,
			successCallback?: DataControlSuccessCallback | null,
			errorCallback?: DataControlErrorCallback | null,
		): void;
		removeValue(
			reqId: number,
			key: string,
			value: string,
			successCallback: DataControlSuccessCallback,
			errorCallback?: DataControlErrorCallback | null,
		): void;
		getValue(
			reqId: number,
			key: string,
			successCallback: DataControlGetValueSuccessCallback,
			errorCallback?: DataControlErrorCallback | null,
		): void;
		updateValue(
			reqId: number,
			key: string,
			oldValue: string,
			newValue: string,
			successCallback: DataControlSuccessCallback,
			errorCallback?: DataControlErrorCallback | null,
		): void;
	}

	interface DataControlSuccessCallback {
		onsuccess(reqId: number): void;
	}

	interface DataControlErrorCallback {
		onerror(reqId: number, error: WebAPIError): void;
	}

	interface DataControlInsertSuccessCallback {
		onsuccess(reqId: number, insertRowId: number): void;
	}

	interface DataControlSelectSuccessCallback {
		onsuccess(rows: Array<RowData>, reqId: number): void;
	}

	interface DataControlGetValueSuccessCallback {
		onsuccess(values: Array<string>, reqid: number): void;
	}
}
