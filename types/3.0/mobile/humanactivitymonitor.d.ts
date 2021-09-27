export {};
declare global {
	type HumanActivityType = 'PEDOMETER' | 'WRIST_UP' | 'HRM' | 'GPS' | 'SLEEP_MONITOR';
	type HumanActivityRecorderType = 'PEDOMETER' | 'HRM' | 'SLEEP_MONITOR' | 'PRESSURE';
	type PedometerStepStatus = 'NOT_MOVING' | 'WALKING' | 'RUNNING' | 'UNKNOWN';
	type ActivityRecognitionType = 'STATIONARY' | 'WALKING' | 'RUNNING' | 'IN_VEHICLE';
	type ActivityAccuracy = 'LOW' | 'MEDIUM' | 'HIGH';
	type SleepStatus = 'ASLEEP' | 'AWAKE' | 'UNKNOWN';
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

	interface HumanActivityMonitorSuccessCallback {
		onsuccess(humanactivitydata?: HumanActivityData | null): void;
	}

	interface HumanActivityReadRecorderSuccessCallback {
		onsuccess(humanactivitydata: Array<HumanActivityRecorderData>): void;
	}
}
