import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiUrl='https://fakerestapi.azurewebsites.net/api/Users'

  constructor(private _htttp: HttpClient) { }

getUsers(){
  return this._htttp.get(`https://fakerestapi.azurewebsites.net/api/Users`).pipe(map((response:Response)=>{
    return response
  }))
}

}
