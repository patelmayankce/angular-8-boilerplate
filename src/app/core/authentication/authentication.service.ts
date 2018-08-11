import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from '@app/core/local-storage.service';

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Authentication.Credentials | null;
  public credentials$ = new EventEmitter<Authentication.Credentials>();

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const savedCredentials = this.localStorageService.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  login(
    payload: Authentication.LoginPayload
  ): Observable<Authentication.Credentials> {
    return this.httpClient.post('/login', payload).pipe(
      map((body: Authentication.Credentials) => {
        this.setCredentials(body);
        return body;
      })
    );
  }

  signup(
    payload: Authentication.SignupPayload
  ): Observable<Authentication.User> {
    return this.httpClient.post('/signup', payload).pipe(
      map((body: Authentication.User) => {
        return body;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    return this.httpClient
      .post('/logout', {
        sessionId: this.credentials.session
      })
      .pipe(
        map(() => {
          this.setCredentials();
          return true;
        })
      );
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Authentication.Credentials | null {
    return this._credentials;
  }

  /**
   * Get the auth token.
   * @return {string} The auth token is null if user is not authenticated.
   */
  get accessToken(): string | null {
    return this.credentials ? this.credentials.accessToken : null;
  }

  /**
   * Sets the user credentials.
   * @param {Credentials=} Authentication.Credentials The user credentials.
   */
  private setCredentials(credentials?: Authentication.Credentials) {
    this._credentials = credentials || null;
    if (credentials) {
      this.localStorageService.setItem(
        credentialsKey,
        JSON.stringify(credentials)
      );
      this.credentials$.emit(this._credentials);
    } else {
      this.localStorageService.clearItem(credentialsKey);
    }
  }
}
