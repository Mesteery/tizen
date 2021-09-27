export {};
declare global {
	type MediaControllerServerState = 'ACTIVE' | 'INACTIVE';
	type MediaControllerSearchCategory = 'NO_CATEGORY' | 'TITLE' | 'ARTIST' | 'ALBUM' | 'GENRE' | 'TPO';
	type MediaControllerPlaybackState = 'PLAY' | 'PAUSE' | 'STOP' | 'NEXT' | 'PREV' | 'FORWARD' | 'REWIND';
	type MediaControllerRepeatState = 'REPEAT_OFF' | 'REPEAT_ONE' | 'REPEAT_ALL';
	type MediaControllerContentType = 'IMAGE' | 'MUSIC' | 'VIDEO' | 'OTHER' | 'UNDECIDED';
	type MediaControllerContentAgeRating =
		| 'ALL'
		| '1'
		| '2'
		| '3'
		| '4'
		| '5'
		| '6'
		| '7'
		| '8'
		| '9'
		| '10'
		| '11'
		| '12'
		| '13'
		| '14'
		| '15'
		| '16'
		| '17'
		| '18'
		| '19';
	type MediaControllerAbilitySupport = 'YES' | 'NO' | 'UNDECIDED';
	type MediaControllerSimpleAbility =
		| 'PLAYBACK_POSITION'
		| 'SHUFFLE'
		| 'REPEAT'
		| 'PLAYLIST'
		| 'CLIENT_CUSTOM'
		| 'SEARCH'
		| 'SUBTITLES'
		| 'MODE_360';
	type MediaControllerDisplayModeType = 'LETTER_BOX' | 'ORIGIN_SIZE' | 'FULL_SCREEN' | 'CROPPED_FULL';
	type MediaControllerDisplayRotationType = 'ROTATION_NONE' | 'ROTATION_90' | 'ROTATION_180' | 'ROTATION_270';
	interface MediaControllerMetadataInit {
		title?: string;
		artist?: string;
		album?: string;
		author?: string;
		genre?: string;
		duration?: string;
		date?: string;
		copyright?: string;
		description?: string;
		trackNum?: string;
		picture?: string;
		seasonNumber?: number;
		seasonTitle?: string;
		episodeNumber?: number;
		episodeTitle?: string;
		resolutionWidth?: number;
		resolutionHeight?: number;
	}

	interface MediaControllerObject {
		mediacontroller: MediaControllerManager;
	}

	interface MediaControllerManager {
		getClient(): MediaControllerClient;
		createServer(): MediaControllerServer;
	}

	interface MediaControllerServer {
		playbackInfo: MediaControllerPlaybackInfo;
		iconURI: string | null;
		abilities: MediaControllerAbilities;
		subtitles: MediaControllerSubtitles;
		mode360: MediaControllerMode360;
		displayMode: MediaControllerDisplayMode;
		displayRotation: MediaControllerDisplayRotation;
		getAllClientsInfo(): Array<MediaControllerClientInfo>;
		updatePlaybackState(state: MediaControllerPlaybackState): void;
		updateIconURI(iconURI: string | null): void;
		updatePlaybackPosition(position: number): void;
		updatePlaybackAgeRating(rating: MediaControllerContentAgeRating): void;
		updatePlaybackContentType(type: MediaControllerContentType): void;
		updateShuffleMode(mode: boolean): void;
		updateRepeatState(state: MediaControllerRepeatState): void;
		updateMetadata(metadata: MediaControllerMetadata): void;
		addChangeRequestPlaybackInfoListener(listener: MediaControllerChangeRequestPlaybackInfoCallback): number;
		removeChangeRequestPlaybackInfoListener(watchId: number): void;
		setSearchRequestListener(listener: MediaControllerSearchRequestCallback): void;
		unsetSearchRequestListener(): void;
		addCommandListener(listener: MediaControllerReceiveCommandCallback): number;
		removeCommandListener(watchId: number): void;
		createPlaylist(name: string): MediaControllerPlaylist;
		savePlaylist(
			playlist: MediaControllerPlaylist,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		deletePlaylist(
			playlistName: string,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		updatePlaybackItem(playlistName: string, index: string): void;
		getAllPlaylists(
			successCallback: MediaControllerGetAllPlaylistsSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface MediaControllerClient {
		findServers(
			successCallback: MediaControllerServerInfoArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getLatestServerInfo(): MediaControllerServerInfo | null;
		addAbilityChangeListener(listener: MediaControllerAbilityChangeCallback): number;
		removeAbilityChangeListener(watchId: number): void;
		findSubscribedServers(
			successCallback: MediaControllerServerInfoArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		setCustomEventListener(listener: MediaControllerReceiveCommandCallback): void;
		unsetCustomEventListener(): void;
	}

	interface MediaControllerServerInfo {
		name: ApplicationId;
		state: MediaControllerServerState;
		playbackInfo: MediaControllerPlaybackInfo;
		iconURI: string | null;
		abilities: MediaControllerAbilitiesInfo;
		subtitles: MediaControllerSubtitlesInfo;
		mode360: MediaControllerMode360Info;
		displayMode: MediaControllerDisplayModeInfo;
		displayRotation: MediaControllerDisplayRotationInfo;
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
		sendRepeatState(
			state: MediaControllerRepeatState,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		sendSearchRequest(
			request: Array<SearchFilter>,
			replyCallback: MediaControllerSearchRequestReplyCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		sendCommand(
			command: string,
			data: Bundle | null,
			successCallback: MediaControllerSendCommandSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		addServerStatusChangeListener(listener: MediaControllerServerStatusChangeCallback): number;
		removeServerStatusChangeListener(watchId: number): void;
		addPlaybackInfoChangeListener(listener: MediaControllerPlaybackInfoChangeCallback): number;
		removePlaybackInfoChangeListener(watchId: number): void;
		getAllPlaylists(
			successCallback: MediaControllerGetAllPlaylistsSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		sendPlaybackItem(playlistName: string, index: string, state: MediaControllerPlaybackState, position: number): void;
		addPlaylistUpdatedListener(listener: MediaControllerPlaylistUpdatedCallback): number;
		removePlaylistUpdatedListener(listenerId: number): void;
	}

	interface MediaControllerPlaybackInfo {
		state: MediaControllerPlaybackState;
		position: number;
		ageRating: MediaControllerContentAgeRating;
		contentType: MediaControllerContentType;
		shuffleMode: boolean;
		repeatState: MediaControllerRepeatState;
		metadata: MediaControllerMetadata;
		index: string | null;
		playlistName: string | null;
	}

	interface MediaControllerAbilities {
		playback: MediaControllerPlaybackAbilities;
		displayMode: MediaControllerDisplayModeAbilities;
		displayRotation: MediaControllerDisplayRotationAbilities;
		playbackPosition: MediaControllerAbilitySupport;
		shuffle: MediaControllerAbilitySupport;
		repeat: MediaControllerAbilitySupport;
		playlist: MediaControllerAbilitySupport;
		clientCustom: MediaControllerAbilitySupport;
		search: MediaControllerAbilitySupport;
		subtitles: MediaControllerAbilitySupport;
		mode360: MediaControllerAbilitySupport;
	}

	interface MediaControllerPlaybackAbilities {
		play: MediaControllerAbilitySupport;
		pause: MediaControllerAbilitySupport;
		stop: MediaControllerAbilitySupport;
		next: MediaControllerAbilitySupport;
		prev: MediaControllerAbilitySupport;
		forward: MediaControllerAbilitySupport;
		rewind: MediaControllerAbilitySupport;
		togglePlayPause: MediaControllerAbilitySupport;
		saveAbilities(): void;
	}

	interface MediaControllerDisplayModeAbilities {
		letterBox: MediaControllerAbilitySupport;
		originSize: MediaControllerAbilitySupport;
		fullScreen: MediaControllerAbilitySupport;
		croppedFull: MediaControllerAbilitySupport;
	}

	interface MediaControllerDisplayRotationAbilities {
		rotationNone: MediaControllerAbilitySupport;
		rotation90: MediaControllerAbilitySupport;
		rotation180: MediaControllerAbilitySupport;
		rotation270: MediaControllerAbilitySupport;
	}

	interface MediaControllerAbilitiesInfo {
		playback: MediaControllerPlaybackAbilitiesInfo;
		displayMode: MediaControllerDisplayModeAbilitiesInfo;
		displayRotation: MediaControllerDisplayRotationAbilitiesInfo;
		playbackPosition: MediaControllerAbilitySupport;
		shuffle: MediaControllerAbilitySupport;
		repeat: MediaControllerAbilitySupport;
		playlist: MediaControllerAbilitySupport;
		clientCustom: MediaControllerAbilitySupport;
		search: MediaControllerAbilitySupport;
		subtitles: MediaControllerAbilitySupport;
		mode360: MediaControllerAbilitySupport;
		subscribe(): void;
		unsubscribe(): void;
	}

	interface MediaControllerPlaybackAbilitiesInfo {
		play: MediaControllerAbilitySupport;
		pause: MediaControllerAbilitySupport;
		stop: MediaControllerAbilitySupport;
		next: MediaControllerAbilitySupport;
		prev: MediaControllerAbilitySupport;
		forward: MediaControllerAbilitySupport;
		rewind: MediaControllerAbilitySupport;
		togglePlayPause: MediaControllerAbilitySupport;
	}

	interface MediaControllerDisplayModeAbilitiesInfo {
		letterBox: MediaControllerAbilitySupport;
		originSize: MediaControllerAbilitySupport;
		fullScreen: MediaControllerAbilitySupport;
		croppedFull: MediaControllerAbilitySupport;
	}

	interface MediaControllerDisplayRotationAbilitiesInfo {
		rotationNone: MediaControllerAbilitySupport;
		rotation90: MediaControllerAbilitySupport;
		rotation180: MediaControllerAbilitySupport;
		rotation270: MediaControllerAbilitySupport;
	}

	interface MediaControllerSubtitles {
		enabled: boolean;
		addChangeRequestListener(listener: MediaControllerEnabledChangeRequestCallback): number;
		removeChangeRequestListener(watchId: number): void;
	}

	interface MediaControllerSubtitlesInfo {
		enabled: boolean;
		sendRequest(enabled: boolean, replyCallback: MediaControllerSendCommandSuccessCallback): void;
		addModeChangeListener(listener: MediaControllerEnabledChangeCallback): number;
		removeModeChangeListener(watchId: number): void;
	}

	interface MediaControllerMode360 {
		enabled: boolean;
		addChangeRequestListener(listener: MediaControllerEnabledChangeRequestCallback): number;
		removeChangeRequestListener(watchId: number): void;
	}

	interface MediaControllerMode360Info {
		enabled: boolean;
		sendRequest(enabled: boolean, replyCallback: MediaControllerSendCommandSuccessCallback): void;
		addModeChangeListener(listener: MediaControllerEnabledChangeCallback): number;
		removeModeChangeListener(watchId: number): void;
	}

	interface MediaControllerDisplayMode {
		type: MediaControllerDisplayModeType;
		addChangeRequestListener(listener: MediaControllerDisplayModeChangeRequestCallback): number;
		removeChangeRequestListener(watchId: number): void;
	}

	interface MediaControllerDisplayModeInfo {
		type: MediaControllerDisplayModeType;
		sendRequest(type: MediaControllerDisplayModeType, replyCallback: MediaControllerSendCommandSuccessCallback): void;
		addModeChangeListener(listener: MediaControllerDisplayModeChangeCallback): number;
		removeModeChangeListener(watchId: number): void;
	}

	interface MediaControllerDisplayRotation {
		displayRotation: MediaControllerDisplayRotationType;
		addChangeRequestListener(listener: MediaControllerDisplayRotationChangeRequestCallback): number;
		removeChangeRequestListener(watchId: number): void;
	}

	interface MediaControllerClientInfo {
		name: ApplicationId;
		sendEvent(eventName: string, data: Bundle | null, successCallback: MediaControllerSendCommandSuccessCallback): void;
	}

	interface MediaControllerDisplayRotationInfo {
		displayRotation: MediaControllerDisplayRotationType;
		sendRequest(
			displayRotation: MediaControllerDisplayRotationType,
			replyCallback: MediaControllerSendCommandSuccessCallback,
		): void;
		addDisplayRotationChangeListener(listener: MediaControllerDisplayRotationChangeCallback): number;
		removeDisplayRotationChangeListener(watchId: number): void;
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
		seasonNumber: number;
		seasonTitle: string | null;
		episodeNumber: number;
		episodeTitle: string | null;
		resolutionWidth: number;
		resolutionHeight: number;
	}

	interface MediaControllerPlaylistItem {
		index: string;
		metadata: MediaControllerMetadata;
	}

	interface MediaControllerPlaylist {
		name: string;
		addItem(index: string, metadata: MediaControllerMetadataInit): void;
		getItems(successCallback: MediaControllerGetItemsSuccessCallback, errorCallback?: ErrorCallback | null): void;
	}

	class SearchFilter {
		constructor();
		contentType: MediaControllerContentType;
		category: MediaControllerSearchCategory;
		keyword: string | null;
		extraData: Bundle | null;
	}

	interface MediaControllerServerInfoArraySuccessCallback {
		onsuccess(servers: Array<MediaControllerServerInfo>): void;
	}

	interface MediaControllerSendCommandSuccessCallback {
		onsuccess(data: object | null, code?: number): void;
	}

	class RequestReply {
		constructor();
		data: Bundle | null;
		code: number;
	}

	interface MediaControllerSearchRequestReplyCallback {
		onreply(reply: RequestReply | null): void;
	}

	interface MediaControllerSearchRequestCallback {
		onrequest(clientName: ApplicationId, request: Array<SearchFilter>): RequestReply | null;
	}

	interface MediaControllerReceiveCommandCallback {
		onsuccess(senderAppName: ApplicationId, command: string, data: object): RequestReply | null;
	}

	interface MediaControllerEnabledChangeRequestCallback {
		onreply(clientName: ApplicationId, enabled: boolean): RequestReply | null;
	}

	interface MediaControllerEnabledChangeCallback {
		onchange(enabled: boolean): void;
	}

	interface MediaControllerDisplayModeChangeRequestCallback {
		onreply(clientName: ApplicationId, mode: MediaControllerDisplayModeType): RequestReply | null;
	}

	interface MediaControllerDisplayModeChangeCallback {
		onchange(mode: MediaControllerDisplayModeType): void;
	}

	interface MediaControllerDisplayRotationChangeRequestCallback {
		onreply(clientName: ApplicationId, displayRotation: MediaControllerDisplayRotationType): RequestReply | null;
	}

	interface MediaControllerDisplayRotationChangeCallback {
		onchange(displayRotation: MediaControllerDisplayRotationType): void;
	}

	interface MediaControllerServerStatusChangeCallback {
		onsuccess(status: MediaControllerServerState): void;
	}

	interface MediaControllerPlaybackInfoChangeCallback {
		onplaybackchanged(state: MediaControllerPlaybackState, position: number): void;
		onshufflemodechanged(mode: boolean): void;
		onrepeatstatechanged(state: MediaControllerRepeatState): void;
		onmetadatachanged(metadata: MediaControllerMetadata): void;
	}

	interface MediaControllerChangeRequestPlaybackInfoCallback {
		onplaybackstaterequest(state: MediaControllerPlaybackState, clientName: ApplicationId): void;
		onplaybackpositionrequest(position: number, clientName: ApplicationId): void;
		onshufflemoderequest(mode: boolean, clientName: ApplicationId): void;
		onrepeatstaterequest(state: MediaControllerRepeatState, clientName: ApplicationId): void;
		onplaybackitemrequest(
			playlistName: string,
			index: string,
			state: MediaControllerPlaybackState,
			position: number,
			clientName: ApplicationId,
		): void;
	}

	interface MediaControllerGetAllPlaylistsSuccessCallback {
		onsuccess(playlists: Array<MediaControllerPlaylist>): void;
	}

	interface MediaControllerPlaylistUpdatedCallback {
		onplaylistupdated(serverName: string, playlist: MediaControllerPlaylist): void;
		onplaylistdeleted(serverName: string, playlistName: string): void;
	}

	interface MediaControllerGetItemsSuccessCallback {
		onsuccess(items: Array<MediaControllerPlaylistItem>): void;
	}

	interface MediaControllerAbilityChangeCallback {
		onplaybackabilitychanged(server: MediaControllerServerInfo, abilities: MediaControllerPlaybackAbilitiesInfo): void;
		ondisplaymodeabilitychanged(
			server: MediaControllerServerInfo,
			abilities: MediaControllerDisplayModeAbilitiesInfo,
		): void;
		ondisplayrotationabilitychanged(
			server: MediaControllerServerInfo,
			abilities: MediaControllerDisplayRotationAbilitiesInfo,
		): void;
		onsimpleabilitychanged(
			server: MediaControllerServerInfo,
			type: MediaControllerSimpleAbility,
			support: MediaControllerAbilitySupport,
		): void;
	}
}
