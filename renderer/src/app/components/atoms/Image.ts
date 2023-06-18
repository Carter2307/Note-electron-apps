import Components from "../../class/Components";

export default class Image extends Components {
	SRC: string;
	CLASSNAME: string;
	ELEMENT: HTMLImageElement;
	constructor(options: { src: string; className: string }) {
		super();
		this.SRC = options.src;
		this.CLASSNAME = options.className;

		this.ELEMENT = this.createElement<HTMLImageElement>("img", {
			src: this.SRC,
			className: this.CLASSNAME,
		});

		return this;
	}
}
