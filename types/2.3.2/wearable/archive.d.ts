export {};
declare global {
	type FileReference = string | File;
	type ArchiveCompressionLevel = 'STORE' | 'FAST' | 'NORMAL' | 'BEST';
	interface ArchiveFileOptions {
		overwrite?: boolean;
	}

	interface ArchiveFileEntryOptions {
		destination?: string;
		stripSourceDirectory?: boolean;
		compressionLevel?: ArchiveCompressionLevel;
	}

	interface ArchiveManagerObject {
		archive: ArchiveManager;
	}
	interface Tizen extends ArchiveManagerObject {}

	interface ArchiveManager {
		open(
			file: FileReference,
			mode: FileMode,
			onsuccess: ArchiveFileSuccessCallback,
			onerror?: ErrorCallback | null,
			options?: ArchiveFileOptions | null,
		): number;
		abort(operationIdentifier: number): void;
	}

	interface ArchiveFile {
		mode: FileMode;
		decompressedSize: number | null;
		add(
			sourceFile: FileReference,
			onsuccess?: SuccessCallback | null,
			onerror?: ErrorCallback | null,
			onprogress?: ArchiveFileProgressCallback | null,
			options?: ArchiveFileEntryOptions | null,
		): number;
		extractAll(
			destinationDirectory: FileReference,
			onsuccess?: SuccessCallback | null,
			onerror?: ErrorCallback | null,
			onprogress?: ArchiveFileProgressCallback | null,
			overwrite?: boolean | null,
		): number;
		getEntries(onsuccess: ArchiveFileEntryArraySuccessCallback, onerror?: ErrorCallback | null): number;
		getEntryByName(name: string, onsuccess: ArchiveFileEntrySuccessCallback, onerror?: ErrorCallback | null): number;
		close(): void;
	}

	interface ArchiveFileEntry {
		name: string;
		size: number;
		compressedSize: number | null;
		modified: Date;
		extract(
			destinationDirectory: FileReference,
			onsuccess?: SuccessCallback | null,
			onerror?: ErrorCallback | null,
			onprogress?: ArchiveFileProgressCallback | null,
			stripName?: boolean | null,
			overwrite?: boolean | null,
		): number;
	}

	interface ArchiveFileSuccessCallback {
		onsuccess(archive: ArchiveFile): void;
	}

	interface ArchiveFileEntrySuccessCallback {
		onsuccess(entry: ArchiveFileEntry): void;
	}

	interface ArchiveFileEntryArraySuccessCallback {
		onsuccess(entries: Array<ArchiveFileEntry>): void;
	}

	interface ArchiveFileProgressCallback {
		onprogress(operationIdentifier: number, value: number, filename: string): void;
	}
}
