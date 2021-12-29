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
  
}
