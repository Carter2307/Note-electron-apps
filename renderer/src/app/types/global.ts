//MENU TYPE
type menuItems = { label: string; icon: string; path: string };
type menuOptions = { label: string; items: menuItems[] };

//BUTTON TYPES
type ButtonIcon = { show: boolean; value: string };
type ButtonType = "default" | "icon";
type ButtonSize = "md" | "sm";
type ButtonStyle = "primary" | "secondary";

//DOCUMENT TYPE
type DocType = "tasksDocuments" | "notesDocuments" | "aiDocuments" | "projectsDocuments" | "settings";
type DocumentDataType = TaskDocument;

//SELECT TYPES
type SelectOption = {
	value: string;
	textContent: string;
};

//BADGE TYPE
type Badge = {
	value: string;
	textContent: string;
};

//MODAL TYPES
type ModalType = "add-task" | "open-task-setting";

//TEXT BOX TYPES
type TextBoxType = "text" | "text-area" | "email" | "number" | "tel";

//TASK TYPES
type Task = {
	id: string;
	title: string;
	description: string;
	checked: boolean;
	badges: string[];
	createAt: number;
};

type Tasks = Task[];

type TaskDocument = {
	id: string;
	title: string;
	description: string;
	createAt: number;
	badges: Badge[];
	tasks: Tasks;
	addTask: (title: string, description: string, badges: string[]) => void;
};
