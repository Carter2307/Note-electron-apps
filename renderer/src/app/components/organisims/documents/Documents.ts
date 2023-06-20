import { TasksDocument } from "../documents/TaskDocument";
import { DocumentHandler } from "./DocumentHandler";

export default class Documents extends DocumentHandler {
	static openDocument(id: string, type: DocType, datas: TaskDocument[]) {
		const documentData: TaskDocument = this.getOneDocument(id, datas);

		console.log(documentData.tasks);

		switch (type) {
			case "tasksDocuments":
				new TasksDocument(documentData);
		}
	}
}
