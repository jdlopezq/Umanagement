import { Component, OnInit, Inject } from '@angular/core';
import { MatGridTile, MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})
export class UserEditionComponent implements OnInit {


  tiles = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 2, rows: 1, color: 'lightgreen' },
  ];


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<UserEditionComponent>,
    private _router: Router,
    private _userservice: UserDataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  editUser() {
    let navigationExtras: NavigationExtras = {
      state: this.data
    }
    this.bottomSheetRef.dismiss()
    this._router.navigate(['user-register'], navigationExtras)
  }


  deleteUser() {
    this._userservice.deleteUser(this.data.ID).subscribe(data => {
      this.bottomSheetRef.dismiss()
      this.bottomSheetRef.afterDismissed().subscribe(() => {
        this._snackBar.open(`User has been deleted.`, '!', {
          duration: 2000,
        });

      })
    })
  }


}
