import Components from "../../class/Components";

export class Button extends Components {
	label: string;
	type: string;
	size: string;
	icon: ButtonIcon | undefined;
	cb: CallableFunction;
	element: HTMLButtonElement;

	//Button size [small, medium, large]
	//Button type [primary, secondary, ...]

	constructor(label: string, type: string, size: string, cb: CallableFunction, icon?: ButtonIcon) {
		super();
		this.label = label;
		this.type = type;
		this.size = size;
		this.icon = icon;
		this.cb = cb;
		this.element = this.createButtonElement();
	}

	private createButtonElement() {
		const element = this.createElement<HTMLButtonElement>("button", {
			className: `button button-${this.type} button-${this.size}`,
			type: "button",
			onclick: () => {
				this.cb();
			},
		});

		const label = this.createElement<HTMLSpanElement>("span", {
			className: "button-label",
			textContent: this.label,
		});

		this.appendChild(element, [label]);

		if (this.icon) {
			const icon = this.createElement<HTMLElement>("i", {
				className: "button-icon",
			});

			icon.classList.add(this.icon.value);
			this.appendChild(element, [icon]);
		}

		return element;
	}
}
