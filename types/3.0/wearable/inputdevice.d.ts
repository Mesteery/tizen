export {};
declare global {
	type InputDeviceKeyName = string;
	interface InputDeviceManagerObject {
		inputdevice: InputDeviceManager;
	}
	interface Tizen extends InputDeviceManagerObject {}

	interface InputDeviceKey {
		name: InputDeviceKeyName;
		code: number;
	}

	interface InputDeviceManager {
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
