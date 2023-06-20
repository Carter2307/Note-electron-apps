export class DataTransporter {
	static async getDocumentDatas(type: string): Promise<DocumentDataType[]> {
		const data = await window.documentDatas.getDatas(type);
		return data;
	}

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
