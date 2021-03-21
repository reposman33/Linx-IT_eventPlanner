import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsOverviewComponent } from './events/events-overview/events-overview.component';
import { SubjectService } from './services/subject.service';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { UserFormComponent } from './user-form/user-form.component'

@NgModule({
	declarations: [
		AppComponent,
		EventsOverviewComponent,
		EventsDetailComponent,
		ModalComponent,
		UserFormComponent,
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
