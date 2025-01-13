import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private http:HttpClient ) { }

private API_URL = environment.COURSE_API;
authenticate = 'auth/get-verified-users'

getTotalCount():Observable<{totalCount:number}> {
  return this.http.get<{totalCount:number}>(`${this.API_URL}${this.authenticate}`)
}


}
