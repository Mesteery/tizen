export {};
declare global {
	type TeecLoginMethod = 'PUBLIC' | 'USER' | 'GROUP' | 'APPLICATION';
	type TeecValueType = 'INPUT' | 'OUTPUT' | 'INOUT';
	type TeecTempMemoryType = 'INPUT' | 'OUTPUT' | 'INOUT';
	type TeecRegisteredMemoryType = 'WHOLE' | 'PARTIAL_INPUT' | 'PARTIAL_OUTPUT' | 'PARTIAL_INOUT';
	type TeecSharedMemoryFlags = 'INPUT' | 'OUTPUT' | 'INOUT';
	type TeecUuid = string;
	type TeecTaskId = number;
	interface LibTeecManagerObject {
		teec: LibTeecManager;
	}
	interface Tizen extends LibTeecManagerObject {}

	interface LibTeecManager {
		getContext(name?: string | null): TeecContext;
	}

	interface TeecContext {
		openSession(
			taUUID: TeecUuid,
			loginMethod: TeecLoginMethod,
			connectionData: number | null,
			params: Array<TeecParameter>,
			successCallback: TeecOpenSuccessCallback,
			errorCallback?: any,
		): TeecTaskId;
		revokeCommand(id: TeecTaskId): void;
		allocateSharedMemory(size: number, flags: TeecSharedMemoryFlags): TeecSharedMemory;
		registerSharedMemory(addr: number, size: number, flags: TeecSharedMemoryFlags): TeecSharedMemory;
		releaseSharedMemory(shm: TeecSharedMemory): void;
	}

	interface TeecSession {
		close(): void;
		invokeCommand(
			cmd: number,
			params: Array<TeecParameter>,
			successCallback: TeecCommandSuccessCallback,
			errorCallback?: any,
		): TeecTaskId;
	}

	interface TeecSharedMemory {
		size: number;
		setData(data: Array<number>, offset: number): void;
		getData(data: Array<number>, offset: number): void;
	}

	interface TeecParameter {
		type: string;
	}

	class TeecRegisteredMemory {
		constructor();
		shm: TeecSharedMemory;
		offset: number;
		size: number;
	}

	class TeecTempMemory {
		constructor();
		mem: Array<number>;
	}

	class TeecValue {
		constructor();
		a: number;
		b: number;
	}

	interface TeecOpenSuccessCallback {
		onsuccess(session: TeecSession): void;
	}

	interface TeecCommandSuccessCallback {
		onsuccess(cmd: number, params: Array<TeecParameter>): void;
	}
}
