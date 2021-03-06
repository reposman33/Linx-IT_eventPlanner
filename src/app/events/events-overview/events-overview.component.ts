import { Component, OnInit } from '@angular/core';
import *  as  allEventsJsonData from '../data/allEvents.json';
import { SubjectService } from "../../services/subject.service";
import { IEvent } from "../../models/event";
import { ISubscription } from 'src/app/models/subscription';

@Component({
	selector: 'app-events-overview',
	templateUrl: './events-overview.component.html',
	styleUrls: ['./events-overview.component.scss']
})
export class EventsOverviewComponent implements OnInit {
	// the list of all events - not mutated
	allEvents: IEvent[];
	// since the eventslist is mutated when searching (by filtering out the events not containing the searchstring) we need to have a working copy.
	events: IEvent[];
	columnNames: string[];
	// initial sortcolumn 
	sortColumn = "eventDate";
	// initial sortdirection 
	sortDirection = "down";
	// the columns with these names are sortable
	sortableColumns = ["name", "eventDate"];
	displayDateFormat: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	// if defined, this triggers the display of a modal with event details
	selectedEvent: IEvent;
	// if defined, this triggers the display of a modal with subscription form
	eventId: string;
	// an object containing all subscriptions
	subscriptions = {};

	constructor(private subjectService: SubjectService) { }

	ngOnInit(): void {
		this.allEvents = (allEventsJsonData as any).default.events;
		this.events = this.clone(this.allEvents);
		this.columnNames = ["eventDate", "name", "category"];
		// do the initial sort
		this.sortByColumn(this.events, this.sortColumn, this.sortDirection)
		this.subjectService.subject.subscribe((query: string) => this.events = this.filterEvents(this.events, query))
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
		// do the sort
		this.sortByColumn(this.events, this.sortColumn, this.sortDirection)
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

	filterEvents(events: IEvent[], query: string) {
		return query.length !== 0
			// filter all events containing querystring
			? events.filter(ev => this.objectContainsString(ev, query))
			// when no searchstring provided, return list of all events
			: this.allEvents
	}

	/**
	 * - the callback function for the array some() method. Allow only to search by name
	 * @param ob - object to search
	 * @param query - querystring to search for in object
	 * @returns boolean - whether the object contains the querystring
	 */
	objectContainsString(ob: IEvent, query: string) {
		return ob.name.indexOf(query) > -1
	}

	/**
	 * - make a clone of the eventsList so mutating it does not affect the original
	 * @param arr - the array to clone
	 * @returns {Array} - a clone of the array
	 */
	clone(arr) {
		return arr.concat()
	}

	hideModal() {
		// modal event details
		this.selectedEvent = null;
		// modal subscribe to event
		this.eventId = null;
	}

	/**
	 * oen a modal containng event detail infpo
	 * @param $event - the event object. 
	 * @param event - the event to display
	 */
	openEventDetailModal($event, event) {
		$event.stopPropagation()
		this.selectedEvent = event;
	}

	/**
	 * 
	 * @param $event - the event object.
	 * @param eventId - the id of the event to subscribe to 
	 */
	openSubscribeEventModal($event, eventId) {
		$event.stopPropagation()
		this.eventId = eventId;
	}

	/**
	 * 
	 * @param subscription  - subscription info to store - locally for now
	 */
	subscribeToEvent(subscription: ISubscription) {
		this.subscriptions[subscription.eventId] = subscription;
	}
}
