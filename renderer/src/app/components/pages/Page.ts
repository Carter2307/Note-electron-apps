import Components from "../../class/Components";
import Documents from "../organisims/documents/Documents";
import List from "../organisims/list/List";

export class Page extends Components {
	type: string;
	list: List | any;
	element: HTMLDivElement;

	constructor(type: string) {
		super();
		this.type = type;
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

		const root = document.querySelector("#app");
		const oldPage = root?.querySelector(".page");

		this.createList().then((list) => {
			if (oldPage) {
				root?.removeChild(oldPage);
			}
			this.appendChild(element, [list.element, pageDocument]);
			root?.appendChild(element);
		});

		return element;
	}

	async createList() {
		this.pageHandler(this.type);
		const datas: TaskDocument[] = await Documents.getDocumentDatas(this.type);
		const list: List = new List(this.type, datas);
		this.list = list;

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
