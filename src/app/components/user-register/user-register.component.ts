import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlService } from 'src/app/services/form-control.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  private cancelButtonInfo = 'Go back to user list'
  private registerForm: FormGroup
  constructor(
    private _userDataService: UserDataService,
    private _router: Router,
    public formMessages: FormControlService,
    private fb: FormBuilder) {
  
      this.registerForm = this.fb.group({
      ID: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: PasswordValidation.validateEqual
      })
  }

  ngOnInit() {

  }

  sendUser() {
    let userData = {
      ID: this.registerForm.value.ID,
      UserName: this.registerForm.value.UserName,
      Password: this.registerForm.value.Password
    }
    console.log(userData);
    // this._userDataService.registUser(userData).subscribe((data: any) => {
    //   console.log(data);
    //   this._userDataService.getUsers().subscribe(data => console.log(data)
    //   )
    // })
  }

  cancel() {
    this._router.navigate(['user-list'])
  }
}


export class PasswordValidation {

  static validateEqual(AC: AbstractControl) {

    let password = AC.get('Password').value; // to get value in input tag
    let conpassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != conpassword) {
      AC.get('confirmPassword').setErrors({ validateEqual: true })
    } else {
      return null
    }
  }
}
