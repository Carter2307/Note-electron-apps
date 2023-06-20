import Components from "../../../class/Components";
import { Button } from "../../atoms/Button";
import { TextBox } from "../../atoms/form/TextBox";
import { Select } from "../../atoms/form/select";

export default class DocumentModal extends Components {
	element: HTMLDivElement;
	documentDatas: DocumentDataType;

	constructor(documentDatas: DocumentDataType) {
		super();
		this.documentDatas = documentDatas;
		this.element = this.createModalElement();
	}

	private createModalElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "modal",
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

		const cancleButton = new Button("Cancel", "secondary", "sm", this.onCancel);
		const okButton = new Button("Add Task", "primary", "sm", this.onCancel);

		this.appendChild(action, [cancleButton.element, okButton.element]);
		this.appendChild(container, [block1, block2, badgeBlock]);
		this.appendChild(this.element, [container]);
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

	private createModalTagGroup() {}

	private onBadgeSelected() {
		console.log("on select changed");
	}

	open() {
		console.log("open modal");
	}

	close() {
		console.log("close modal");
	}

	onCancel() {
		this.close();
	}

	onValidate() {}
}
