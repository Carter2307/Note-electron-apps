import { Task } from "../../molecules/Task";
import Text from "../../atoms/Text";
import TaskDocumentActions from "./TaskDocumentActions";
import { DocumentHandler } from "./DocumentHandler";

export class TasksDocument extends DocumentHandler {
	id: string;
	title: string;
	description: string;
	date: number;
	tasks: Tasks;
	list: HTMLUListElement;
	documentDatas: TaskDocument;
	element: HTMLDivElement;
	badges: Badge[];
	createAt: number;

	constructor(documentDatas: TaskDocument) {
		super();
		this.id = documentDatas.id;
		this.title = documentDatas.title;
		this.description = documentDatas.description;
		this.date = Date.now();
		this.tasks = documentDatas.tasks;
		this.badges = documentDatas.badges;
		this.createAt = documentDatas.createAt;
		this.documentDatas = documentDatas;
		this.list = this.createElement<HTMLUListElement>("ul", {});
		this.element = this.uiHandler();
		this.render();
	}

	private render() {
		const app = document.querySelector(".page-document");
		if (!app) return;
		app.innerHTML = "";
		app.appendChild(this.element);
	}

	private uiHandler() {
		const root = this.createElement<HTMLDivElement>("div", {
			className: "task-document",
			id: "task-document",
		});

		const container = this.createElement<HTMLDivElement>("div", {
			className: "task-document-container",
		});

		const containerContent = this.createElement<HTMLDivElement>("div", {
			className: "task-document-container-content",
		});

		const content = this.createElement<HTMLDivElement>("div", {
			className: "task-document-content",
		});

		const contenttext = this.createElement<HTMLDivElement>("div", {
			className: "task-document-content-desc",
		});

		const title = new Text({ value: this.title, type: "h3", className: "task-document-title" }).ELEMENT;
		const description = new Text({ value: this.description, type: "p", className: "task-document-description" }).ELEMENT;
		const dateAdd = new Text({ value: String(this.date), type: "p", className: "task-document-dateAdded" }).ELEMENT;
		const taskAction = new TaskDocumentActions(this);

		this.appendChild(contenttext, [title, dateAdd]);
		this.appendChild(content, [contenttext, description]);

		this.list = this.createElement<HTMLUListElement>("ul", {
			className: "task-document-list",
			id: "task-document-list",
		});

		this.tasks.forEach((task) => {
			this.addTask(task.title, task.description, task.badges);
		});

		this.appendChild(containerContent, [content, this.list]);
		this.appendChild(container, [containerContent]);

		this.appendChild(root, [container, taskAction.element]);

		return root;
	}

	private addTask(title: string, description: string, badges: string[]) {
		const id = "task-id-qsdqd";
		const task: Task = new Task(id, title, description, false, badges);
		this.list.appendChild(task.element);
	}

	edit(title: string, description: string) {
		if (title === "" || description === "") return;
		this.title = title;
		this.description = description;
	}

	clean() {
		this.tasks = [];
	}

	delete() {
		console.log("delete");
	}
}
