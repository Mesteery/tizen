export {};
declare global {
	type Bookmark = BookmarkItem | BookmarkFolder;
	interface BookmarkManagerObject {
		bookmark: BookmarkManager;
	}
	interface Tizen extends BookmarkManagerObject {}

	interface BookmarkManager {
		get(parentFolder?: BookmarkFolder | null, recursive?: boolean | null): Array<Bookmark>;
		add(bookmark: Bookmark, parentFolder?: BookmarkFolder | null): void;
		remove(bookmark?: Bookmark | null): void;
	}

	class BookmarkItem {
		constructor();
		parent: BookmarkFolder | null;
		title: string;
		url: string;
	}

	class BookmarkFolder {
		constructor();
		parent: BookmarkFolder | null;
		title: string;
	}
}
