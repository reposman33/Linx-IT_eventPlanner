import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';

@Component({
	selector: 'events-detail',
	templateUrl: './events-detail.component.html',
	styleUrls: ['./events-detail.component.scss']
})
export class EventsDetailComponent implements OnInit {
	@Input()
	event: IEvent;
	eventDate: string;
	dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	constructor() { }

	ngOnInit(): void {
		this.eventDate = new Date(this.event.eventDate).toLocaleDateString(navigator.language, this.dateFormatOptions)
	}

}
