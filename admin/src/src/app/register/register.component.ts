import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

import { IUser } from '../models/user';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;

  registerForm: FormGroup;
  @ViewChild(FormGroupDirective, {static: false}) formGroupDirective: FormGroupDirective;

  constructor(
    private backendService: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('',[Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(registerFormInstance) {
    if (this.registerForm.valid) {
      this.registerUser(registerFormInstance);
    }
  }

  private registerUser(registerFormData) {
    const formContent: IUser = {
      username: registerFormData.username,
      email: registerFormData.email,
      password: registerFormData.password,
      firstname: registerFormData.firstname,
      lastname: registerFormData.lastname,
      categoryOne: null,
      categoryTwo: null,
      categoryThree: null,
    };
    console.log(registerFormData);

    // send to backend and if correct, do redirection to login
    this.backendService.register(formContent).subscribe(data => {
      if (data['success'])  {
        this.router.navigate(['login']);
      } else {
        alert('Sign up failed! Check your info again!');
      }
    });

    this.formGroupDirective.resetForm();
  }

}
