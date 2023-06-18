import Components from "../../class/Components";

export class Search extends Components {
	datas: any;
	element: HTMLDivElement;

	constructor(datas: any) {
		super();
		this.datas = datas;
		this.element = this.createSearchElement();
	}

	private createSearchElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "search",
		});

		const input = this.createElement<HTMLInputElement>("input", {
			className: "search-input",
			type: "seach",
			name: "document-seach",
			placeholder: "Search something...",
		});

		const icon = this.createElement<HTMLElement>("i", {
			className: "search-icon",
		});

		icon.classList.add("ri-search-2-line");

		this.appendChild(element, [input, icon]);

		return element;
	}
}
