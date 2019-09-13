import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { stringify } from 'querystring';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        } else {
            const email = form.value.email;
            const password = form.value.password;
            const token = true;

            this.isLoading = true;
            if (!this.isLoginMode) {
                this.authService.signup(email, password, token).subscribe(
                    resultData => {
                        console.log(resultData);
                        this.isLoading = false;
                    }, errorResult => {
                        this.isLoading = false;
                    }
                );
            } else {
                // ...
            }
            form.reset();
        }
    }
}
