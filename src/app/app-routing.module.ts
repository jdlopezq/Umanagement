import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';


const routes: Routes = [
{path: 'user-list', component:UserListComponent},
{path: 'user-register', component: UserRegisterComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'user-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
