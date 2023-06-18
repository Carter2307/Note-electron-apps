import Components from "../../class/Components";
import { ITools } from "../../interfaces/ITools";
import { Task } from "./Task";

export class Tools extends Components implements ITools {
	ELEMENT: HTMLDivElement;
	ACTIONS: { type: string; icon: string; cb: CallableFunction }[];
	TASK: Task;

	constructor(task: Task) {
		super();

		this.TASK = task;

		this.ELEMENT = this.createElement<HTMLDivElement>("div", {
			className: "task-actions",
			id: "task-actions",
		});

		this.ACTIONS = [
			{ type: "edit", icon: "<i class='ri-pencil-line'></i>", cb: this.edit },
			{ type: "archive", icon: "<i class='ri-archive-line'></i>", cb: this.archive },
			{ type: "delete", icon: "<i class='ri-delete-bin-6-line'></i>", cb: this.delete },
		];

		this.definedElement();
	}

	definedElement() {
		console.log(this.TASK);
		const buttons: HTMLButtonElement[] | any = [];

		for (let i = 0; i < this.ACTIONS.length; i++) {
			const button = this.createElement<HTMLButtonElement>("button", {
				className: "task-action",
				id: "task-action",
				type: "button",
				action: this.ACTIONS[i].type,
				innerHTML: this.ACTIONS[i].icon,
				onclick: () => {
					this.ACTIONS[i].cb();
				},
			});

			buttons.push(button);
		}

		this.appendChild(this.ELEMENT, buttons);
	}

	hide() {}
	delete() {
		console.log("delete");
		console.log(this.TASK);
	}
	archive() {
		console.log("archive");
	}
	edit() {
		console.log("edit");
	}
	show() {}

	// createElement() {
	// 	return new Promise<HTMLElement>((resolve, reject) => {
	// 		const element = Object.assign(document.createElement("div"), {
	// 			className: "tools",
	// 			textContent: "tool-box",
	// 		});
	// 		if (!element) reject(new Error("Une érreur c'est produite"));
	// 		resolve(element);
	// 	});
	// }
}
