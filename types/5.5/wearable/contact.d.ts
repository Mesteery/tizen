export {};
declare global {
	type AddressBookId = string;
	type ContactId = string;
	type PersonId = string;
	type ContactGroupId = string;
	type ContactUsageCountFilter = AttributeFilter | AttributeRangeFilter;
	type ContactTextFormat = 'VCARD_30';
	type ContactRelationshipType =
		| 'OTHER'
		| 'ASSISTANT'
		| 'BROTHER'
		| 'CHILD'
		| 'DOMESTIC_PARTNER'
		| 'FATHER'
		| 'FRIEND'
		| 'MANAGER'
		| 'MOTHER'
		| 'PARENT'
		| 'PARTNER'
		| 'REFERRED_BY'
		| 'RELATIVE'
		| 'SISTER'
		| 'SPOUSE'
		| 'CUSTOM';
	type ContactInstantMessengerType =
		| 'OTHER'
		| 'GOOGLE'
		| 'WLM'
		| 'YAHOO'
		| 'FACEBOOK'
		| 'ICQ'
		| 'AIM'
		| 'QQ'
		| 'JABBER'
		| 'SKYPE'
		| 'IRC'
		| 'CUSTOM';
	type ContactUsageType =
		| 'OUTGOING_CALL'
		| 'OUTGOING_MSG'
		| 'OUTGOING_EMAIL'
		| 'INCOMING_CALL'
		| 'INCOMING_MSG'
		| 'INCOMING_EMAIL'
		| 'MISSED_CALL'
		| 'REJECTED_CALL'
		| 'BLOCKED_CALL'
		| 'BLOCKED_MSG';
	interface ContactInit {
		name?: ContactName;
		addresses?: Array<ContactAddress>;
		photoURI?: string;
		phoneNumbers?: Array<ContactPhoneNumber>;
		emails?: Array<ContactEmailAddress>;
		messengers?: Array<ContactInstantMessenger>;
		relationships?: Array<ContactRelationship>;
		extensions?: Array<ContactExtension>;
		birthday?: Date;
		anniversaries?: Array<ContactAnniversary>;
		organizations?: Array<ContactOrganization>;
		notes?: Array<string>;
		urls?: Array<ContactWebSite>;
		ringtoneURI?: string;
		messageAlertURI?: string;
		vibrationURI?: string;
		groupIds?: Array<ContactGroupId>;
	}

	interface ContactNameInit {
		prefix?: string;
		suffix?: string;
		firstName?: string;
		middleName?: string;
		lastName?: string;
		nicknames?: Array<string>;
		phoneticFirstName?: string;
		phoneticMiddleName?: string;
		phoneticLastName?: string;
	}

	interface ContactOrganizationInit {
		name?: string;
		department?: string;
		title?: string;
		role?: string;
		logoURI?: string;
	}

	interface ContactAddressInit {
		country?: string;
		region?: string;
		city?: string;
		streetAddress?: string;
		additionalInformation?: string;
		postalCode?: string;
		isDefault?: boolean;
		types?: Array<string>;
		label?: string;
	}

	interface ContactExtensionInit {
		data1?: number;
		data2?: string;
		data3?: string;
		data4?: string;
		data5?: string;
		data6?: string;
		data7?: string;
		data8?: string;
		data9?: string;
		data10?: string;
		data11?: string;
		data12?: string;
	}

	interface ContactManagerObject {
		contact: ContactManager;
	}
	interface Tizen extends ContactManagerObject {}

	interface ContactManager {
		getAddressBooks(successCallback: AddressBookArraySuccessCallback, errorCallback?: ErrorCallback | null): void;
		getUnifiedAddressBook(): AddressBook;
		getDefaultAddressBook(): AddressBook;
		addAddressBook(addressBook: AddressBook): void;
		removeAddressBook(addressBookId: AddressBookId): void;
		getAddressBook(addressBookId: AddressBookId): AddressBook;
		get(personId: PersonId): Person;
		update(person: Person): void;
		updateBatch(
			persons: Array<Person>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		remove(personId: PersonId): void;
		removeBatch(
			personIds: Array<PersonId>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		find(
			successCallback: PersonArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			filter?: AbstractFilter | null,
			sortMode?: SortMode | null,
		): void;
		findByUsageCount(
			filter: ContactUsageCountFilter,
			successCallback: PersonArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			sortModeOrder?: SortModeOrder | null,
			limit?: number,
			offset?: number,
		): void;
		addChangeListener(successCallback: PersonsChangeCallback): number;
		removeChangeListener(watchId: number): void;
	}

	class AddressBook {
		constructor();
		id: AddressBookId | null;
		name: string;
		readOnly: boolean;
		accountId: AccountId | null;
		get(id: ContactId): Contact;
		add(contact: Contact): void;
		addBatch(
			contacts: Array<Contact>,
			successCallback?: ContactArraySuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		update(contact: Contact): void;
		updateBatch(
			contacts: Array<Contact>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		remove(id: ContactId): void;
		removeBatch(
			ids: Array<ContactId>,
			successCallback?: SuccessCallback | null,
			errorCallback?: ErrorCallback | null,
		): void;
		find(
			successCallback: ContactArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			filter?: AbstractFilter | null,
			sortMode?: SortMode | null,
		): void;
		addChangeListener(successCallback: AddressBookChangeCallback, errorCallback?: ErrorCallback | null): number;
		removeChangeListener(watchId: number): void;
		getGroup(groupId: ContactGroupId): ContactGroup;
		addGroup(group: ContactGroup): void;
		updateGroup(group: ContactGroup): void;
		removeGroup(groupId: ContactGroupId): void;
		getGroups(): Array<ContactGroup>;
	}

	interface Person {
		id: PersonId;
		displayName: string;
		contactCount: number;
		hasPhoneNumber: boolean;
		hasEmail: boolean;
		isFavorite: boolean;
		photoURI: string | null;
		ringtoneURI: string | null;
		displayContactId: ContactId;
		link(personId: PersonId): void;
		unlink(contactId: ContactId): Person;
		getUsageCount(type?: ContactUsageType | null): number;
		resetUsageCount(type?: ContactUsageType | null): void;
	}

	class Contact {
		constructor();
		id: ContactId | null;
		personId: PersonId | null;
		addressBookId: AddressBookId | null;
		lastUpdated: Date | null;
		isFavorite: boolean;
		name: ContactName | null;
		addresses: Array<ContactAddress>;
		photoURI: string | null;
		phoneNumbers: Array<ContactPhoneNumber>;
		emails: Array<ContactEmailAddress>;
		messengers: Array<ContactInstantMessenger>;
		relationships: Array<ContactRelationship>;
		extensions: Array<ContactExtension>;
		birthday: Date | null;
		anniversaries: Array<ContactAnniversary>;
		organizations: Array<ContactOrganization>;
		notes: Array<string>;
		urls: Array<ContactWebSite>;
		ringtoneURI: string | null;
		messageAlertURI: string | null;
		vibrationURI: string | null;
		groupIds: Array<ContactGroupId>;
		convertToString(format?: ContactTextFormat | null): string;
		clone(): Contact;
	}

	class ContactRef {
		constructor();
		addressBookId: AddressBookId;
		contactId: ContactId;
	}

	class ContactName {
		constructor();
		prefix: string | null;
		suffix: string | null;
		firstName: string | null;
		middleName: string | null;
		lastName: string | null;
		nicknames: Array<string>;
		phoneticFirstName: string | null;
		phoneticMiddleName: string | null;
		phoneticLastName: string | null;
		displayName: string | null;
	}

	class ContactOrganization {
		constructor();
		name: string | null;
		department: string | null;
		title: string | null;
		role: string | null;
		logoURI: string | null;
	}

	class ContactWebSite {
		constructor();
		url: string;
		type: string;
	}

	class ContactAnniversary {
		constructor();
		date: Date;
		label: string | null;
	}

	class ContactAddress {
		constructor();
		country: string | null;
		region: string | null;
		city: string | null;
		streetAddress: string | null;
		additionalInformation: string | null;
		postalCode: string | null;
		isDefault: boolean;
		types: Array<string>;
		label: string | null;
	}

	class ContactPhoneNumber {
		constructor();
		number: string;
		isDefault: boolean;
		types: Array<string>;
		label: string | null;
	}

	class ContactEmailAddress {
		constructor();
		email: string;
		isDefault: boolean;
		types: Array<string>;
		label: string | null;
	}

	class ContactInstantMessenger {
		constructor();
		imAddress: string;
		type: ContactInstantMessengerType;
		label: string | null;
	}

	class ContactGroup {
		constructor();
		id: ContactGroupId | null;
		addressBookId: AddressBookId | null;
		name: string;
		ringtoneURI: string | null;
		photoURI: string | null;
		readOnly: string;
	}

	class ContactRelationship {
		constructor();
		relativeName: string;
		type: ContactRelationshipType;
		label: string | null;
	}

	class ContactExtension {
		constructor();
		data1: number;
		data2: string | null;
		data3: string | null;
		data4: string | null;
		data5: string | null;
		data6: string | null;
		data7: string | null;
		data8: string | null;
		data9: string | null;
		data10: string | null;
		data11: string | null;
		data12: string | null;
	}

	interface PersonArraySuccessCallback {
		onsuccess(persons: Array<Person>): void;
	}

	interface ContactArraySuccessCallback {
		onsuccess(contacts: Array<Contact>): void;
	}

	interface AddressBookArraySuccessCallback {
		onsuccess(addressbooks: Array<AddressBook>): void;
	}

	interface AddressBookChangeCallback {
		oncontactsadded(contacts: Array<Contact>): void;
		oncontactsupdated(contacts: Array<Contact>): void;
		oncontactsremoved(contactIds: Array<ContactId>): void;
	}

	interface PersonsChangeCallback {
		onpersonsadded(persons: Array<Person>): void;
		onpersonsupdated(persons: Array<Person>): void;
		onpersonsremoved(personIds: Array<PersonId>): void;
	}
}
