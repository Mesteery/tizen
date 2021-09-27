export {};
declare global {
	type Path = string;
	type FileMode = 'a' | 'r' | 'rw' | 'rwo' | 'w';
	type FileSystemStorageType = 'INTERNAL' | 'EXTERNAL';
	type FileSystemStorageState = 'MOUNTED' | 'REMOVED' | 'UNMOUNTABLE';
	type BaseSeekPosition = 'BEGIN' | 'CURRENT' | 'END';
	interface FileFilter {
		name?: string;
		isFile?: boolean;
		isDirectory?: boolean;
		startModified?: Date;
		endModified?: Date;
		startCreated?: Date;
		endCreated?: Date;
	}

	interface FileSystemManagerObject {
		filesystem: FileSystemManager;
	}
	interface Tizen extends FileSystemManagerObject {}

	interface FileSystemManager {
		maxNameLength: number;
		maxPathLength: number;
		openFile(path: Path, openMode: FileMode, makeParents?: boolean): FileHandle;
		createDirectory(
			path: Path,
			makeParents?: boolean,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		deleteFile(path: Path, successCallback?: PathSuccessCallback | null, errorCallback?: ErrorCallback | null): void;
		deleteDirectory(
			path: Path,
			recursive?: boolean,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		copyFile(
			sourcePath: Path,
			destinationPath: Path,
			overwrite?: boolean,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		copyDirectory(
			sourcePath: Path,
			destinationPath: Path,
			overwrite?: boolean,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		moveFile(
			sourcePath: Path,
			destinationPath: Path,
			overwrite?: boolean,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		moveDirectory(
			sourcePath: Path,
			destinationPath: Path,
			overwrite?: boolean,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		rename(
			path: Path,
			newName: string,
			successCallback?: PathSuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		listDirectory(
			path: Path,
			successCallback: ListDirectorySuccessCallback,
			errorCallback?: ErrorCallback | null,
			filter?: FileFilter | null,
		): void;
		toURI(path: Path): string;
		isFile(path: Path): boolean;
		isDirectory(path: Path): boolean;
		pathExists(path: Path): boolean;
		getDirName(path: string): string;
		getStorage(label: string, onsuccess: FileSystemStorageSuccessCallback, onerror?: ErrorCallback | null): void;
		listStorages(onsuccess: FileSystemStorageArraySuccessCallback, onerror?: ErrorCallback | null): void;
		addStorageStateChangeListener(onsuccess: FileSystemStorageSuccessCallback, onerror?: ErrorCallback | null): number;
		removeStorageStateChangeListener(watchId: number): void;
	}

	interface FileSystemStorage {
		label: string;
		type: FileSystemStorageType;
		state: FileSystemStorageState;
	}

	interface FileHandle {
		path: Path;
		seek(offset: number, whence?: BaseSeekPosition): number;
		seekNonBlocking(
			offset: number,
			onsuccess?: SeekSuccessCallback | null,
			onerror?: ErrorCallback | null,
			whence?: BaseSeekPosition,
		): void;
		readString(count?: number | null, inputEncoding?: string): string;
		readStringNonBlocking(
			onsuccess?: ReadStringSuccessCallback | null,
			onerror?: ErrorCallback | null,
			count?: number,
			inputEncoding?: string,
		): void;
		writeString(inputString: string, outputEncoding?: string): number;
		writeStringNonBlocking(
			inputString: string,
			onsuccess?: WriteStringSuccessCallback | null,
			onerror?: ErrorCallback | null,
			outputEncoding?: string,
		): void;
		readBlob(size?: number): Blob;
		readBlobNonBlocking(
			onsuccess?: ReadBlobSuccessCallback | null,
			onerror?: ErrorCallback | null,
			size?: number | null,
		): void;
		writeBlob(blob: Blob): void;
		writeBlobNonBlocking(blob: Blob, onsuccess?: SuccessCallback | null, onerror?: ErrorCallback | null): void;
		readData(size?: number): Uint8Array;
		readDataNonBlocking(
			onsuccess?: ReadDataSuccessCallback | null,
			onerror?: ErrorCallback | null,
			size?: number | null,
		): void;
		writeData(data: Uint8Array): void;
		writeDataNonBlocking(data: Uint8Array, onsuccess?: SuccessCallback | null, onerror?: ErrorCallback | null): void;
		flush(): void;
		flushNonBlocking(onsuccess?: SuccessCallback | null, onerror?: ErrorCallback | null): void;
		sync(): void;
		syncNonBlocking(onsuccess?: SuccessCallback | null, onerror?: ErrorCallback | null): void;
		close(): void;
		closeNonBlocking(onsuccess?: SuccessCallback | null, onerror?: ErrorCallback | null): void;
	}

	interface FileSystemStorageArraySuccessCallback {
		onsuccess(storages: Array<FileSystemStorage>): void;
	}

	interface FileSystemStorageSuccessCallback {
		onsuccess(storage: FileSystemStorage): void;
	}

	interface PathSuccessCallback {
		onsuccess(path: Path): void;
	}

	interface SeekSuccessCallback {
		onsuccess(position: number): void;
	}

	interface ReadStringSuccessCallback {
		onsuccess(string: string): void;
	}

	interface WriteStringSuccessCallback {
		onsuccess(bytesCount: number): void;
	}

	interface ReadBlobSuccessCallback {
		onsuccess(blob: Blob): void;
	}

	interface ReadDataSuccessCallback {
		onsuccess(data: Uint8Array): void;
	}

	interface ListDirectorySuccessCallback {
		onsuccess(names: Array<string>, path: Path): void;
	}
}
