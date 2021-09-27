export {};
declare global {
	type NotificationId = string;
	type NotificationType = 'STATUS';
	type StatusNotificationType = 'SIMPLE' | 'THUMBNAIL' | 'ONGOING' | 'PROGRESS';
	type NotificationProgressType = 'PERCENTAGE' | 'BYTE';
	type LEDCustomFlags = 'LED_CUSTOM_DUTY_ON' | 'LED_CUSTOM_DEFAULT';
	interface StatusNotificationInit {
		content?: string | null;
		iconPath?: string | null;
		soundPath?: string | null;
		vibration?: boolean | null;
		appControl?: ApplicationControl | null;
		appId?: ApplicationId | null;
		progressType?: NotificationProgressType | null;
		progressValue?: number | null;
		number?: number | null;
		subIconPath?: string | null;
		detailInfo?: Array<NotificationDetailInfo> | null;
		ledColor?: string | null;
		ledOnPeriod?: number;
		ledOffPeriod?: number;
		backgroundImagePath?: string | null;
		thumbnails?: Array<string> | null;
	}

	interface NotificationObject {
		notification: NotificationManager;
	}

	interface NotificationManager {
		post(notification: Notification): void;
		update(notification: Notification): void;
		remove(id: NotificationId): void;
		removeAll(): void;
		get(id: NotificationId): Notification;
		getAll(): Array<Notification>;
		playLEDCustomEffect(timeOn: number, timeOff: number, color: string, flags: Array<LEDCustomFlags>): void;
		stopLEDCustomEffect(): void;
	}

	interface Notification {
		id: NotificationId;
		type: NotificationType;
		postedTime: Date;
		title: string;
		content: string | null;
	}

	class StatusNotification {
		constructor();
		statusType: StatusNotificationType;
		iconPath: string | null;
		subIconPath: string | null;
		number: number | null;
		detailInfo: Array<NotificationDetailInfo> | null;
		ledColor: string | null;
		ledOnPeriod: number;
		ledOffPeriod: number;
		backgroundImagePath: string | null;
		thumbnails: Array<string> | null;
		soundPath: string | null;
		vibration: boolean;
		appControl: ApplicationControl | null;
		appId: ApplicationId | null;
		progressType: NotificationProgressType;
		progressValue: number | null;
	}

	class NotificationDetailInfo {
		constructor();
		mainText: string;
		subText: string | null;
	}
}
