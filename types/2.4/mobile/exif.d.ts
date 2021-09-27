export {};
declare global {
	type WhiteBalanceMode = 'AUTO' | 'MANUAL';
	type ExposureProgram =
		| 'NOT_DEFINED'
		| 'MANUAL'
		| 'NORMAL'
		| 'APERTURE_PRIORITY'
		| 'SHUTTER_PRIORITY'
		| 'CREATIVE_PROGRAM'
		| 'ACTION_PROGRAM'
		| 'PORTRAIT_MODE'
		| 'LANDSCAPE_MODE';
	interface ExifInit {
		uri?: string;
		width?: number;
		height?: number;
		deviceMaker?: string;
		deviceModel?: string;
		originalTime?: Date;
		orientation?: ImageContentOrientation;
		fNumber?: number;
		isoSpeedRatings?: Array<number>;
		exposureTime?: string;
		exposureProgram?: ExposureProgram;
		flash?: boolean;
		focalLength?: number;
		whiteBalance?: WhiteBalanceMode;
		gpsLocation?: SimpleCoordinates;
		gpsAltitude?: number;
		gpsProcessingMethod?: string;
		gpsTime?: Date;
		userComment?: string;
	}

	interface ExifManagerObject {
		exif: ExifManager;
	}
	interface Tizen extends ExifManagerObject {}

	interface ExifManager {
		getExifInfo(
			uri: string,
			successCallback: ExifInformationSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		saveExifInfo(
			exifInfo: ExifInformation,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		getThumbnail(
			uri: string,
			successCallback: ExifThumbnailSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	class ExifInformation {
		constructor();
		uri: string;
		width: number | null;
		height: number | null;
		deviceMaker: string | null;
		deviceModel: string | null;
		originalTime: Date | null;
		orientation: ImageContentOrientation | null;
		fNumber: number | null;
		isoSpeedRatings: Array<number> | null;
		exposureTime: string | null;
		exposureProgram: ExposureProgram | null;
		flash: boolean | null;
		focalLength: number | null;
		whiteBalance: WhiteBalanceMode | null;
		gpsLocation: SimpleCoordinates | null;
		gpsAltitude: number | null;
		gpsProcessingMethod: string | null;
		gpsTime: TZDate | null;
		userComment: string | null;
	}

	interface ExifInformationSuccessCallback {
		onsuccess(exifInfo: ExifInformation): void;
	}

	interface ExifThumbnailSuccessCallback {
		onsuccess(uri: string | null): void;
	}
}
