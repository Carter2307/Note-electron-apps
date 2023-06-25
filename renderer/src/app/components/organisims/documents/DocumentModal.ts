import Components from "../../../class/Components";
import { Button } from "../../atoms/Button";
import { TextBox } from "../../atoms/form/TextBox";
import { Select } from "../../atoms/form/select";

export default class DocumentModal extends Components {
	element: HTMLDivElement;
	documentDatas: DocumentDataType;
	form: HTMLFormElement;
	modalDatas: any;
	cb: CallableFunction;

	constructor(documentDatas: DocumentDataType, cb: CallableFunction) {
		super();
		this.documentDatas = documentDatas;
		this.modalDatas = {};
		this.cb = cb;

		this.form = this.createElement<HTMLFormElement>("form", {
			className: "modal-form",
			onsubmit: this.onSubmit.bind(this),
		});
		this.element = this.createModalElement();
	}

	private createModalElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "modal modal-popup",
		});

		return element;
	}

	createAddTaskToDocumentModal() {
		const container = this.createElement<HTMLDivElement>("div", {
			className: "modal-content",
		});

		const block1 = this.createModalInputGroup("Task name", "task-name", "text", "add task...");
		const block2 = this.createModalInputGroup("Description", "task-description", "text-area", "describe your task...");
		const badgeBlock = this.createTaskBadgesHandler("Badges");

		const action = this.createElement<HTMLDivElement>("div", {
			className: "modal-actions",
		});

		const cancleButton = new Button("Cancel", "secondary", "sm", "button", this.onCancel.bind(this));
		const okButton = new Button("Add Task", "primary", "sm", "submit");

		this.appendChild(action, [cancleButton.element, okButton.element]);
		this.appendChild(container, [block1, block2, badgeBlock]);
		this.appendChild(this.form, [container, action]);
		this.appendChild(this.element, [this.form]);
		return this;
	}

	creatTaskDocumentSettingModal() {}

	private createTaskBadgesHandler(label: string) {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "modal-content-badges",
		});

		const blockLabel = this.createElement<HTMLLabelElement>("span", {
			className: "modal-content-block-label",
			textContent: label,
		});

		const blockBadges = this.createElement<HTMLLabelElement>("div", {
			className: "modal-content-block-badges",
		});

		const selectOptions = this.documentDatas.badges;
		const select = new Select("badges", selectOptions, "", "Select badges", this.onBadgeSelected);

		this.appendChild(blockBadges, [select.element]);
		this.appendChild(element, [blockLabel, blockBadges]);

		return element;
	}

	private createModalInputGroup(label: string, inputName: string, inputType: TextBoxType, placehoder: string) {
		const block = this.createElement<HTMLDivElement>("div", {
			className: "modal-content-block",
		});

		const blockLabel = this.createElement<HTMLLabelElement>("label", {
			className: "modal-content-block-label",
			for: inputName,
			textContent: label,
		});

		const input = new TextBox(inputType, inputName, placehoder);

		this.appendChild(block, [blockLabel, input.element]);

		return block;
	}

	private createModalAction() {}

	private createModalTagGroup() {}

	private onBadgeSelected() {
		console.log("on select changed");
	}

	show() {}

	open() {
		const root = document.querySelector(".task-document-container");
		root?.appendChild(this.element);
	}

	close() {
		console.log("close modal");
	}

	onCancel() {
		this.close();
	}

	getModalDatas() {
		return this.modalDatas;
	}

	onSubmit(e: Event) {
		e.preventDefault();
		this.modalDatas = {
			title: "",
			description: "",
			badges: ["UI design"],
		};

		this.cb(this.modalDatas);
	}
}
