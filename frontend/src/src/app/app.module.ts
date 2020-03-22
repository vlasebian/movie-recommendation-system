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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

// import { JwtInterceptor } from './_helpers/jwt.interceptor';
// import { ErrorInterceptor } from './_helpers/error.interceptor';

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
    // HttpClient,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
