import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HostingRecapService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getHostings(){
    return this.http.get<any>(this.APIUrl + 'hostings');
  }

  checkCredentials(){
    return this.http.get<any>(this.APIUrl + 'check_credentials');
  }

  sendCredentials(credentials: any){
    return this.http.post<any>(this.APIUrl + 'credentials', credentials);
  }
  
}
