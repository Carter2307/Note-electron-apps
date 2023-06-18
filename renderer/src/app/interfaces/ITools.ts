export interface ITools {
	ELEMENT: HTMLDivElement;
	ACTIONS: { type: string; icon: string; cb: CallableFunction }[];
	show: () => void;
	hide: () => void;
	delete: () => void;
	archive: () => void;
	edit: () => void;
	definedElement: () => void;
}
