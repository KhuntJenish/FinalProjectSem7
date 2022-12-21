import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class NetworkApiService {
  constructor(private _http:HttpClient) {}
  rootURL = 'http://localhost:10400/api/productTbs';

  getConfig() {
    return this._http.get(`${this.rootURL}`);
  }
  postConfig(data:any) {
    return this._http.post(`${this.rootURL}`,data);
  }
  updateConfig(id:any,data:any){
    return this._http.put(`${this.rootURL}/${id}`,data);
  }
  deleteConfig(id:any){
    return this._http.delete(`${this.rootURL}/${id}`);
  }

  // party APIs
  partyURL = 'http://localhost:10400/api/PartyAccountTbs';

  getParty() {
    return this._http.get(`${this.partyURL}`);
  }
  postParty(data:any) {
    return this._http.post(`${this.partyURL}`,data);
  }
  updateParty(id:any,data:any){
    return this._http.put(`${this.partyURL}/${id}`,data);
  }
  deleteParty(id:any){
    return this._http.delete(`${this.partyURL}/${id}`);
  }
}
