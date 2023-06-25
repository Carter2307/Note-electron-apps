import Components from "../../class/Components";
import { ITools } from "../../interfaces/ITools";
import { Task } from "./Task";

export class Tools extends Components implements ITools {
	ELEMENT: HTMLDivElement;
	ACTIONS: { type: string; icon: string; cb: CallableFunction }[];
	TASK: Task;
	onEdit: CallableFunction;
	onArchive: CallableFunction;
	onDelete: CallableFunction;

	constructor(task: Task, onEdit: CallableFunction, onArchive: CallableFunction, onDelete: CallableFunction) {
		super();

		this.TASK = task;

		this.ELEMENT = this.createElement<HTMLDivElement>("div", {
			className: "task-actions",
			id: "task-actions",
		});

		this.onEdit = onEdit;
		this.onArchive = onEdit;
		this.onDelete = onEdit;

		this.ACTIONS = [
			{ type: "edit", icon: "<i class='ri-pencil-line'></i>", cb: this.onEdit },
			{ type: "archive", icon: "<i class='ri-archive-line'></i>", cb: this.onArchive },
			{ type: "delete", icon: "<i class='ri-delete-bin-6-line'></i>", cb: this.onDelete },
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
