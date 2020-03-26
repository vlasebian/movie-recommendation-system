import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ILogin } from './models/login';
import { IUser } from './models/user';

import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const endpoint = environment.endpoint;

@Injectable()
export class BackendService {
  constructor(private httpClient : HttpClient) { }

  private handleError() {
    return (error: any) => {
      console.error(error);
      return throwError(error);
    }
  }

  /** Interface */

  private post<T>(url: string, body: T): Observable<T> {
    return this.httpClient.post<T>(endpoint + url, body, httpOptions).pipe(
      catchError(this.handleError())
    );
  }

  /** Movies */

  public addMovie(fd: FormData) {
    return this.httpClient.post(endpoint + 'movies/add', fd);
  }

  /** Authentication */

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
