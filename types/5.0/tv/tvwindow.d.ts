export {};
declare global {
	type WindowType = 'MAIN';
	type MeasurementUnit = 'px' | '%';
	type AspectRatio =
		| 'ASPECT_RATIO_1x1'
		| 'ASPECT_RATIO_4x3'
		| 'ASPECT_RATIO_16x9'
		| 'ASPECT_RATIO_221x100'
		| 'ASPECT_RATIO_UNKNOWN';
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
		aspectRatio: AspectRatio;
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
