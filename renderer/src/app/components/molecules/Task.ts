import { Tools } from "./Tools";
import Components from "../../class/Components";
import Text from "../atoms/Text";
import { DateString } from "../../helpers/DateHandler";

export class Task extends Components {
	id: string;
	title: string;
	description: string;
	checked: boolean;
	badges: string[];
	createAt: number;
	element: HTMLLIElement;
	tools: Tools;

	constructor(id: string, title: string, description: string, checked: boolean, badges: string[]) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.checked = checked;
		this.badges = badges;
		this.createAt = 0;
		this.tools = new Tools(this, this.edit, this.archive, this.delete);
		this.element = this.createHtmlElement();

		this.render();
		this.eventListener();
	}

	render() {
		const app = document.getElementById("app");
		if (!app) return;
		this.appendChild(this.element, [this.tools.ELEMENT]);
		app.appendChild(this.element);
	}

	createHtmlElement() {
		const element = Object.assign(document.createElement("li"), {
			className: "task",
			id: "task",
			taskId: this.id,
			checked: this.checked,
		});

		//Header
		const taskHeader = Object.assign(document.createElement("div"), {
			className: "task-header",
			id: "task-header",
		});

		const taskHeaderBox = Object.assign(document.createElement("span"), {
			className: "task-checkbox",
			id: "task-checkbox",
		});

		const taskHeaderContent = Object.assign(document.createElement("div"), {
			className: "task-content",
			id: "task-content",
		});

		const title = new Text({ value: this.title, type: "h3", className: "task-title" }).ELEMENT;
		const description = new Text({ value: this.description, type: "p", className: "task-description" }).ELEMENT;

		const taskHeaderMoveIcon = Object.assign(document.createElement("span"), {
			className: "task-move",
			id: "task-move",
			innerHTML: "<i class='ri-apps-2-fill'></i>",
		});

		this.appendChild(taskHeaderContent, [title, description]);
		this.appendChild(taskHeader, [taskHeaderBox, taskHeaderContent, taskHeaderMoveIcon]);
		this.appendChild(element, [taskHeader]);

		//DIVIDER
		const divider = Object.assign(document.createElement("hr"), {});

		this.appendChild(element, [divider as HTMLElement]);

		//FOOTER
		const footer = Object.assign(document.createElement("div"), {
			className: "task-footer",
		});

		const badges = Object.assign(document.createElement("div"), {
			className: "task-badges",
		});

		this.badges.forEach((text) => {
			const b = Object.assign(document.createElement("span"), {
				className: "task-badge",
				textContent: text,
			});

			this.appendChild(badges, [b as HTMLElement]);
		});

		const time = Object.assign(document.createElement("span"), {
			className: "task-timer",
			id: "task-timer",
			textContent: "0s ago",
		});

		window.setInterval(() => {
			time.textContent = String(this.createAt);
		}, 1000);

		this.appendChild(footer, [badges, time]);
		this.appendChild(element, [footer]);

		return element;
	}

	delete() {
		console.log("task action");
	}
	archive() {
		console.log("task action");
	}
	edit() {
		console.log("task action");
	}

	onChecked(e: Event) {
		e.preventDefault();
		console.log("click");
	}

	eventListener() {
		//this.element.addEventListener("click", this.onChecked.bind(this));
	}
}
