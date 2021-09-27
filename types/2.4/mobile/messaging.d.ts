export {};
declare global {
	type MessageId = string;
	type MessageAttachmentId = string;
	type MessageConvId = string;
	type MessageFolderId = string;
	type MessageServiceTag = 'messaging.sms' | 'messaging.mms' | 'messaging.email';
	interface MessageInit {
		subject?: string;
		to?: Array<string>;
		cc?: Array<string>;
		bcc?: Array<string>;
		plainBody?: string;
		htmlBody?: string;
		isHighPriority?: boolean;
	}

	interface MessageManagerObject {
		messaging: Messaging;
	}
	interface Tizen extends MessageManagerObject {}

	class Message {
		constructor();
		id: MessageId | null;
		conversationId: MessageConvId | null;
		folderId: MessageFolderId | null;
		type: MessageServiceTag;
		timestamp: Date | null;
		from: string | null;
		to: Array<string>;
		cc: Array<string>;
		bcc: Array<string>;
		body: MessageBody;
		isRead: boolean;
		hasAttachment: boolean;
		isHighPriority: boolean;
		subject: string;
		inResponseTo: MessageId | null;
		messageStatus: string;
		attachments: Array<MessageAttachment>;
	}

	interface MessageBody {
		messageId: MessageId;
		loaded: boolean;
		plainBody: string;
		htmlBody: string;
		inlineAttachments: Array<MessageAttachment>;
	}

	class MessageAttachment {
		constructor();
		id: MessageAttachmentId | null;
		messageId: MessageId | null;
		mimeType: string | null;
		filePath: string | null;
	}

	interface Messaging {
		getMessageServices(
			messageServiceType: MessageServiceTag,
			successCallback: MessageServiceArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface MessageServiceArraySuccessCallback {
		onsuccess(services: Array<MessageService>): void;
	}

	interface MessageService {
		id: string;
		type: MessageServiceTag;
		name: string;
		messageStorage: MessageStorage;
		sendMessage(
			message: Message,
			successCallback?: MessageRecipientsCallback | null,
			errorCallback?: ErrorCallback | null,
			simIndex?: number | null,
		): void;
		loadMessageBody(
			message: Message,
			successCallback: MessageBodySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		loadMessageAttachment(
			attachment: MessageAttachment,
			successCallback: MessageAttachmentSuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		sync(successCallback?: SuccessCallback | null, errorCallback?: ErrorCallback | null, limit?: number | null): number;
		syncFolder(
			folder: MessageFolder,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			limit?: number | null,
		): number;
		stopSync(opId: number): void;
	}

	interface MessageRecipientsCallback {
		onsuccess(recipients: Array<string>): void;
	}

	interface MessageBodySuccessCallback {
		onsuccess(message: Message): void;
	}

	interface MessageAttachmentSuccessCallback {
		onsuccess(attachment: MessageAttachment): void;
	}

	interface MessageStorage {
		addDraftMessage(
			message: Message,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		findMessages(
			filter: AbstractFilter,
			successCallback: MessageArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			sort?: SortMode | null,
			limit?: number | null,
			offset?: number | null,
		): void;
		removeMessages(
			messages: Array<Message>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		updateMessages(
			messages: Array<Message>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		findConversations(
			filter: AbstractFilter,
			successCallback: MessageConversationArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			sort?: SortMode | null,
			limit?: number | null,
			offset?: number | null,
		): void;
		removeConversations(
			conversations: Array<MessageConversation>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		findFolders(
			filter: AbstractFilter,
			successCallback: MessageFolderArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		addMessagesChangeListener(messagesChangeCallback: MessagesChangeCallback, filter?: AbstractFilter | null): number;
		addConversationsChangeListener(
			conversationsChangeCallback: MessageConversationsChangeCallback,
			filter?: AbstractFilter | null,
		): number;
		addFoldersChangeListener(
			foldersChangeCallback: MessageFoldersChangeCallback,
			filter?: AbstractFilter | null,
		): number;
		removeChangeListener(watchId: number): void;
	}

	interface MessageArraySuccessCallback {
		onsuccess(messages: Array<Message>): void;
	}

	interface MessageConversationArraySuccessCallback {
		onsuccess(conversations: Array<MessageConversation>): void;
	}

	interface MessageFolderArraySuccessCallback {
		onsuccess(folders: Array<MessageFolder>): void;
	}

	interface MessagesChangeCallback {
		messagesadded(addedMessages: Array<Message>): void;
		messagesupdated(updatedMessages: Array<Message>): void;
		messagesremoved(removedMessages: Array<Message>): void;
	}

	interface MessageConversationsChangeCallback {
		conversationsadded(addedConversations: Array<MessageConversation>): void;
		conversationsupdated(updatedConversations: Array<MessageConversation>): void;
		conversationsremoved(removedConversations: Array<MessageConversation>): void;
	}

	interface MessageFoldersChangeCallback {
		foldersadded(addedFolders: Array<MessageFolder>): void;
		foldersupdated(updatedFolders: Array<MessageFolder>): void;
		foldersremoved(removedFolders: Array<MessageFolder>): void;
	}

	interface MessageConversation {
		id: MessageConvId;
		type: MessageServiceTag;
		timestamp: Date;
		messageCount: number;
		unreadMessages: number;
		preview: string;
		subject: string;
		isRead: boolean;
		from: string;
		to: Array<string>;
		cc: Array<string>;
		bcc: Array<string>;
		lastMessageId: MessageId;
	}

	interface MessageFolder {
		id: MessageFolderId;
		parentId: MessageFolderId;
		serviceId: string;
		contentType: MessageServiceTag;
		name: string;
		path: string;
		type: string;
		synchronizable: boolean;
	}
}
