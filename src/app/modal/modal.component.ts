import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
	@Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void {
	}

	hideModal() {
		this.hide.emit(true)
	}
}
