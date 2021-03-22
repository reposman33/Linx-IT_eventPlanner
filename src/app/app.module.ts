import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsOverviewComponent } from './events/events-overview/events-overview.component';
import { SubjectService } from './services/subject.service';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { ModalComponent } from './modal/modal.component';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component'

@NgModule({
	declarations: [
		AppComponent,
		EventsOverviewComponent,
		EventsDetailComponent,
		ModalComponent,
		SubscribeFormComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [SubjectService],
	bootstrap: [AppComponent]
})
export class AppModule { }
