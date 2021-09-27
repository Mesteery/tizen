export {};
declare global {
	type MediaKeyType =
		| 'MEDIA_PLAY'
		| 'MEDIA_STOP'
		| 'MEDIA_PAUSE'
		| 'MEDIA_PREVIOUS'
		| 'MEDIA_NEXT'
		| 'MEDIA_FAST_FORWARD'
		| 'MEDIA_REWIND'
		| 'MEDIA_PLAY_PAUSE';
	interface MediaKeyManagerObject {
		mediakey: MediaKeyManager;
	}
	interface Tizen extends MediaKeyManagerObject {}

	interface MediaKeyManager {
		setMediaKeyEventListener(callback: MediaKeyEventCallback): void;
		unsetMediaKeyEventListener(): void;
	}

	interface MediaKeyEventCallback {
		onpressed(type: MediaKeyType): void;
		onreleased(type: MediaKeyType): void;
	}
}
