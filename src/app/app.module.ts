import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './tasks/tasks.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from '@full-fledged/alerts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbCollapseModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 6000, positionX: 'right', positionY: 'top'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
