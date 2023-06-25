export interface ITools {
	ELEMENT: HTMLDivElement;
	ACTIONS: { type: string; icon: string; cb: CallableFunction }[];
	show: () => void;
	hide: () => void;
	onDelete: CallableFunction;
	onArchive: CallableFunction;
	onEdit: CallableFunction;
	definedElement: () => void;
}
