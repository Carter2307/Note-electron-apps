import { TasksDocument } from "../documents/TaskDocument";

export default class Documents {
	static openDocument(id: string, type: DocType, datas: TaskDocument[]) {
		const documentData: TaskDocument = this.getDocument(id, datas);
		switch (type) {
			case "tasksDocuments":
				new TasksDocument(documentData.id, documentData.title, documentData.description, documentData.tasks);
		}
	}

	static async getDocumentDatas(type: string) {
		const data = await window.documentDatas.getDatas(type);
		return data;
	}

	static getDocument(id: string, datas: any): any {
		let data = {};
		datas.forEach((d: any) => {
			if (d.id === id) {
				data = d;
			}
		});

		return data;
	}
}
