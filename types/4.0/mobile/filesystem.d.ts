export {};
declare global {
	type FileMode = 'a' | 'r' | 'rw' | 'w';
	type FileSystemStorageType = 'INTERNAL' | 'EXTERNAL';
	type FileSystemStorageState = 'MOUNTED' | 'REMOVED' | 'UNMOUNTABLE';
	interface FileFilter {
		name?: string;
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
		maxPathLength: number;
		resolve(
			location: string,
			onsuccess: FileSuccessCallback,
			onerror?: ErrorCallback | null,
			mode?: FileMode | null,
		): void;
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

	interface File {
		parent: File | null;
		readOnly: boolean;
		isFile: boolean;
		isDirectory: boolean;
		created: Date | null;
		modified: Date | null;
		path: string;
		name: string;
		fullPath: string;
		fileSize: number;
		length: number;
		toURI(): string;
		listFiles(onsuccess: FileArraySuccessCallback, onerror?: ErrorCallback | null, filter?: FileFilter | null): void;
		openStream(
			mode: FileMode,
			onsuccess: FileStreamSuccessCallback,
			onerror?: ErrorCallback | null,
			encoding?: string | null,
		): void;
		readAsText(onsuccess: FileStringSuccessCallback, onerror?: ErrorCallback | null, encoding?: string | null): void;
		copyTo(
			originFilePath: string,
			destinationFilePath: string,
			overwrite: boolean,
			onsuccess?: SuccessCallback | null,
			onerror?: ErrorCallback | null,
		): void;
		moveTo(
			originFilePath: string,
			destinationFilePath: string,
			overwrite: boolean,
			onsuccess?: SuccessCallback | null,
			onerror?: ErrorCallback | null,
		): void;
		createDirectory(dirPath: string): File;
		createFile(relativeFilePath: string): File;
		resolve(filePath: string): File;
		deleteDirectory(
			directoryPath: string,
			recursive: boolean,
			onsuccess?: SuccessCallback | null,
			onerror?: ErrorCallback | null,
		): void;
		deleteFile(filePath: string, onsuccess?: SuccessCallback | null, onerror?: ErrorCallback | null): void;
	}

	interface FileStream {
		eof: boolean;
		position: number;
		bytesAvailable: number;
		close(): void;
		read(charCount: number): string;
		readBytes(byteCount: number): Array<number>;
		readBase64(byteCount: number): string;
		write(stringData: string): void;
		writeBytes(byteData: Array<number>): void;
		writeBase64(base64Data: string): void;
	}

	interface FileSuccessCallback {
		onsuccess(file: File): void;
	}

	interface FileSystemStorageArraySuccessCallback {
		onsuccess(storages: Array<FileSystemStorage>): void;
	}

	interface FileSystemStorageSuccessCallback {
		onsuccess(storage: FileSystemStorage): void;
	}

	interface FileStringSuccessCallback {
		onsuccess(fileStr: string): void;
	}

	interface FileStreamSuccessCallback {
		onsuccess(filestream: FileStream): void;
	}

	interface FileArraySuccessCallback {
		onsuccess(files: Array<File>): void;
	}
}
