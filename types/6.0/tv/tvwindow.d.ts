export {};
declare global {
	type WindowType = 'MAIN';
	type MeasurementUnit = 'px' | '%';
	type PictureSizeType =
		| 'PICTURE_SIZE_TYPE_16x9'
		| 'PICTURE_SIZE_TYPE_ZOOM'
		| 'PICTURE_SIZE_TYPE_CUSTOM'
		| 'PICTURE_SIZE_TYPE_4x3'
		| 'PICTURE_SIZE_TYPE_21x9_NORMAL'
		| 'PICTURE_SIZE_TYPE_21x9_AUTO'
		| 'PICTURE_SIZE_TYPE_21x9_CAPTION'
		| 'PICTURE_SIZE_TYPE_ORIGINAL_RATIO'
		| 'PICTURE_SIZE_TYPE_WSS_4x3'
		| 'PICTURE_SIZE_TYPE_WSS_16x9'
		| 'PICTURE_SIZE_TYPE_WSS_ZOOM1'
		| 'PICTURE_SIZE_TYPE_WSS_ZOOM1_DN'
		| 'PICTURE_SIZE_TYPE_WSS_ZOOM2'
		| 'PICTURE_SIZE_TYPE_WSS_WIDEZOOM'
		| 'PICTURE_SIZE_TYPE_WSS_14x9'
		| 'PICTURE_SIZE_TYPE_UNKNOWN';
	type ZPosition = 'FRONT' | 'BEHIND';
	interface TVWindowManagerObject {
		tvwindow: TVWindowManager;
	}
	interface Tizen extends TVWindowManagerObject {}

	interface TVWindowManager {
		getAvailableWindows(successCallback: AvailableWindowListCallback, errorCallback?: ErrorCallback | null): void;
		setSource(
			videoSource: SystemInfoVideoSourceInfo,
			successCallback: SourceChangedSuccessCallback,
			errorCallback?: ErrorCallback | null,
			type?: WindowType | null,
		): void;
		getSource(type?: WindowType | null): SystemInfoVideoSourceInfo;
		show(
			successCallback: WindowRectangleSuccessCallback,
			errorCallback?: ErrorCallback | null,
			rectangle?: Array<string> | null,
			type?: WindowType | null,
			zPosition?: ZPosition | null,
		): void;
		hide(successCallback: SuccessCallback, errorCallback?: ErrorCallback | null, type?: WindowType | null): void;
		getRect(
			successCallback: WindowRectangleSuccessCallback,
			errorCallback?: ErrorCallback | null,
			unit?: MeasurementUnit | null,
			type?: WindowType | null,
		): void;
		getVideoResolution(type?: WindowType | null): VideoResolution;
		addVideoResolutionChangeListener(callback: VideoResolutionChangeCallback, type?: WindowType | null): number;
		removeVideoResolutionChangeListener(listenerId: number): void;
	}

	interface VideoResolution {
		width: number;
		height: number;
		frequency: number;
		pictureSizeType: PictureSizeType;
	}

	interface VideoResolutionChangeCallback {
		onchanged(resolution: VideoResolution, type: WindowType): void;
	}

	interface AvailableWindowListCallback {
		onsuccess(type: Array<WindowType>): void;
	}

	interface WindowRectangleSuccessCallback {
		onsuccess(windowRect: Array<string>, type: WindowType): void;
	}

	interface SourceChangedSuccessCallback {
		onsuccess(source: SystemInfoVideoSourceInfo, type: WindowType): void;
	}
}
