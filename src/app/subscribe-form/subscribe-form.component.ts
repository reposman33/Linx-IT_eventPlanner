import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ISubscription } from "../models/subscription";
@Component({
	selector: 'subscribe-form',
	templateUrl: './subscribe-form.component.html',
	styleUrls: ['./subscribe-form.component.scss']
})
export class SubscribeFormComponent {
	// eventId is the attribute containing  the id of the event we subscribe to
	@Input() eventId: string;
	// we emit the subscribe event to let the parent component know we want to subscribe to an event;
	@Output() subscribe: EventEmitter<ISubscription> = new EventEmitter<ISubscription>();
	// we emit the hide event to hide the modal when finished subscribing
	@Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();

	// set up the Reactive form instance of the subscribe form 
	subscribeForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', Validators.email),
		dob: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		gender: new FormControl('', Validators.required),
	})

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
