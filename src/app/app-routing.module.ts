import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsOverviewComponent } from './events/events-overview/events-overview.component';

const routes: Routes = [{ path: "", component: EventsOverviewComponent }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
