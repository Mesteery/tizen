export {};
declare global {
	type ContentId = string;
	type ContentDirectoryId = string;
	type PlaylistId = string;
	type ContentDirectoryStorageType = 'INTERNAL' | 'EXTERNAL';
	type ContentType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';
	type AudioContentLyricsType = 'SYNCHRONIZED' | 'UNSYNCHRONIZED';
	type ImageContentOrientation =
		| 'NORMAL'
		| 'FLIP_HORIZONTAL'
		| 'ROTATE_180'
		| 'FLIP_VERTICAL'
		| 'TRANSPOSE'
		| 'ROTATE_90'
		| 'TRANSVERSE'
		| 'ROTATE_270';
	interface ContentManagerObject {
		content: ContentManager;
	}
	interface Tizen extends ContentManagerObject {}

	interface ContentManager {
		update(content: Content): void;
		updateBatch(
			contents: Array<Content>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		getDirectories(successCallback: ContentDirectoryArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
		find(
			successCallback: ContentArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			directoryId?: ContentDirectoryId | null,
			filter?: AbstractFilter | null,
			sortMode?: SortMode | null,
			count?: number | null,
			offset?: number | null,
		): void;
		scanFile(
			contentURI: string,
			successCallback?: ContentScanSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		scanDirectory(
			contentDirURI: string,
			recursive: boolean,
			successCallback?: ContentScanSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		cancelScanDirectory(contentDirURI: string): void;
		addChangeListener(changeCallback: ContentChangeCallback): number;
		removeChangeListener(listenerId: number): void;
		getPlaylists(successCallback: PlaylistArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
		createPlaylist(
			name: string,
			successCallback: PlaylistSuccessCallback,
			errorCallback?: ErrorCallback | null,
			sourcePlaylist?: Playlist | null,
		): void;
		removePlaylist(
			id: PlaylistId,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		createThumbnail(
			content: Content,
			successCallback: ThumbnailSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface ContentArraySuccessCallback {
		onsuccess(contents: Array<Content>): void;
	}

	interface ContentDirectoryArraySuccessCallback {
		onsuccess(directories: Array<ContentDirectory>): void;
	}

	interface ContentScanSuccessCallback {
		onsuccess(uri: string): void;
	}

	interface ContentChangeCallback {
		oncontentadded(content: Content): void;
		oncontentupdated(content: Content): void;
		oncontentremoved(id: ContentId): void;
		oncontentdiradded(contentDir: ContentDirectory): void;
		oncontentdirupdated(contentDir: ContentDirectory): void;
		oncontentdirremoved(id: ContentDirectoryId): void;
	}

	interface ContentDirectory {
		id: ContentDirectoryId;
		directoryURI: string;
		title: string;
		storageType: ContentDirectoryStorageType;
		modifiedDate: Date | null;
	}

	interface Content {
		editableAttributes: Array<string>;
		id: ContentId;
		name: string;
		type: ContentType;
		mimeType: string;
		title: string;
		contentURI: string;
		thumbnailURIs: Array<string> | null;
		releaseDate: Date | null;
		modifiedDate: Date | null;
		size: number;
		description: string | null;
		rating: number;
		isFavorite: boolean;
	}

	interface VideoContent {
		geolocation: SimpleCoordinates | null;
		album: string | null;
		artists: Array<string> | null;
		duration: number;
		width: number;
		height: number;
	}

	interface AudioContentLyrics {
		type: AudioContentLyricsType;
		timestamps: Array<number>;
		texts: Array<string>;
	}

	interface AudioContent {
		album: string | null;
		genres: Array<string> | null;
		artists: Array<string> | null;
		composers: Array<string> | null;
		lyrics: AudioContentLyrics | null;
		copyright: string | null;
		bitrate: number;
		trackNumber: number | null;
		duration: number;
	}

	interface ImageContent {
		geolocation: SimpleCoordinates | null;
		width: number;
		height: number;
		orientation: ImageContentOrientation;
	}

	interface PlaylistItem {
		content: Content;
	}

	interface Playlist {
		id: PlaylistId;
		name: string;
		numberOfTracks: number;
		thumbnailURI: string | null;
		add(item: Content): void;
		addBatch(
			items: Array<Content>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		remove(item: PlaylistItem): void;
		removeBatch(
			items: Array<PlaylistItem>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		get(
			successCallback: PlaylistItemArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			count?: number | null,
			offset?: number | null,
		): void;
		setOrder(
			items: Array<PlaylistItem>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		move(
			item: PlaylistItem,
			delta: number,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface PlaylistArraySuccessCallback {
		onsuccess(playlists: Array<Playlist>): void;
	}

	interface PlaylistSuccessCallback {
		onsuccess(playlist: Playlist): void;
	}

	interface PlaylistItemArraySuccessCallback {
		onsuccess(items: Array<PlaylistItem>): void;
	}

	interface ThumbnailSuccessCallback {
		onsuccess(path: string): void;
	}
}
