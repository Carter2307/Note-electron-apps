export class DateString {
	dateString: string;
	start: number;
	elapsed: number;
	time;

	constructor() {
		this.dateString = "";
		this.start = Date.now();
		this.elapsed = 0;
		this.time = {
			second: this.elapsed,
			minute: 0,
			hour: 0,
			day: 0,
			week: 0,
			month: 0,
			year: 0,
		};
		this.timeFormated();
	}

	timeFormated() {
		setInterval(() => {
			this.elapsed = Math.floor((Date.now() - this.start) / 1000);
			this.time.second = this.elapsed;
			this.time.minute = this.time.second / 60;
			this.time.hour = this.time.minute / 60;
			this.time.day = this.time.hour / 24;
			this.time.week = this.time.day / 7;
			this.time.month = this.time.week / 4;
			this.time.year = this.time.month / 12;

			if (this.time.second <= 60) {
				this.dateString = `${this.time.second}s ago`;
			} else if (this.time.second >= 60) {
				this.dateString = `${Math.floor(this.time.minute)}min ago`;
			} else if (this.time.minute >= 60) {
				this.dateString = `${Math.floor(this.time.hour)}hour ago`;
			} else if (this.time.hour >= 24) {
				this.dateString = `${Math.floor(this.time.day)}day ago`;
			} else if (this.time.day >= 7) {
				this.dateString = `${Math.floor(this.time.week)}week ago`;
			} else if (this.time.week >= 4) {
				this.dateString = `${Math.floor(this.time.month)}month ago`;
			} else if (this.time.month >= 12) {
				this.dateString = `${Math.floor(this.time.year)}year ago`;
			}
		}, 1000);
	}
}
