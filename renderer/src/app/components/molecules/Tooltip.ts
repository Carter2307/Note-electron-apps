import Components from "../../class/Components";

export default class Tooltip extends Components {
	label: string;
	position: string;
	target: HTMLElement;
	element: HTMLElement | HTMLDivElement;
	intervalId: number;
	mode: string;

	constructor(label: string, position: string, target: HTMLElement, mode?: string) {
		super();
		this.label = label;
		this.position = position;
		this.target = target;
		this.intervalId = 0;
		this.mode = mode || "dark";
		this.element = this.createTooltipElement();

		this.eventListener();
	}

	private calcPosition() {
		return {
			margin: 16,

			targetops: {
				height: this.target.offsetHeight,
				width: this.target.offsetWidth,
				left: this.target.getBoundingClientRect().x,
				top: this.target.getBoundingClientRect().y,
				right: window.innerWidth - this.target.getBoundingClientRect().x - this.target.getBoundingClientRect().width,
				bottom: window.innerWidth - this.target.getBoundingClientRect().y - this.target.getBoundingClientRect().width,
			},

			tooltipsops: {
				height: this.element.offsetHeight,
				width: this.element.offsetWidth,
			},
		};
	}

	private setPosition(options: any) {
		if (this.position !== "right") {
			return;
		}

		if (options.targetops.right < options.tooltipsops.width) {
			//basculer à droite
			return;
		}

		console.log(options);

		this.element.style.left = `${options.targetops.left + options.targetops.width + options.margin}px`;
		this.element.style.top = `${options.targetops.top - options.tooltipsops.height / 2}px`;
		// this.element.style.top = `${options.targetops.top - options.margin - options.tooltipsops.height}px`;
		// this.element.style.left = `${options.targetops.left - (options.tooltipsops.width - options.targetops.width) / 2}px`;
	}

	private eventListener() {
		this.target.addEventListener("mouseenter", this.onMouseOver.bind(this));
		this.target.addEventListener("mouseleave", this.onMouseLeave.bind(this));
	}

	private onMouseOver(e: Event) {
		e.preventDefault();
		document.body.append(this.element);

		let position = this.calcPosition();
		this.setPosition(position);

		this.intervalId = window.setTimeout(() => {
			this.show();
		}, 2000);
	}

	private onMouseLeave(e: Event) {
		e.preventDefault();
		this.hide();
		this.destroy();
		window.clearInterval(this.intervalId);
	}

	private createTooltipElement() {
		const element = this.createElement<HTMLDivElement>("div", {
			className: "tooltip",
		});

		element.setAttribute("position", this.position);
		element.setAttribute("label", this.label);

		const content = this.createElement<HTMLSpanElement>("span", {
			className: "tooltip-content",
		});

		const label = this.createElement<HTMLSpanElement>("span", {
			className: "tooltip-label",
			textContent: this.label,
		});

		this.appendChild(content, [label]);

		const arrow = this.createElement<HTMLDivElement>("div", {
			className: "tooltip-arrow",
		});

		this.appendChild(element, [content, arrow]);

		return element;
	}

	show() {
		if (this.mode === "dark") {
			this.element.classList.add("tooltip-visible-dark");
		} else {
			this.element.classList.add("tooltip-visible-white");
		}
	}

	hide() {
		this.element.className = "tooltip";
	}

	destroy() {
		document.body.removeChild(this.element);
	}
}
