import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from './home/home.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatDialogModule, MatRadioModule, MatButtonModule, MatListModule, MatOptionModule, MatSelectModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from './backend.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    BackendService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
