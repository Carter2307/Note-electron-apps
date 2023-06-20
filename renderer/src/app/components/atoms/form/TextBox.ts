import Components from "../../../class/Components";

export class TextBox extends Components {
	type: TextBoxType;
	name: string;
	placeholder: string;
	element: HTMLElement;
	id: string;

	constructor(type: TextBoxType, name: string, placeholder: string) {
		super();
		this.type = type;
		this.name = name;
		this.id = name;
		this.placeholder = placeholder;
		this.element = this.createTextBoxByType();
	}

	createTextBoxByType() {
		let element;

		if (this.type === "text-area") {
			element = this.createTextArea();
		} else {
			element = this.createText();
		}

		return element;
	}

	createTextArea() {
		const element = this.createElement<HTMLTextAreaElement>("text-area", {
			className: "text-box text-area-box",
			type: this.type,
			name: this.name,
			id: this.name,
			placeholder: this.placeholder,
		});
		return element;
	}

	createText() {
		const element = this.createElement<HTMLInputElement>("input", {
			className: "text-box",
			type: this.type,
			name: this.name,
			id: this.name,
			placeholder: this.placeholder,
		});

		return element;
	}
}
