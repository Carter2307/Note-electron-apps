import Components from "../../class/Components";

export default class ButtonIcon extends Components {
	icon: string;
	cb: CallableFunction;
	type: ButtonType;
	element: HTMLButtonElement;
	size: ButtonSize;
	style: ButtonStyle;
	constructor(icon: string, style: ButtonStyle, size: ButtonSize, cb: CallableFunction) {
		super();
		this.icon = icon;
		this.cb = cb;
		this.type = "icon";
		this.size = size;
		this.style = style;
		this.element = this.createButtonIcon();
	}

	private createButtonIcon() {
		const element = this.createElement<HTMLButtonElement>("button", {
			className: `button button-${this.type} button-${this.style} button-${this.type}-${this.size}`,
			type: "button",
			onclick: (e: Event) => {
				this.cb(e);
			},
		});

		const label = this.createElement<HTMLElement>("i", {
			className: this.icon,
		});

		this.appendChild(element, [label]);
		return element;
	}
}
