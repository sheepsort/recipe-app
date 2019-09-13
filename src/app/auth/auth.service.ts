import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthResponseData } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor(private http: HttpClient) {}
  
  signup(email: string, password: string, token: boolean) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4_wgZ6zmTUACoS7fxVlUUkLhj1Ir7XYE',
        {
          email,
          password,
          returnSecureToken: token
        }
      )
      .pipe(catchError(errorRes => {
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
                default:
                  errorMessage = 'Whoops! Looks like something went wrong.';
                  break;
              }
              return throwError(errorMessage);
          }
      }));
  }

}
