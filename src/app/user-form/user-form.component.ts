import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
	@Input()
	eventId: string;

	constructor() { }

	ngOnInit(): void {
	}

}
