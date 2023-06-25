import Tooltip from "./components/molecules/Tooltip";
import { SideBar } from "./components/organisims/sidebar/Sidebar";

declare global {
	interface Window {
		documentDatas: any;
	}
}

class App {
	root: HTMLElement | null;
	constructor() {
		this.root = document.getElementById("app");
		if (!this.root) return;
		this.renderComponents();
	}

	renderComponents() {
		this.renderSidebar();
		this.initTooltip();
	}

	renderSidebar() {
		const sidebar = new SideBar().element;
		this.root?.append(sidebar);
	}

	initTooltip() {
		const targets = Array.from<HTMLElement>(document.querySelectorAll("[tooltip]"));
		let params: { label: string; position: string; color: string };

		targets.forEach((target) => {
			if (!target.getAttribute("tooltip-label") && !target.getAttribute("tooltip-position")) return;

			params = {
				label: String(target.getAttribute("tooltip-label")),
				position: String(target.getAttribute("tooltip-position")),
				color: String(target.getAttribute("tooltip-color")),
			};

			new Tooltip(params.label, params.position, target, params.color);
		});
	}
}

new App();
