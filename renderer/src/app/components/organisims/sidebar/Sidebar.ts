import Components from "../../../class/Components";
import { Menu } from "./Menu";
import { config } from "./config";

export class SideBar extends Components {
	element: HTMLDivElement;
	constructor() {
		super();
		this.element = this.createSidebarElement();
	}

	private createSidebarElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "sidebar",
		});

		const toggler = this.createElement<HTMLButtonElement>("button", {
			className: "sidebar-toggler",
			innerHTML: "<i class='ri-side-bar-fill'></i>",
			onclick: this.togglerSidebar,
		});

		toggler.setAttribute("tooltip", "true");
		toggler.setAttribute("tooltip-position", "right");
		toggler.setAttribute("tooltip-label", "Close sidebar");
		toggler.setAttribute("tooltip-color", "white");

		const navigation = this.createElement<HTMLDivElement>("div", {
			className: "sidebar-menu",
		});

		const menus: HTMLDivElement[] = [];

		config.menus.forEach((menu) => {
			const m = new Menu().createMenu(menu);
			menus.push(m);
		});

		this.appendChild(navigation, menus);
		this.appendChild(element, [toggler, navigation]);

		return element;
	}

	private togglerSidebar(e: Event) {
		e.preventDefault();
		console.log(e.currentTarget);
	}
}
