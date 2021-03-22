import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ISubscribeForm } from "../models/subscribe-form";
@Component({
	selector: 'user-form',
	templateUrl: './subscribe-form.component.html',
	styleUrls: ['./subscribe-form.component.scss']
})
export class SubscribeFormComponent implements OnInit {
	@Input()
	eventId: string;
	subscribeForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', Validators.email),
		dob: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		gender: new FormControl('', Validators.required),
	})
	constructor() { }

	ngOnInit() {
	}

	submit() {
	}

	get f() {
		return this.subscribeForm.controls;
	}
}
