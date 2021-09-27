export {};
declare global {
	type AlarmId = string;
	type ByDayValue = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
	interface AlarmManagerObject {
		alarm: AlarmManager;
	}
	interface Tizen extends AlarmManagerObject {}

	class AlarmManager {
		static readonly PERIOD_MINUTE: 60;
		static readonly PERIOD_HOUR: 3600;
		static readonly PERIOD_DAY: 86400;
		static readonly PERIOD_WEEK: 604800;
		add(alarm: Alarm, applicationId: ApplicationId, appControl?: ApplicationControl | null): void;
		addAlarmNotification(alarm: Alarm, notification: Notification): void;
		remove(id: AlarmId): void;
		removeAll(): void;
		get(id: AlarmId): Alarm;
		getAlarmNotification(id: AlarmId): UserNotification;
		getAll(): Array<Alarm>;
	}

	interface Alarm {
		id: AlarmId | null;
	}

	class AlarmRelative {
		constructor();
		delay: number;
		period: number | null;
		getRemainingSeconds(): number | null;
	}

	class AlarmAbsolute {
		constructor();
		date: Date;
		daysOfTheWeek: Array<ByDayValue>;
		getNextScheduledDate(): Date | null;
	}
}
