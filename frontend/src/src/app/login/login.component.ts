import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { BackendService } from '../backend.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  returnUrl: string;

  loginForm: FormGroup;
  @ViewChild(FormGroupDirective, {static: false}) formGroupDirective: FormGroupDirective;

  constructor(
    private backendService: BackendService,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.backendService.logout();

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.returnUrl = '/home/grid';
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(loginFormInstance) {
    if (this.loginForm.valid) {
      this.checkLogin(loginFormInstance);
    }
  }

  private checkLogin(loginFormData) {
    // send to backend and if correct, do redirection to home
    this.backendService.login(loginFormData.username, loginFormData.password)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);

        localStorage.setItem('uid', data.uid);
        localStorage.setItem('username', loginFormData.username);
        localStorage.setItem('firstName', data.firstname);
        localStorage.setItem('lastName', data.lastname);
        localStorage.setItem('categoryOne', data.categoryOne);
        localStorage.setItem('categoryTwo', data.categoryTwo);
        localStorage.setItem('categoryThree', data.categoryThree);

        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        alert("Login failed!")
      });

    this.formGroupDirective.resetForm();
  }
}
