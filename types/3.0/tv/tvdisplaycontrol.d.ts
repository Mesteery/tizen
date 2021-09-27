export {};
declare global {
	type Display3DEffectMode =
		| 'OFF'
		| 'TOP_BOTTOM'
		| 'SIDE_BY_SIDE'
		| 'LINE_BY_LINE'
		| 'VERTICAL_STRIPE'
		| 'FRAME_SEQUENCE'
		| 'CHECKER_BD'
		| 'FROM_2D_TO_3D';
	type Display3DModeState = 'NOT_CONNECTED' | 'NOT_SUPPORTED' | 'READY';
	interface DisplayControlManagerObject {
		tvdisplaycontrol: DisplayControlManager;
	}
	interface Tizen extends DisplayControlManagerObject {}

	interface DisplayControlManager {
		get3DEffectMode(): Display3DEffectMode;
		is3DModeEnabled(): Display3DModeState;
		getSupported3DEffectModeList(
			successCallback: Mode3DEffectListSupportCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface Mode3DEffectListSupportCallback {
		onsuccess(mode3DEffects: Array<Display3DEffectMode>): void;
	}
}
