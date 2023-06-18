import Components from "../../../class/Components";
import { Task } from "../../molecules/Task";
import Text from "../../atoms/Text";

export class TasksDocument extends Components {
	id: string;
	title: string;
	description: string;
	date: number;
	tasks: Task[];
	list: HTMLUListElement;
	element: HTMLDivElement;

	constructor(id: string, title: string, description: string, tasks: Task[]) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = Date.now();
		this.tasks = tasks;
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

		const content = this.createElement<HTMLDivElement>("div", {
			className: "task-document-content",
		});

		const contenttext = this.createElement<HTMLDivElement>("div", {
			className: "task-document-content-desc",
		});

		const title = new Text({ value: this.title, type: "h3", className: "task-document-title" }).ELEMENT;
		const description = new Text({ value: this.description, type: "p", className: "task-document-description" }).ELEMENT;
		const dateAdd = new Text({ value: String(this.date), type: "p", className: "task-document-dateAdded" }).ELEMENT;

		this.appendChild(contenttext, [title, dateAdd]);
		this.appendChild(content, [contenttext, description]);

		this.list = this.createElement<HTMLUListElement>("ul", {
			className: "task-document-list",
			id: "task-document-list",
		});

		this.tasks.forEach((task) => {
			this.addTask(task.title, task.description, task.badges);
		});

		this.appendChild(root, [content, this.list]);

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
