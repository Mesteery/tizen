export {};
declare global {
	type CalendarId = string;
	type CalendarTaskId = string;
	type CalendarItemId = CalendarEventId | CalendarTaskId;
	type CalendarType = 'EVENT' | 'TASK';
	type CalendarTextFormat = 'ICALENDAR_20' | 'VCALENDAR_10';
	type AlarmMethod = 'SOUND' | 'DISPLAY';
	type RecurrenceRuleFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
	type ByDayValue = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
	type EventAvailability = 'BUSY' | 'FREE';
	type AttendeeType = 'INDIVIDUAL' | 'GROUP' | 'RESOURCE' | 'ROOM' | 'UNKNOWN';
	type AttendeeStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' | 'DELEGATED' | 'COMPLETED' | 'IN_PROCESS';
	type AttendeeRole = 'REQ_PARTICIPANT' | 'OPT_PARTICIPANT' | 'NON_PARTICIPANT' | 'CHAIR';
	type CalendarItemPriority = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
	type CalendarItemVisibility = 'PUBLIC' | 'PRIVATE' | 'CONFIDENTIAL';
	type CalendarItemStatus =
		| 'NONE'
		| 'TENTATIVE'
		| 'CONFIRMED'
		| 'CANCELLED'
		| 'NEEDS_ACTION'
		| 'IN_PROCESS'
		| 'COMPLETED';
	interface CalendarItemInit {
		description?: string;
		summary?: string;
		isAllDay?: boolean;
		startDate?: TZDate;
		duration?: TimeDuration;
		location?: string;
		geolocation?: SimpleCoordinates;
		organizer?: string;
		visibility?: CalendarItemVisibility;
		status?: CalendarItemStatus;
		priority?: CalendarItemPriority;
		alarms?: Array<CalendarAlarm>;
		categories?: Array<string>;
		attendees?: Array<CalendarAttendee>;
	}

	interface CalendarTaskInit {
		dueDate?: TZDate;
		completedDate?: TZDate;
		progress?: number;
	}

	interface CalendarEventInit {
		endDate?: TZDate;
		availability?: EventAvailability;
		recurrenceRule?: CalendarRecurrenceRule;
	}

	interface CalendarAttendeeInit {
		name?: string;
		role?: AttendeeRole;
		status?: AttendeeStatus;
		RSVP?: boolean;
		type?: AttendeeType;
		group?: string | null;
		delegatorURI?: string;
		delegateURI?: string;
		contactRef?: ContactRef;
	}

	interface CalendarRecurrenceRuleInit {
		interval?: number;
		untilDate?: TZDate;
		occurrenceCount?: number;
		daysOfTheWeek?: Array<ByDayValue>;
		setPositions?: Array<number>;
		exceptions?: Array<TZDate>;
	}

	interface CalendarManagerObject {
		calendar: CalendarManager;
	}
	interface Tizen extends CalendarManagerObject {}

	interface CalendarManager {
		getCalendars(
			type: CalendarType,
			successCallback: CalendarArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
		getUnifiedCalendar(type: CalendarType): Calendar;
		getDefaultCalendar(type: CalendarType): Calendar;
		addCalendar(calendar: Calendar): void;
		removeCalendar(type: CalendarType, id: CalendarId): void;
		getCalendar(type: CalendarType, id: CalendarId): Calendar;
	}

	class Calendar {
		constructor();
		id: CalendarId;
		name: string;
		accountId: AccountId | null;
		get(id: CalendarItemId): CalendarItem;
		add(item: CalendarItem): void;
		addBatch(
			items: Array<CalendarItem>,
			successCallback?: CalendarItemArraySuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		update(item: CalendarItem, updateAllInstances?: boolean | null): void;
		updateBatch(
			items: Array<CalendarItem>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
			updateAllInstances?: boolean | null,
		): void;
		remove(id: CalendarItemId): void;
		removeBatch(
			ids: Array<CalendarItemId>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		find(
			successCallback: CalendarItemArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			filter?: AbstractFilter | null,
			sortMode?: SortMode | null,
		): void;
		addChangeListener(successCallback: CalendarChangeCallback): number;
		removeChangeListener(watchId: number): void;
	}

	interface CalendarItem {
		id: CalendarItemId | null;
		calendarId: CalendarId | null;
		lastModificationDate: TZDate | null;
		description: string | null;
		summary: string | null;
		isAllDay: boolean;
		startDate: TZDate | null;
		duration: TimeDuration | null;
		location: string | null;
		geolocation: SimpleCoordinates | null;
		organizer: string | null;
		visibility: CalendarItemVisibility;
		status: CalendarItemStatus;
		priority: CalendarItemPriority;
		alarms: Array<CalendarAlarm>;
		categories: Array<string>;
		attendees: Array<CalendarAttendee>;
		convertToString(format: CalendarTextFormat): string;
		clone(): CalendarItem;
	}

	class CalendarTask {
		constructor();
		dueDate: TZDate | null;
		completedDate: TZDate | null;
		progress: number;
	}

	class CalendarEvent {
		constructor();
		isDetached: boolean;
		endDate: TZDate | null;
		availability: EventAvailability;
		recurrenceRule: CalendarRecurrenceRule | null;
		expandRecurrence(
			startDate: TZDate,
			endDate: TZDate,
			successCallback: CalendarEventArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	class CalendarAttendee {
		constructor();
		uri: string;
		name: string | null;
		role: AttendeeRole;
		status: AttendeeStatus;
		RSVP: boolean;
		type: AttendeeType;
		group: string | null;
		delegatorURI: string | null;
		delegateURI: string | null;
		contactRef: ContactRef | null;
	}

	class CalendarRecurrenceRule {
		constructor();
		frequency: RecurrenceRuleFrequency;
		interval: number;
		untilDate: TZDate | null;
		occurrenceCount: number;
		daysOfTheWeek: Array<ByDayValue>;
		setPositions: Array<number>;
		exceptions: Array<TZDate>;
	}

	class CalendarEventId {
		constructor();
		uid: string;
		rid: string | null;
	}

	class CalendarAlarm {
		constructor();
		absoluteDate: TZDate | null;
		before: TimeDuration | null;
		method: AlarmMethod;
		description: string | null;
	}

	interface CalendarEventArraySuccessCallback {
		onsuccess(events: Array<CalendarEvent>): void;
	}

	interface CalendarItemArraySuccessCallback {
		onsuccess(items: Array<CalendarItem>): void;
	}

	interface CalendarArraySuccessCallback {
		onsuccess(calendars: Array<Calendar>): void;
	}

	interface CalendarChangeCallback {
		onitemsadded(items: Array<CalendarItem>): void;
		onitemsupdated(items: Array<CalendarItem>): void;
		onitemsremoved(ids: Array<CalendarItemId>): void;
	}
}
