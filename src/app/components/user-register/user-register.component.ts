import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlService } from 'src/app/services/form-control.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  private cancelButtonInfo = 'Go back to user list'
  private registerForm: FormGroup;
  private passInfo
  constructor(
    private _userDataService: UserDataService,
    private _router: Router,
    public formMessages: FormControlService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {
  
      this.registerForm = this.fb.group({
      ID: ['', Validators.required],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*([0-9].*){2})[a-zA-Z0-9]{6,14}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*([0-9].*){2})[a-zA-Z0-9]{6,14}$')]]
    },
      {
        validator: PasswordValidation.validateEqual
      })
      this.passInfo=`Your password must contain:

      1.       6 to 14 characters.
      
      2.       At last  2 numbers.
      
      3.       Upper and lower case characters.
      
      4.       No special characters allowed.`
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
    this._userDataService.registUser(userData).subscribe(
      (data: any) => {
      this._snackBar.open(`User: ${data.UserName} registration`, 'Succeeded', {
        duration: 2000,
      });
     ( error: any)=>{
      this._snackBar.open(`User registration`, 'Failed', {
        duration: 2000,
      });
     }
    })
  }

  resetForm(){
    this.registerForm.reset()
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
