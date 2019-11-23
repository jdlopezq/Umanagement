import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserEditionComponent } from './components/user-edition/user-edition.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserRegisterComponent,
    UserEditionComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[UserEditionComponent,ConfirmDialogComponent]
})
export class AppModule { }
