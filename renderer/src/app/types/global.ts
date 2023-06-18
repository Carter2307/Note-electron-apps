type menuItems = { label: string; icon: string; path: string };
type menuOptions = { label: string; items: menuItems[] };
type ButtonIcon = { show: boolean; value: string };

type Task = {
	id: string;
	title: string;
	description: string;
	checked: boolean;
	badges: string[];
	createAt: number;
};

type TaskDocument = {
	id: string;
	title: string;
	description: string;
	createAt: number;
	tasks: Task;
};
