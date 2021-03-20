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
	sortColumn = "name";
	sortDirection = "down";
	displayDateFormat: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	constructor() { }

	ngOnInit(): void {
		this.allEvents = (allEventsJsonData as any).default.events;
		this.columnNames = Object.keys(this.allEvents[0]);
		// we don't display the id column
		this.columnNames.splice(0, 1);
		this.sortByColumn(this.allEvents, this.sortColumn, this.sortDirection)
	}

	formatDate(date: Date): string {
		return new Date(date).toLocaleDateString(navigator.language, this.displayDateFormat);
	}

	/**
	 * retrieve the sortcolumn and sortdirection from the meta attrbutes of the clicked element

	* @param e - the click event of the chevron element the user clicked
	 */
	sort(e) {
		// retrieve the sortdirection (up | down)
		this.sortDirection = e.target.classList.value.substr(e.target.classList.value.indexOf('bi-chevron') + 'bi-chevron'.length + 1);
		// retrieve the sortcolumn 
		this.sortColumn = e.target.dataset.column;
		this.sortByColumn(this.allEvents, this.sortColumn, this.sortDirection)
	}

	/**
	 * sort - perfornm the sort
	 * @param list - list to be sorted
	 * @param column - sortcolumn
	 * @param dir - sortdirection
	 * @returns - void
	 * @side_effects - The sort() method sorts the elements of an array in place. No use returning a sorted list and assigning to eventsList.
	 */
	sortByColumn(list, column, dir) {
		column.toLowerCase().indexOf('date') > -1
			// sort by date
			? list.sort((d1, d2) => this.sortByDate(d1, d2, column, dir))
			// sort by string
			: list.sort((el1, el2) => this.sortAlphabetically(el1, el2, column, dir))
	}

	/**
	 * 
	 * @param el1 - the first element to be sorted
	 * @param el2 - the second element to be sorted
	 * @param col - the column being sorted
	 * @param dir - the sort direction
	 * @returns number (0 | 1 | -1)
	 */
	sortAlphabetically(el1, el2, col, dir) {
		return dir === "up" ?
			(el1[col] < el2[col] ? -1 : el1[col] > el2[col] ? 1 : 0) :
			dir === "down" ?
				(el1[col] > el2[col] ? -1 : el1[col] < el2[col] ? 1 : 0) : 0
	}

	/**
	 *
	 * @param d1 - the first element to be sorted
	 * @param d2 - the second element to be sorted
	 * @param col - the column being sorted ('eventDate')
	 * @param dir - the sort direction
	 * @returns number (0 | 1 | -1)
	 */
	sortByDate(d1, d2, col, dir) {
		return dir === "up"
			? (new Date(d1[col]) < new Date(d2[col]) ? -1 : new Date(d1[col]) > new Date(d2[col]) ? 1 : 0)
			: dir === "down"
				? (new Date(d1[col]) < new Date(d2[col]) ? 1 : new Date(d1[col]) > new Date(d2[col]) ? -1 : 0)
				: 0
	}
}
