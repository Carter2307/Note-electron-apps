import Components from "../../class/Components";
import Documents from "../organisims/documents/Documents";
import List from "../organisims/list/List";

export class Page extends Components {
	type: DocType;
	list: List | any;
	element: HTMLDivElement;
	root: HTMLDivElement | null;

	constructor(type: DocType) {
		super();
		this.type = type;
		this.root = document.querySelector("#app");
		this.element = this.createPageElement();
	}

	private createPageElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: `page`,
		});

		element.setAttribute("pageType", this.type);

		const pageDocument = this.createElement<HTMLElement>("section", {
			className: `page-document`,
		});

		const oldPage = this.root?.querySelector(".page");

		this.createList().then((list) => {
			if (oldPage) {
				this.root?.removeChild(oldPage);
			}
			this.appendChild(element, [list.element, pageDocument]);
			this.root?.appendChild(element);
		});

		return element;
	}

	async createList() {
		this.pageHandler(this.type);
		const datas: TaskDocument[] = await Components.getDocumentDatas(this.type);
		const list: List = new List(this.type, datas);

		return list;
	}

	async pageHandler(type: string) {
		if (type === "settings") {
			this.modalHandler();
			return;
		}
	}

	modalHandler() {
		console.log("open setting modal");
	}
}
