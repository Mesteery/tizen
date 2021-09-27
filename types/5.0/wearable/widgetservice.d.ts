export {};
declare global {
	type WidgetId = string;
	type WidgetInstanceId = string;
	type WidgetSizeType =
		| '1x1'
		| '2x1'
		| '2x2'
		| '4x1'
		| '4x2'
		| '4x3'
		| '4x4'
		| '4x5'
		| '4x6'
		| 'EASY_1x1'
		| 'EASY_3x1'
		| 'EASY_3x3'
		| 'FULL';
	type WidgetStateType = 'CREATE' | 'DESTROY' | 'PAUSE' | 'RESUME';
	interface WidgetServiceManagerObject {
		widgetservice: WidgetServiceManager;
	}
	interface Tizen extends WidgetServiceManagerObject {}

	interface WidgetServiceManager {
		getWidget(widgetId: WidgetId): Widget;
		getWidgets(
			successCallback: WidgetArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			packageId?: PackageId | null,
		): void;
		getPrimaryWidgetId(id: PackageId | ApplicationId): WidgetId;
		getSize(sizeType: WidgetSizeType): WidgetSize;
	}

	interface Widget {
		id: WidgetId;
		applicationId: ApplicationId;
		setupApplicationId: ApplicationId | null;
		packageId: PackageId;
		noDisplay: boolean;
		getName(locale?: string | null): string;
		getInstances(successCallback: WidgetInstancesCallback, errorCallback?: ErrorCallback | null): void;
		getVariant(sizeType: WidgetSizeType): WidgetVariant;
		getVariants(successCallback: WidgetVariantsCallback, errorCallback?: ErrorCallback | null): void;
		addStateChangeListener(listener: WidgetChangeCallback): number;
		removeStateChangeListener(watchId: number): void;
	}

	interface WidgetSize {
		width: number;
		height: number;
	}

	interface WidgetVariant {
		sizeType: WidgetSizeType;
		width: number;
		height: number;
		previewImagePath: string;
		needsMouseEvents: boolean;
		needsTouchEffect: boolean;
		needsFrame: boolean;
	}

	interface WidgetInstance {
		widget: Widget;
		id: WidgetInstanceId;
		changeUpdatePeriod(seconds: number): void;
		sendContent(data: Object, updateIfPaused: boolean): void;
		getContent(successCallback: WidgetContentCallback, errorCallback: ErrorCallback): void;
	}

	interface WidgetArraySuccessCallback {
		onsuccess(widgets: Array<Widget>): void;
	}

	interface WidgetInstancesCallback {
		onsuccess(instances: Array<WidgetInstance>): void;
	}

	interface WidgetVariantsCallback {
		onsuccess(instances: Array<WidgetVariant>): void;
	}

	interface WidgetContentCallback {
		onsuccess(data: Object): void;
	}

	interface WidgetChangeCallback {
		onchange(instance: WidgetInstance, event: WidgetStateType): void;
	}
}
