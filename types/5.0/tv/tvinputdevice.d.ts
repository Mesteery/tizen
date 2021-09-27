export {};
declare global {
	type InputDeviceKeyName = string;
	interface TVInputDeviceManagerObject {
		tvinputdevice: TVInputDeviceManager;
	}
	interface Tizen extends TVInputDeviceManagerObject {}

	interface InputDeviceKey {
		name: InputDeviceKeyName;
		code: number;
	}

	interface TVInputDeviceManager {
		getSupportedKeys(): Array<InputDeviceKey>;
		getKey(keyName: InputDeviceKeyName): InputDeviceKey | null;
		registerKey(keyName: InputDeviceKeyName): void;
		unregisterKey(keyName: InputDeviceKeyName): void;
		registerKeyBatch(
			keyNames: Array<InputDeviceKeyName>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		unregisterKeyBatch(
			keyNames: Array<InputDeviceKeyName>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
	}
}
