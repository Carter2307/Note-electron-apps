import Components from "../../../class/Components";
import { Page } from "../../pages/Page";
import List from "../list/List";

export class Menu extends Components {
	createMenu(menu: menuOptions) {
		const element = super.createElement<HTMLDivElement>("div", {
			className: "menu",
		});

		const list = super.createElement<HTMLUListElement>("ul", {
			className: "menu-list",
		});

		const label = super.createElement<HTMLElement>("h4", {
			className: "menu-list-label",
			textContent: menu.label,
		});

		const items: HTMLLIElement[] = [];

		menu.items.forEach((item) => {
			items.push(new MenuItems(item, cb).element);
			async function cb(type: DocType) {
				if (type === "settings") {
					//settings modal handler
					console.log("setting handler");
					return;
				}

				const page = new Page(type);
			}
		});

		this.appendChild(list, items);
		this.appendChild(element, [label, list]);

		return element;
	}
}

export class MenuItems extends Components {
	label: string;
	icon: string;
	path: string;
	element: HTMLLIElement;
	cb: CallableFunction;
	constructor(options: menuItems, cb: CallableFunction) {
		super();
		this.label = options.label;
		this.icon = options.icon;
		this.path = options.path;
		this.element = this.createItemsElement();
		this.cb = cb;
	}

	private onClick(e: Event) {
		e.preventDefault();
		this.cb(this.path);
	}

	private createItemsElement(): HTMLLIElement {
		const element = this.createElement<HTMLLIElement>("li", {
			className: "menu-list-item",
			onclick: this.onClick.bind(this),
		});

		element.setAttribute("path", this.path);

		const icon = this.createElement<HTMLSpanElement>("span", {
			className: "menu-list-item-icon",
			innerHTML: `<i class="${this.icon}"></i>`,
		});

		const label = this.createElement<HTMLSpanElement>("span", {
			className: "menu-list-item-label",
			textContent: this.label,
		});

		this.appendChild(element, [icon, label]);

		return element;
	}
}
