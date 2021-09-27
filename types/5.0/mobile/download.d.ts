export {};
declare global {
	type DownloadHTTPHeaderFields = object;
	type DownloadState = 'QUEUED' | 'DOWNLOADING' | 'PAUSED' | 'CANCELED' | 'COMPLETED' | 'FAILED';
	type DownloadNetworkType = 'CELLULAR' | 'WIFI' | 'ALL';
	interface DownloadManagerObject {
		download: DownloadManager;
	}
	interface Tizen extends DownloadManagerObject {}

	class DownloadRequest {
		constructor();
		url: string;
		destination: string | null;
		fileName: string | null;
		networkType: DownloadNetworkType | null;
		httpHeader: DownloadHTTPHeaderFields | null;
	}

	interface DownloadManager {
		start(downloadRequest: DownloadRequest, downloadCallback?: DownloadCallback | null): number;
		cancel(downloadId: number): void;
		pause(downloadId: number): void;
		resume(downloadId: number): void;
		getState(downloadId: number): DownloadState;
		getDownloadRequest(downloadId: number): DownloadRequest;
		getMIMEType(downloadId: number): string;
		setListener(downloadId: number, downloadCallback: DownloadCallback): void;
	}

	interface DownloadCallback {
		onprogress(downloadId: number, receivedSize: number, totalSize: number): void;
		onpaused(downloadId: number): void;
		oncanceled(downloadId: number): void;
		oncompleted(downloadId: number, path: string): void;
		onfailed(downloadId: number, error: WebAPIError): void;
	}
}
