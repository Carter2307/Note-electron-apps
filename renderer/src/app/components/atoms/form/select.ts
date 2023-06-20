import Components from "../../../class/Components";

export class Select extends Components {
	options: SelectOption[];
	name: string;
	id: string | null;
	placeholder: string;
	cb: CallableFunction;
	element: HTMLSelectElement;
	documentId: string;

	constructor(name: string, options: SelectOption[], documentId: string, placeholder: string, cb: CallableFunction, id?: string) {
		super();
		this.options = options;
		this.name = name;
		this.id = id ? id : "";
		this.placeholder = placeholder;
		this.cb = cb;
		this.documentId = documentId;
		this.element = this.createSelectElement();
	}

	private createSelectElement() {
		const element = this.createElement<HTMLSelectElement>("select", {
			className: "select-box",
			name: this.name,
			id: this.id,
			onchange: this.onChange.bind(this),
		});

		this.options.forEach((o) => {
			const option = this.createSelectOptions(o);
			this.appendChild(element, [option]);
		});

		return element;
	}

	private createSelectOptions(params: SelectOption) {
		const option = this.createElement<HTMLOptionElement>("option", {
			value: params.value,
			textContent: params.textContent,
		});

		return option;
	}

	onChange(e: Event) {
		this.cb();
	}
}
