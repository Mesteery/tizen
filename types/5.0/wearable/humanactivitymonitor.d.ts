export {};
declare global {
	type HumanActivityType = 'PEDOMETER' | 'HRM' | 'GPS' | 'SLEEP_MONITOR' | 'SLEEP_DETECTOR' | 'STRESS_MONITOR';
	type HumanActivityRecorderType = 'PEDOMETER' | 'HRM' | 'SLEEP_MONITOR' | 'PRESSURE';
	type PedometerStepStatus = 'NOT_MOVING' | 'WALKING' | 'RUNNING' | 'UNKNOWN';
	type ActivityRecognitionType = 'STATIONARY' | 'WALKING' | 'RUNNING' | 'IN_VEHICLE';
	type ActivityAccuracy = 'LOW' | 'MEDIUM' | 'HIGH';
	type SleepStatus = 'ASLEEP' | 'AWAKE' | 'UNKNOWN';
	type GestureType =
		| 'GESTURE_DOUBLE_TAP'
		| 'GESTURE_MOVE_TO_EAR'
		| 'GESTURE_NO_MOVE'
		| 'GESTURE_PICK_UP'
		| 'GESTURE_SHAKE'
		| 'GESTURE_SNAP'
		| 'GESTURE_TILT'
		| 'GESTURE_TURN_FACE_DOWN'
		| 'GESTURE_WRIST_UP';
	type GestureEvent =
		| 'GESTURE_EVENT_DETECTED'
		| 'GESTURE_SHAKE_DETECTED'
		| 'GESTURE_SHAKE_FINISHED'
		| 'GESTURE_SNAP_X_NEGATIVE'
		| 'GESTURE_SNAP_X_POSITIVE'
		| 'GESTURE_SNAP_Y_NEGATIVE'
		| 'GESTURE_SNAP_Y_POSITIVE'
		| 'GESTURE_SNAP_Z_NEGATIVE'
		| 'GESTURE_SNAP_Z_POSITIVE';
	interface HumanActivityRecorderOption {
		interval?: number;
		retentionPeriod?: number;
	}

	interface HumanActivityRecorderQuery {
		startTime?: number;
		endTime?: number;
		anchorTime?: number;
		interval?: number;
	}

	interface HumanActivityMonitorOption {
		callbackInterval?: number;
		sampleInterval?: number;
	}

	interface HumanActivityMonitorManagerObject {
		humanactivitymonitor: HumanActivityMonitorManager;
	}
	interface Tizen extends HumanActivityMonitorManagerObject {}

	interface HumanActivityMonitorManager {
		getHumanActivityData(
			type: HumanActivityType,
			successCallback: HumanActivityMonitorSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		start(
			type: HumanActivityType,
			changedCallback?: HumanActivityMonitorSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			option?: HumanActivityMonitorOption | null,
		): void;
		stop(type: HumanActivityType): void;
		setAccumulativePedometerListener(changeCallback: HumanActivityMonitorSuccessCallback): void;
		unsetAccumulativePedometerListener(): void;
		addActivityRecognitionListener(
			type: ActivityRecognitionType,
			listener: HumanActivityMonitorSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): number;
		removeActivityRecognitionListener(listenerId: number, errorCallback?: ErrorCallback | null): void;
		startRecorder(type: HumanActivityRecorderType, option?: HumanActivityRecorderOption): void;
		stopRecorder(type: HumanActivityRecorderType): void;
		readRecorderData(
			type: HumanActivityRecorderType,
			query: HumanActivityRecorderQuery | null,
			successCallback: HumanActivityReadRecorderSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		isGestureSupported(type: GestureType): boolean;
		addGestureRecognitionListener(
			type: GestureType,
			listener: GestureRecognitionCallback,
			errorCallback?: ErrorCallback | null,
			alwaysOn?: boolean | null,
		): number;
		removeGestureRecognitionListener(watchId: number): void;
		addStressMonitorChangeListener(ranges: Array<StressMonitorDataRange>, listener: StressMonitorCallback): number;
		removeStressMonitorChangeListener(watchId: number): void;
	}

	interface StepDifference {
		stepCountDifference: number;
		timestamp: number;
	}

	interface HumanActivityData {}

	interface HumanActivityPedometerData {
		stepStatus: PedometerStepStatus;
		speed: number;
		walkingFrequency: number;
		cumulativeDistance: number;
		cumulativeCalorie: number;
		cumulativeTotalStepCount: number;
		cumulativeWalkStepCount: number;
		cumulativeRunStepCount: number;
		stepCountDifferences: Array<StepDifference>;
	}

	interface HumanActivityAccumulativePedometerData {
		stepStatus: PedometerStepStatus;
		speed: number;
		walkingFrequency: number;
		accumulativeDistance: number;
		accumulativeCalorie: number;
		accumulativeTotalStepCount: number;
		accumulativeWalkStepCount: number;
		accumulativeRunStepCount: number;
		stepCountDifferences: Array<StepDifference>;
	}

	interface HumanActivityHRMData {
		heartRate: number;
		rRInterval: number;
	}

	interface HumanActivityGPSInfo {
		latitude: number;
		longitude: number;
		altitude: number;
		speed: number;
		errorRange: number;
		timestamp: number;
	}

	interface HumanActivityGPSInfoArray {
		gpsInfo: Array<HumanActivityGPSInfo>;
	}

	interface HumanActivitySleepMonitorData {
		status: SleepStatus;
		timestamp: number;
	}

	interface HumanActivitySleepDetectorData {
		status: SleepStatus;
	}

	interface HumanActivityStressMonitorData {
		stressScore: number;
	}

	interface HumanActivityRecognitionData {
		type: ActivityRecognitionType;
		timestamp: number;
		accuracy: ActivityAccuracy;
	}

	interface HumanActivityRecorderData {
		startTime: number;
		endTime: number;
	}

	interface HumanActivityRecorderPedometerData {
		distance: number;
		calorie: number;
		totalStepCount: number;
		walkStepCount: number;
		runStepCount: number;
	}

	interface HumanActivityRecorderHRMData {
		heartRate: number;
	}

	interface HumanActivityRecorderSleepMonitorData {
		status: SleepStatus;
	}

	interface HumanActivityRecorderPressureData {
		max: number | null;
		min: number | null;
		average: number | null;
	}

	interface GestureData {
		type: GestureType;
		event: GestureEvent;
		timestamp: number;
		x: number | null;
		y: number | null;
	}

	class StressMonitorDataRange {
		constructor();
		label: string;
		min: number;
		max: number;
	}

	interface HumanActivityMonitorSuccessCallback {
		onsuccess(humanactivitydata?: HumanActivityData | null): void;
	}

	interface HumanActivityReadRecorderSuccessCallback {
		onsuccess(humanactivitydata: Array<HumanActivityRecorderData>): void;
	}

	interface GestureRecognitionCallback {
		onsuccess(data: GestureData): void;
	}

	interface StressMonitorCallback {
		onsuccess(label: string): void;
	}
}
