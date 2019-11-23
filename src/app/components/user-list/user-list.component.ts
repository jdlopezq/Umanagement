import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatBottomSheet, MatTable, MatSort, MatPaginator } from '@angular/material';
import { userData } from 'src/app/shared/user.interface';
import { UserEditionComponent } from '../user-edition/user-edition.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  private dataSource = new MatTableDataSource<userData>()
  private displayedColumns: Array<string> = []
  private dataReady = true
  private registUserButtonInfo = 'Regist a new user'

  constructor(
    private _userDataService: UserDataService,
    private _router: Router,
    private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this._userDataService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.displayedColumns = Object.keys(data[0])
      this.dataSource.data = data
      this.dataReady = false
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  highlight(row) {
    console.log(row);
    this._bottomSheet.open(UserEditionComponent,
      {
        data: row
      })
  }



  registUser() {
    this._router.navigate(['user-register'])
  }

}
