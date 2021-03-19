import { Component, OnInit } from '@angular/core';
import  *  as  allEventsJsonData  from  '../../data/allEvents.json';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss']
})
export class EventsOverviewComponent implements OnInit {

  allEvents = [];

  constructor() { }

  ngOnInit(): void {
    this.allEvents = (allEventsJsonData as any).default;
  }

}
