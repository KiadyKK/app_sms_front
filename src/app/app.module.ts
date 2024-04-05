import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbAlertModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import {
  BoardComponent,
  CustomAdapter,
  CustomDateParserFormatter,
} from './components/board/board.component';
import { RdzComponent } from './components/rdz/rdz.component';
import { UserComponent } from './components/user/user.component';
import { HistoryComponent } from './components/history/history.component';
import { JsonPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { spinnerInterceptorProviders } from './helpers/spinner.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    RdzComponent,
    UserComponent,
    HistoryComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    JsonPipe,
    NgSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    authInterceptorProviders,
    spinnerInterceptorProviders,
    BnNgIdleService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
