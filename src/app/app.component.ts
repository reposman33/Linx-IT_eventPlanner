import { Component } from '@angular/core';
import { SubjectService } from "./services/subject.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'EventPlanner';
	isCollapsed = true;

	constructor(private subjectService: SubjectService) { }

	search(q) {
		this.subjectService.search(q);
	}

	showAllEvents(e) {
		this.search("");
	}
}
