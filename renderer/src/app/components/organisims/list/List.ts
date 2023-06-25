import Components from "../../../class/Components";
import { Button } from "../../atoms/Button";
import Text from "../../atoms/Text";
import { Search } from "../../molecules/Search";
import Documents from "../documents/Documents";

export default class List extends Components {
	element: HTMLDivElement;
	datas: TaskDocument[];
	type: DocType;
	constructor(type: DocType, datas: any) {
		super();
		this.datas = datas;
		this.type = type;
		this.element = this.createListElement();
	}

	private createListElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "page-list",
		});

		const search = new Search([]);

		const content = this.createElement<HTMLUListElement>("ul", {
			className: "page-list-content",
		});

		this.datas.forEach((item: any) => {
			const i = {
				title: item.title,
				description: item.description,
				createAt: item.createAt,
			};

			const id = item.id;

			const itemElement = this.createElement<HTMLLIElement>("li", {
				className: "page-list-content-item",
				onclick: (e: Event) => {
					e.preventDefault();
					const doc = Documents.openDocument(id, this.type, this.datas);
				},
			});

			itemElement.setAttribute("document-id", id);

			const itemTitle = new Text({ value: i.title, type: "h3", className: "page-list-content-item-title" });
			const itemDate = new Text({ value: i.createAt, type: "p", className: "page-list-content-item-date" });
			const itemDescription = new Text({ value: i.description, type: "p", className: "page-list-content-item-description" });

			const itemHead = this.createElement<HTMLDivElement>("div", {
				className: "page-list-content-item-content",
			});

			this.appendChild(itemHead, [itemTitle.ELEMENT, itemDate.ELEMENT]);
			this.appendChild(itemElement, [itemHead, itemDescription.ELEMENT]);
			this.appendChild(content, [itemElement]);
		});

		const container = this.createElement<HTMLDivElement>("div", {
			className: "page-list-container",
		});

		const cta = this.createElement<HTMLDivElement>("div", {
			className: "page-list-cta",
		});

		const button = new Button("Add document", "primary", "md", "button", () => {
			console.log("create new document by type");
		});

		this.appendChild(container, [content]);
		this.appendChild(cta, [button.element]);
		this.appendChild(element, [search.element, container, cta]);

		return element;
	}

	find() {}
	add() {}
	remove() {}
	edit() {}
}
