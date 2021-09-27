export {};
declare global {
	type MediaControllerServerState = 'ACTIVE' | 'INACTIVE';
	type MediaControllerPlaybackState = 'PLAY' | 'PAUSE' | 'STOP' | 'NEXT' | 'PREV' | 'FORWARD' | 'REWIND';
	interface MediaControllerObject {
		mediacontroller: MediaControllerManager;
	}

	interface MediaControllerManager {
		getClient(): MediaControllerClient;
		createServer(): MediaControllerServer;
	}

	interface MediaControllerServer {
		playbackInfo: MediaControllerPlaybackInfo;
		updatePlaybackState(state: MediaControllerPlaybackState): void;
		updatePlaybackPosition(position: number): void;
		updateShuffleMode(mode: boolean): void;
		updateRepeatMode(mode: boolean): void;
		updateMetadata(metadata: MediaControllerMetadata): void;
		addChangeRequestPlaybackInfoListener(listener: MediaControllerChangeRequestPlaybackInfoCallback): number;
		removeChangeRequestPlaybackInfoListener(watchId: number): void;
		addCommandListener(listener: MediaControllerReceiveCommandCallback): number;
		removeCommandListener(watchId: number): void;
	}

	interface MediaControllerClient {
		findServers(
			successCallback: MediaControllerServerInfoArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getLatestServerInfo(): MediaControllerServerInfo | null;
	}

	interface MediaControllerServerInfo {
		name: ApplicationId;
		state: MediaControllerServerState;
		playbackInfo: MediaControllerPlaybackInfo;
		sendPlaybackState(
			state: MediaControllerPlaybackState,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		sendPlaybackPosition(
			position: number,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		sendShuffleMode(
			mode: boolean,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		sendRepeatMode(mode: boolean, successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		sendCommand(
			command: string,
			data: object,
			successCallback: MediaControllerSendCommandSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		addServerStatusChangeListener(listener: MediaControllerServerStatusChangeCallback): number;
		removeServerStatusChangeListener(watchId: number): void;
		addPlaybackInfoChangeListener(listener: MediaControllerPlaybackInfoChangeCallback): number;
		removePlaybackInfoChangeListener(watchId: number): void;
	}

	interface MediaControllerPlaybackInfo {
		state: MediaControllerPlaybackState;
		position: number;
		shuffleMode: boolean;
		repeatMode: boolean;
		metadata: MediaControllerMetadata;
	}

	interface MediaControllerMetadata {
		title: string;
		artist: string;
		album: string;
		author: string;
		genre: string;
		duration: string;
		date: string;
		copyright: string;
		description: string;
		trackNum: string;
		picture: string;
	}

	interface MediaControllerServerInfoArraySuccessCallback {
		onsuccess(servers: Array<MediaControllerServerInfo>): void;
	}

	interface MediaControllerSendCommandSuccessCallback {
		onsuccess(data: object | null): void;
	}

	interface MediaControllerReceiveCommandCallback {
		onsuccess(clientAppName: ApplicationId, command: string, data: object): object | null;
	}

	interface MediaControllerServerStatusChangeCallback {
		onsuccess(status: MediaControllerServerState): void;
	}

	interface MediaControllerPlaybackInfoChangeCallback {
		onplaybackchanged(state: MediaControllerPlaybackState, position: number): void;
		onshufflemodechanged(mode: boolean): void;
		onrepeatmodechanged(mode: boolean): void;
		onmetadatachanged(metadata: MediaControllerMetadata): void;
	}

	interface MediaControllerChangeRequestPlaybackInfoCallback {
		onplaybackstaterequest(state: MediaControllerPlaybackState): void;
		onplaybackpositionrequest(position: number): void;
		onshufflemoderequest(mode: boolean): void;
		onrepeatmoderequest(mode: boolean): void;
	}
}
