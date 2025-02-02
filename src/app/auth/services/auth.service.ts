import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Login, MobileNumber, User } from '../interface/auth';
import { Endpoints } from 'src/app/config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private http = inject(HttpClient)
  constructor(private http:HttpClient) { }

// register user using mobile number
  registerMobileNumber(MobileNumber: number): Observable<MobileNumber> {
    return this.http.post<MobileNumber>(`${environment.apiUrl}${Endpoints.AUTH.ADDMOBILE}`,{ mobile_number: MobileNumber });
  }
  // get user by mobile number
  getUserByMobileNumber(mobile_number: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${Endpoints.AUTH.GETUSERBYMOBILENUMBER}/${mobile_number}`);
  }

  // send otp to user
  sendOtp(user_id:string):Observable<User>{
  return this.http.get<User>(`${environment.apiUrl}${Endpoints.AUTH.SENDOTP}/${user_id}`);
  
}
// verify otp from user
verifyOtp(user_id: any, inputOtp: number):Observable<User> {
  return this.http.post<User>(`${environment.apiUrl}${Endpoints.AUTH.VERIFYOTP}/${user_id}`, { otp: +inputOtp });
}

// Update the User Profile

updateProfile(user_id:any, data:User):Observable<User>{
  return this.http.post<User>(`${environment.apiUrl}${Endpoints.AUTH.PROFILE}/${user_id}`,data);

}
// update gender 
updateGender(user_id:any, gender:any):Observable<User>{
  return this.http.post<User>(`${environment.apiUrl}${Endpoints.AUTH.GENDER}/${user_id}`,{gender});
  
}
// update user interest 
updateInterest(user_id:any, interests:any):Observable<User>{
  return this.http.post<User>(`${environment.apiUrl}${Endpoints.AUTH.INTEREST}/${user_id}`,{interests});
  
}
// set User password
setUserPassword(user_id:any, password:string):Observable<User>{
  return this.http.post<User>(`${environment.apiUrl}${Endpoints.AUTH.PASSWORD}/${user_id}`,{password});

}

login(loginData:Login):Observable<Login>{
  return this.http.post<Login>(`${environment.apiUrl}${Endpoints.AUTH.LOGIN}`,loginData);

}



}
