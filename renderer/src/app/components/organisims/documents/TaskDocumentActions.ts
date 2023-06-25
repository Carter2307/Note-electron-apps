import ButtonIcon from "../../atoms/ButtonIcon";
import { DocumentHandler } from "./DocumentHandler";
import DocumentModal from "./DocumentModal";

export default class TaskDocumentActions extends DocumentHandler {
	element: HTMLDivElement;
	document: TaskDocument;

	constructor(document: TaskDocument) {
		super();
		this.document = document;
		this.element = this.createActionElement();
	}

	createActionElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "task-document-actions",
		});

		const addButton = new ButtonIcon("ri-add-fill", "primary", "md", this.addTaskToDocument.bind(this));
		const settingButton = new ButtonIcon("ri-settings-4-line", "secondary", "sm", this.openDocumentSetting.bind(this));

		this.appendChild(element, [settingButton.element, addButton.element]);

		return element;
	}

	private addTaskToDocument(e: Event) {
		const modal = new DocumentModal(this.document, (data: {}) => {
			console.log(data);
		});
		modal.createAddTaskToDocumentModal().open();
	}

	private openDocumentSetting() {
		// open modal for document setting
		console.log("open modal for document setting");
	}
}
