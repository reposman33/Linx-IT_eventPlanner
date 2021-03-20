import { Component, OnInit } from '@angular/core';
import *  as  allEventsJsonData from '../../data/allEvents.json';

@Component({
	selector: 'app-events-overview',
	templateUrl: './events-overview.component.html',
	styleUrls: ['./events-overview.component.scss']
})
export class EventsOverviewComponent implements OnInit {
	allEvents = [];
	columnNames: string[];
	displayDateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	constructor() { }

	ngOnInit(): void {
		this.allEvents = (allEventsJsonData as any).default.events;
		this.columnNames = Object.keys(this.allEvents[0]);
		this.columnNames.splice(0, 1);
	}

	formatDate(date: Date): string {
		return new Date(date).toLocaleDateString(navigator.language, this.displayDateFormat);
	}

}
