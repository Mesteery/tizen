export {};
declare global {
	type HumanActivityType = 'PEDOMETER' | 'WRIST_UP' | 'HRM' | 'GPS';
	type PedometerStepStatus = 'NOT_MOVING' | 'WALKING' | 'RUNNING';
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
		start(type: HumanActivityType, changedCallback?: HumanActivityMonitorSuccessCallback | null): void;
		stop(type: HumanActivityType): void;
		setAccumulativePedometerListener(changeCallback: HumanActivityMonitorSuccessCallback): void;
		unsetAccumulativePedometerListener(): void;
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

	interface HumanActivityMonitorSuccessCallback {
		onsuccess(humanactivitydata?: HumanActivityData | null): void;
	}
}
