import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsOverviewComponent } from './events/containers/events-overview/events-overview.component';
import { SubjectService } from './services/subject.service'

@NgModule({
	declarations: [
		AppComponent,
		EventsOverviewComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
	],
	providers: [SubjectService],
	bootstrap: [AppComponent]
})
export class AppModule { }
