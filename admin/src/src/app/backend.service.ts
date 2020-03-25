import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IUser } from './models/user';
import { ILogin } from './models/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const endpoint = 'http://localhost:4200/api/';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private httpClient : HttpClient,
  ) { }

  private handleError() {
    console.log("here");
    return (error: any) => {
      console.error(error);
      return throwError(error);
    }
  }

  /** Interface */

  private get<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(endpoint + url, { params }).pipe(
      catchError(this.handleError()));
  }

  private post<T>(url: string, body: T): Observable<T> {
    return this.httpClient.post<T>(endpoint + url, body, httpOptions).pipe(
      catchError(this.handleError()));
  }

  private patch<T>(url: string, body: any | null): Observable<T> {
    return this.httpClient.patch<T>(endpoint + url, body).pipe(
      catchError(this.handleError()));
  }

  private put<T>(url: string, body: any | null): Observable<T> {
    return this.httpClient.put<T>(endpoint + url, body).pipe(
      catchError(this.handleError()));
  }

  private delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(endpoint + url).pipe(
      catchError(this.handleError()));
  }

  /** Movies */

  public addMovie(fd: FormData) {
    return this.httpClient.post(endpoint + 'movies/add', fd);
  }

  /** This should be moved to a separate service for authentication */

  public login(username: string, password: string) {
    return this.httpClient.post<any>(endpoint + 'users/login', { username, password }).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }

  public register(userData: IUser): Observable<ILogin> {
    return this.post<ILogin>('users/register', userData);
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
