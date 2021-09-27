export {};
declare global {
	type MediaControllerServerState = 'ACTIVE' | 'INACTIVE';
	type MediaControllerSearchCategory = 'NO_CATEGORY' | 'TITLE' | 'ARTIST' | 'ALBUM' | 'GENRE' | 'TPO';
	type MediaControllerPlaybackState = 'PLAY' | 'PAUSE' | 'STOP' | 'NEXT' | 'PREV' | 'FORWARD' | 'REWIND';
	type MediaControllerPlaybackAction =
		| 'PLAY'
		| 'PAUSE'
		| 'STOP'
		| 'NEXT'
		| 'PREV'
		| 'FORWARD'
		| 'REWIND'
		| 'TOGGLE_PLAY_PAUSE';
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
		playback: MediaControllerServerPlaybackInfo;
		playlists: MediaControllerPlaylists;
		iconURI: string | null;
		abilities: MediaControllerAbilities;
		subtitles: MediaControllerSubtitles;
		mode360: MediaControllerMode360;
		displayMode: MediaControllerDisplayMode;
		displayRotation: MediaControllerDisplayRotation;
		getAllClientsInfo(): Array<MediaControllerClientInfo>;
		setSearchRequestListener(listener: MediaControllerSearchRequestCallback): void;
		unsetSearchRequestListener(): void;
		addCommandListener(listener: MediaControllerReceiveCommandCallback): number;
		removeCommandListener(watchId: number): void;
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
		playback: MediaControllerServerInfoPlaybackInfo;
		playlists: MediaControllerPlaylistsInfo;
		iconURI: string | null;
		abilities: MediaControllerAbilitiesInfo;
		subtitles: MediaControllerSubtitlesInfo;
		mode360: MediaControllerMode360Info;
		displayMode: MediaControllerDisplayModeInfo;
		displayRotation: MediaControllerDisplayRotationInfo;
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
	}

	interface MediaControllerServerPlaybackInfo {
		state: MediaControllerPlaybackState;
		position: number;
		ageRating: MediaControllerContentAgeRating;
		contentType: MediaControllerContentType;
		shuffleMode: boolean;
		repeatState: MediaControllerRepeatState;
		metadata: MediaControllerMetadata;
		index: string | null;
		playlistName: string | null;
		updatePlaybackItem(playlistName: string, index: string): void;
		addChangeRequestListener(listener: MediaControllerChangeRequestPlaybackInfoCallback): number;
		removeChangeRequestListener(watchId: number): void;
	}

	interface MediaControllerServerInfoPlaybackInfo {
		state: MediaControllerPlaybackState;
		position: number;
		ageRating: MediaControllerContentAgeRating;
		contentType: MediaControllerContentType;
		shuffleMode: boolean;
		repeatState: MediaControllerRepeatState;
		metadata: MediaControllerMetadata;
		index: string | null;
		playlistName: string | null;
		sendPlaybackAction(
			action: MediaControllerPlaybackAction,
			replyCallback?: MediaControllerSendCommandSuccessCallback | null,
		): void;
		sendPlaybackPosition(position: number, replyCallback?: MediaControllerSendCommandSuccessCallback | null): void;
		sendShuffleMode(mode: boolean, replyCallback?: MediaControllerSendCommandSuccessCallback | null): void;
		sendRepeatState(
			state: MediaControllerRepeatState,
			replyCallback?: MediaControllerSendCommandSuccessCallback | null,
		): void;
		addPlaybackInfoChangeListener(listener: MediaControllerPlaybackInfoChangeCallback): number;
		removePlaybackInfoChangeListener(watchId: number): void;
	}

	interface MediaControllerPlaylists {
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
		getAllPlaylists(
			successCallback: MediaControllerGetAllPlaylistsSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getPlaylist(playlistName: string): MediaControllerPlaylist;
	}

	interface MediaControllerPlaylistsInfo {
		getAllPlaylists(
			successCallback: MediaControllerGetAllPlaylistsSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		sendPlaybackItem(
			playlistName: string,
			index: string,
			action: MediaControllerPlaybackAction,
			position: number,
			replyCallback?: MediaControllerSendCommandSuccessCallback | null,
		): void;
		addPlaylistUpdatedListener(listener: MediaControllerPlaylistUpdatedCallback): number;
		removePlaylistUpdatedListener(listenerId: number): void;
		getPlaylist(playlistName: string): MediaControllerPlaylist;
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
		save(): void;
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
		onplaybackactionrequest(action: MediaControllerPlaybackAction, clientName: ApplicationId): RequestReply | null;
		onplaybackpositionrequest(position: number, clientName: ApplicationId): RequestReply | null;
		onshufflemoderequest(mode: boolean, clientName: ApplicationId): RequestReply | null;
		onrepeatstaterequest(state: MediaControllerRepeatState, clientName: ApplicationId): RequestReply | null;
		onplaybackitemrequest(
			playlistName: string,
			index: string,
			action: MediaControllerPlaybackAction,
			position: number,
			clientName: ApplicationId,
		): RequestReply | null;
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
