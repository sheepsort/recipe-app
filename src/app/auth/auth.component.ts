import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        } else {
            const email = form.value.email;
            const password = form.value.password;

            let authObs: Observable<AuthResponseData>;

            this.isLoading = true;
            if (!this.isLoginMode) {
                authObs = this.authService.signup(email, password);
            } else {
                authObs = this.authService.login(email, password);
            }

            authObs.subscribe(
                    resultData => {
                    console.log(resultData);
                    this.isLoading = false;
                    this.router.navigate(['/recipes']);
                }, errorResult => {
                    console.log(errorResult);
                    this.error = errorResult;
                    this.isLoading = false;
                }
            );
            form.reset();
        }
    }

    onHandleError() {
        this.error = null;
    }
}
