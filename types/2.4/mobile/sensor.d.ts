export {};
declare global {
	type MagneticSensorAccuracy =
		| 'ACCURACY_UNDEFINED'
		| 'ACCURACY_BAD'
		| 'ACCURACY_NORMAL'
		| 'ACCURACY_GOOD'
		| 'ACCURACY_VERYGOOD';
	type ProximityState = 'FAR' | 'NEAR';
	type SensorType = 'HRM_RAW' | 'LIGHT' | 'MAGNETIC' | 'PRESSURE' | 'PROXIMITY' | 'ULTRAVIOLET';
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
		setChangeListener(successCallback: SensorDataSuccessCallback): void;
		unsetChangeListener(): void;
	}

	interface HRMRawSensor {
		getHRMRawSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	interface LightSensor {
		getLightSensorData(successCallback: SensorDataSuccessCallback, errorCallback?: ErrorCallback | null): void;
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

	interface SensorHRMRawData {
		lightType: string;
		lightIntensity: number;
	}

	interface SensorLightData {
		lightLevel: number;
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

	interface SensorDataSuccessCallback {
		onsuccess(sensorData?: SensorData | null): void;
	}
}
