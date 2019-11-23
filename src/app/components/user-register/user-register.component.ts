import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlService } from 'src/app/services/form-control.service';
import { MatSnackBar, MatSnackBarRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  private cancelButtonInfo = 'Go back to user list'
  private registerForm: FormGroup;
  private passInfo: string
  private editData: any
  private procedure: string
  constructor(
    private _userDataService: UserDataService,
    private _router: Router,
    public formMessages: FormControlService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

    this.registerForm = this.fb.group({
      ID: ['', Validators.required],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*([0-9].*){2})[a-zA-Z0-9]{6,14}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*([0-9].*){2})[a-zA-Z0-9]{6,14}$')]]
    },
      {
        validator: PasswordValidation.validateEqual
      });

    this.editData = this._router.getCurrentNavigation().extras.state


    this.passInfo = `Your password must contain:

      1.       6 to 14 characters.
      
      2.       At last  2 numbers.
      
      3.       Upper and lower case characters.
      
      4.       No special characters allowed.`
  }

  ngOnInit() {
    if (this.editData) {
      this.procedure = 'Edit User'
      console.log(this.editData.ID);
      this.registerForm.controls.ID.setValue(this.editData.ID)
      this.registerForm.controls.UserName.setValue(this.editData.UserName)
      this.registerForm.controls.Password.setValue(this.editData.Password)

    } else {
      this.procedure = 'Regist User'
    }

  }


  methodToUse() {
    let userData = {
      ID: this.registerForm.value.ID,
      UserName: this.registerForm.value.UserName,
      Password: this.registerForm.value.Password
    }
    if (this.editData) {
this.editUser(userData)
    } else {
      this.registUser(userData)
    }
  }

private editUser(userData){
this._userDataService.editUser(this.editData.ID, userData).subscribe(data=>{
  console.log(data);
  this.dialog.open(ConfirmDialogComponent,{
    data:data
  })
})
}


  private registUser(userData) {

    console.log(userData);
    this._userDataService.registUser(userData).subscribe(
      (data: any) => {
        this._snackBar.open(`User has been added.`, `User: ${data.UserName}.`, {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this._router.navigate(['user-list'])
        });
        (error: any) => {
          this._snackBar.open(`User registration`, 'Failed', {
            duration: 3000,
          });
        }
      })
  }

  resetForm() {
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
