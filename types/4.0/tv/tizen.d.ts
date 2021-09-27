export {};
declare global {
	type FilterMatchFlag = 'EXACTLY' | 'FULLSTRING' | 'CONTAINS' | 'STARTSWITH' | 'ENDSWITH' | 'EXISTS';
	type SortModeOrder = 'ASC' | 'DESC';
	type CompositeFilterType = 'UNION' | 'INTERSECTION';
	interface TizenObject {
		tizen: Tizen;
	}
	interface Window extends TizenObject {}
	const tizen: Tizen;
	interface Tizen {}

	interface AbstractFilter {}

	class AttributeFilter {
		constructor();
		attributeName: string;
		matchFlag: FilterMatchFlag;
		matchValue: any;
	}

	class AttributeRangeFilter {
		constructor();
		attributeName: string;
		initialValue: any;
		endValue: any;
	}

	class CompositeFilter {
		constructor();
		type: CompositeFilterType;
		filters: Array<AbstractFilter>;
	}

	class SortMode {
		constructor();
		attributeName: string;
		order: SortModeOrder;
	}

	class SimpleCoordinates {
		constructor();
		latitude: number;
		longitude: number;
	}

	class WebAPIException {
		static readonly INDEX_SIZE_ERR: 1;
		static readonly DOMSTRING_SIZE_ERR: 2;
		static readonly HIERARCHY_REQUEST_ERR: 3;
		static readonly WRONG_DOCUMENT_ERR: 4;
		static readonly INVALID_CHARACTER_ERR: 5;
		static readonly NO_DATA_ALLOWED_ERR: 6;
		static readonly NO_MODIFICATION_ALLOWED_ERR: 7;
		static readonly NOT_FOUND_ERR: 8;
		static readonly NOT_SUPPORTED_ERR: 9;
		static readonly INUSE_ATTRIBUTE_ERR: 10;
		static readonly INVALID_STATE_ERR: 11;
		static readonly SYNTAX_ERR: 12;
		static readonly INVALID_MODIFICATION_ERR: 13;
		static readonly NAMESPACE_ERR: 14;
		static readonly INVALID_ACCESS_ERR: 15;
		static readonly VALIDATION_ERR: 16;
		static readonly TYPE_MISMATCH_ERR: 17;
		static readonly SECURITY_ERR: 18;
		static readonly NETWORK_ERR: 19;
		static readonly ABORT_ERR: 20;
		static readonly URL_MISMATCH_ERR: 21;
		static readonly QUOTA_EXCEEDED_ERR: 22;
		static readonly TIMEOUT_ERR: 23;
		static readonly INVALID_NODE_TYPE_ERR: 24;
		static readonly DATA_CLONE_ERR: 25;
		code: number;
		name: string;
		message: string;
	}

	interface WebAPIError {
		code: number;
		name: string;
		message: string;
	}

	interface SuccessCallback {
		onsuccess(): void;
	}

	interface ErrorCallback {
		onerror(error: WebAPIError): void;
	}
}
