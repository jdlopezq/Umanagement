import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private dialogRef:MatDialogRef<ConfirmDialogComponent>,
  private _router: Router) { }

  ngOnInit() {
    console.log(this.data);
    
  }
  close(){
    this.dialogRef.close()
    this.dialogRef.afterClosed().subscribe(()=>{
this._router.navigate(['user-list'])
    })
  }
}
