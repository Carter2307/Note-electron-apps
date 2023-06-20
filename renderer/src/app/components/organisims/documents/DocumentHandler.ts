import Components from "../../../class/Components";

export class DocumentHandler extends Components {
	static getOneDocument(id: string, datas: any): any {
		let data = {};
		datas.forEach((d: any) => {
			if (d.id === id) {
				data = d;
			}
		});

		return data;
	}
}
