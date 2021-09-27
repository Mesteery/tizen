export {};
declare global {
	type MetadataType =
		| 'ALBUM'
		| 'ALBUM_ARTIST'
		| 'ALTITUDE'
		| 'ARTIST'
		| 'AUDIO_BITPERSAMPLE'
		| 'AUDIO_BITRATE'
		| 'AUDIO_CHANNELS'
		| 'AUDIO_CODEC'
		| 'AUDIO_SAMPLERATE'
		| 'CLASSIFICATION'
		| 'COMMENT'
		| 'COMPOSER'
		| 'CONDUCTOR'
		| 'COPYRIGHT'
		| 'DATE'
		| 'DESCRIPTION'
		| 'DURATION'
		| 'GENRE'
		| 'HAS_AUDIO'
		| 'HAS_VIDEO'
		| 'LATITUDE'
		| 'LONGITUDE'
		| 'MODE_360'
		| 'RATING'
		| 'RECDATE'
		| 'ROTATE'
		| 'SYNCLYRICS_NUM'
		| 'TITLE'
		| 'TRACK_NUM'
		| 'UNSYNCLYRICS'
		| 'VIDEO_BITRATE'
		| 'VIDEO_CODEC'
		| 'VIDEO_FPS'
		| 'VIDEO_HEIGHT'
		| 'VIDEO_WIDTH';
	interface MetadataObject {
		metadata: MetadataManager;
	}

	interface MetadataManager {
		createFileHandle(path: Path): MetadataFileHandle;
	}

	interface MetadataFileHandle {
		uri: string;
		get(type: MetadataType): string;
		release(): void;
	}
}
