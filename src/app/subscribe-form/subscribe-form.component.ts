import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { ISubscription } from "../models/subscription";
@Component({
	selector: 'subscribe-form',
	templateUrl: './subscribe-form.component.html',
	styleUrls: ['./subscribe-form.component.scss']
})
export class SubscribeFormComponent implements OnInit {
	// eventId is the attribute containing  the id of the event we subscribe to
	@Input() eventId: string;
	// we emit the subscribe event to let the parent component know we want to subscribe to an event;
	@Output() subscribe: EventEmitter<ISubscription> = new EventEmitter<ISubscription>();
	// we emit the hide event to hide the modal when finished subscribing
	@Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();
	subscribeForm: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.initForm()
	}

	initForm(): void {
	// set up the Reactive form instance of the subscribe form 
		this.subscribeForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')],
			dob: ['', Validators.required],
			city: ['', Validators.required],
			gender: ['', Validators.required],
	})
	}

	// gtter of form controls 
	get f() {
		return this.subscribeForm.controls;
	}

	// listens to the Subscribe button in the form and emits the subscribe event to the parent component. 
	onSubscribe() {
		// add current time of subscription - we display it later in the events overview 
		const subscription = Object.assign({}, { subscriber: this.subscribeForm.value }, { eventId: this.eventId, time: new Date() });
		// subscribe to event
		this.subscribe.emit(subscription);
		// hide modal
		this.hide.emit();
	}
}
