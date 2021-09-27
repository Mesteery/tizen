export {};
declare global {
	type AccountId = number;
	interface AccountInit {
		userName?: string;
		iconUri?: string;
	}

	interface AccountManagerObject {
		account: AccountManager;
	}
	interface Tizen extends AccountManagerObject {}

	interface AccountProvider {
		applicationId: ApplicationId;
		displayName: string;
		iconUri: string;
		smallIconUri: string;
		capabilities: Array<string>;
		isMultipleAccountSupported: boolean;
	}

	class Account {
		constructor();
		id: AccountId | null;
		userName: string | null;
		iconUri: string | null;
		provider: AccountProvider;
		setExtendedData(key: string, value: string): void;
		getExtendedData(key: string): string;
		getExtendedData(
			successCallback: AccountExtendedDataArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
		): void;
	}

	interface AccountManager {
		add(account: Account): void;
		remove(accountId: AccountId): void;
		update(account: Account): void;
		getAccount(accountId: AccountId): Account | null;
		getAccounts(
			successCallback: AccountArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			applicationId?: string | null,
		): void;
		getProvider(applicationId: ApplicationId): AccountProvider | null;
		getProviders(
			successCallback: AccountProviderArraySuccessCallback,
			errorCallback?: ErrorCallback | null,
			capability?: string | null,
		): void;
		addAccountListener(callback: AccountChangeCallback): number;
		removeAccountListener(accountListenerId: number): void;
	}

	interface AccountExtendedData {
		key: string;
		value: string;
	}

	interface AccountArraySuccessCallback {
		onsuccess(accounts: Array<Account>): void;
	}

	interface AccountExtendedDataArraySuccessCallback {
		onsuccess(extendedDataArray: Array<AccountExtendedData>): void;
	}

	interface AccountProviderArraySuccessCallback {
		onsuccess(providers: Array<AccountProvider>): void;
	}

	interface AccountChangeCallback {
		onadded(account: Account): void;
		onremoved(accountId: AccountId): void;
		onupdated(account: Account): void;
	}
}
