import Components from "../../class/Components";

export class Button extends Components {
	label: string;
	style: string;
	size: string;
	icon: ButtonIcon | undefined;
	cb: CallableFunction | undefined;
	element: HTMLButtonElement;
	type: string;

	//Button size [sm, md, lg]
	//Button style [primary, secondary, tertiary, disabled]
	//Button type [default, icon]

	constructor(label: string, style: string, size: string, type: string, cb?: CallableFunction, icon?: ButtonIcon) {
		super();
		this.label = label;
		this.style = style;
		this.size = size;
		this.icon = icon;
		this.type = type;
		this.cb = cb;
		this.element = this.createButtonElement();
	}

	private createButtonElement() {
		const element = this.createElement<HTMLButtonElement>("button", {
			className: `button button-${this.style} button-${this.size}`,
			type: this.type,
			onclick: () => {
				if (!this.cb) return;
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
