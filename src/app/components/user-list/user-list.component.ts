import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { userData } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private dataSource = new MatTableDataSource<userData>()
  private displayedColumns: Array<string> = []
  private dataReady=true
private registUserButtonInfo='Regist a new user'
  constructor(private _userDataService: UserDataService,
    private _router: Router) { }

  ngOnInit() {
    this._userDataService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.displayedColumns = Object.keys(data[0])
      this.displayedColumns.push('Options')
      this.dataSource.data = data
      this.dataReady=false
    })

  }


registUser(){
this._router.navigate(['user-register'])
}

}
