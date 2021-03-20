import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

/**
 * this service acts as a bridge bwetween a component that calls the service search() method and a component that listens to the Subject by subscribing to it. 
 */
@Injectable({
	providedIn: 'root'
})
export class SubjectService {
	public subject = new Subject<string>();
	subscriber$ = this.subject.subscribe();

	search(q: string) {
		this.subject.next(q)
	}
}
