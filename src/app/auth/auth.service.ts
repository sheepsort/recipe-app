import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

import { AuthResponseData } from './auth.interface';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: string;
    }  = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage =
            'Looks like we tried that too many times! Try again later.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage =
            'Either the email or password was incorrect. Please try again.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage =
            'Either the email or password was incorrect. Please try again.';
          break;
        default:
          errorMessage = 'Whoops! Looks like something went wrong.';
          break;
      }
      return throwError(errorMessage);
    }
  }
}
