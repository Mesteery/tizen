export {};
declare global {
	type NotificationId = string;
	type NotificationType = 'STATUS';
	type UserNotificationType = 'SIMPLE' | 'THUMBNAIL' | 'ONGOING' | 'PROGRESS';
	type NotificationProgressType = 'PERCENTAGE' | 'BYTE';
	interface UserNotificationInit {
		content?: string | null;
		textContents?: NotificationTextContentInfo | null;
		images?: NotificationImageInfo | null;
		thumbnails?: NotificationThumbnailInfo | null;
		actions?: NotificationActionInfo | null;
		groupContents?: NotificationGroupContentInfo | null;
		leds?: NotificationLedInfo | null;
	}

	interface NotificationTextContentInfo {
		progressType?: NotificationProgressType | null;
		progressValue?: number | null;
		eventsNumber?: number | null;
		detailInfo?: Array<NotificationDetailInfo> | null;
		buttonsTexts?: Array<string> | null;
		contentForOff?: string | null;
	}

	interface NotificationImageInfo {
		iconPath?: string | null;
		subIconPath?: string | null;
		indicatorIconPath?: string | null;
		lockScreenIconPath?: string | null;
		buttonIconPaths?: Array<string> | null;
		backgroundImagePath?: string | null;
	}

	interface NotificationThumbnailInfo {
		lockScreenThumbnailIconPath?: string | null;
		thumbnailIconPath?: string | null;
		thumbnails?: Array<string> | null;
	}

	interface NotificationActionInfo {
		soundPath?: string | null;
		vibration?: boolean | null;
		appControl?: ApplicationControl | null;
		appId?: ApplicationId | null;
	}

	interface NotificationGroupContentInfo {
		groupTitle?: string | null;
		groupContent?: string | null;
		groupContentForOff?: string | null;
	}

	interface NotificationLedInfo {
		ledColor?: string | null;
		ledOnPeriod?: number;
		ledOffPeriod?: number;
	}

	interface NotificationObject {
		notification: NotificationManager;
	}

	interface NotificationManager {
		post(notification: Notification): void;
		update(notification: Notification): void;
		remove(id: NotificationId): void;
		removeAll(): void;
		getNotification(id: NotificationId): Notification;
		getAllNotifications(): Array<Notification>;
		saveNotificationAsTemplate(name: string, notification: Notification): void;
		createNotificationFromTemplate(name: string): UserNotification;
	}

	interface Notification {
		id: NotificationId;
		type: NotificationType;
		postedTime: Date;
		title: string;
		content: string | null;
	}

	class UserNotification {
		constructor();
		userType: UserNotificationType;
		textContents: NotificationTextContentInfo | null;
		images: NotificationImageInfo | null;
		thumbnails: NotificationThumbnailInfo | null;
		actions: NotificationActionInfo | null;
		groupContents: NotificationGroupContentInfo | null;
		leds: NotificationLedInfo | null;
	}

	class NotificationDetailInfo {
		constructor();
		mainText: string;
		subText: string | null;
	}
}
