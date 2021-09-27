export {};
declare global {
	type MagneticSensorAccuracy =
		| 'ACCURACY_UNDEFINED'
		| 'ACCURACY_BAD'
		| 'ACCURACY_NORMAL'
		| 'ACCURACY_GOOD'
		| 'ACCURACY_VERYGOOD';
	type ProximityState = 'FAR' | 'NEAR';
	type SensorType =
		| 'GRAVITY'
		| 'GYROSCOPE'
		| 'GYROSCOPE_ROTATION_VECTOR'
		| 'HRM_RAW'
		| 'LIGHT'
		| 'LINEAR_ACCELERATION'
		| 'MAGNETIC'
		| 'PRESSURE'
		| 'PROXIMITY'
		| 'ULTRAVIOLET';
	interface SensorServiceManagerObject {
		sensorservice: SensorService;
	}
	interface Tizen extends SensorServiceManagerObject {}

	interface SensorService {
		getDefaultSensor(type: SensorType): Sensor;
		getAvailableSensors(): Array<SensorType>;
	}

	interface Sensor {
		sensorType: SensorType;
		start(successCallback: SuccessCallback, errorCallback?: ErrorCallback | null): void;
		stop(): void;
		setChangeListener(
			successCallback: SensorDataSuccessCallback,
			interval?: number | null,
			batchLatency?: number,
		): void;
		unsetChangeListener(): void;
		getSensorHardwareInfo(
			successCallback: SensorHardwareInfoSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface GravitySensor {
		getGravitySensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface GyroscopeSensor {
		getGyroscopeSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface GyroscopeRotationVectorSensor {
		getGyroscopeRotationVectorSensorData(
			successCallback: SensorDataSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface HRMRawSensor {
		getHRMRawSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface LightSensor {
		getLightSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface LinearAccelerationSensor {
		getLinearAccelerationSensorData(
			successCallback: SensorDataSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface MagneticSensor {
		getMagneticSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface PressureSensor {
		getPressureSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface ProximitySensor {
		getProximitySensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface UltravioletSensor {
		getUltravioletSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface SensorData {}

	interface SensorGravityData {
		x: number;
		y: number;
		z: number;
	}

	interface SensorGyroscopeData {
		x: number;
		y: number;
		z: number;
	}

	interface SensorGyroscopeRotationVectorData {
		x: number;
		y: number;
		z: number;
		w: number;
	}

	interface SensorHRMRawData {
		lightType: string;
		lightIntensity: number;
	}

	interface SensorLightData {
		lightLevel: number;
	}

	interface SensorLinearAccelerationData {
		x: number;
		y: number;
		z: number;
	}

	interface SensorMagneticData {
		x: number;
		y: number;
		z: number;
		accuracy: MagneticSensorAccuracy;
	}

	interface SensorPressureData {
		pressure: number;
	}

	interface SensorProximityData {
		proximityState: ProximityState;
	}

	interface SensorUltravioletData {
		ultravioletLevel: number;
	}

	interface SensorHardwareInfo {
		name: string;
		type: SensorType;
		vendor: string;
		minValue: number;
		maxValue: number;
		resolution: number;
		minInterval: number;
		maxBatchCount: number;
	}

	interface SensorDataSuccessCallback {
		onsuccess(sensorData?: SensorData | null): void;
	}

	interface SensorHardwareInfoSuccessCallback {
		onsuccess(hardwareInfo: SensorHardwareInfo): void;
	}
}
