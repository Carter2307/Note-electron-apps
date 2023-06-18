import Components from "../../class/Components";

export default class Text extends Components {
	TYPE: string;
	VALUE: string;
	CLASSNAME: string;
	ELEMENT: HTMLElement;
	constructor(options: { value: string; type: string; className: string }) {
		super();
		this.TYPE = options.type;
		this.VALUE = options.value;
		this.CLASSNAME = options.className;

		this.ELEMENT = Object.assign(document.createElement(`${this.TYPE}`), {
			className: this.CLASSNAME,
			textContent: this.VALUE,
		});

		return this;
	}
}
