import { DataTransporter } from "../services/DataTransporter.service";

export default class Components extends DataTransporter {
	constructor() {
		super();
	}
	createElement<T>(type: string, options: object): T {
		return <T>Object.assign(document.createElement(`${type}`), {
			...options,
		});
	}

	appendChild<T extends Element>(element: T | HTMLElement, targets: T[] | HTMLElement[]) {
		targets.forEach((target) => {
			element.appendChild(target);
		});
	}

	deleteElement() {}
}
