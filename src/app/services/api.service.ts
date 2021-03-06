import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  API: API = new API (this.http);
  APIAuth: APIAuth = new APIAuth (this.http);
  constructor(
    private http: HttpClient
    ) { }

  getAllData () {
    return combineLatest(
      this.http.get(`http://localhost:3000/users`),
      this.http.get(`http://localhost:3000/items`),
      this.http.get(`http://localhost:3000/biddinglogs`)
    )
     
  }
}


class API {
  constructor(
    private http: HttpClient
   ) { }

  formatQParams (qParams: Object) {
    return Object.entries(qParams).reduce(
      (rs, element, idx) => idx ? `${rs}&${element[0]}=${element[1]}` : `${rs}?${element[0]}=${element[1]}`,
      ''
    );
  }
  get (url, qParams? : Object) {
    return this.http.get<any>(
      url + (qParams? this.formatQParams(qParams): ''), 
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
        })
      }
    );
  }
  post (url: string, data?: Object | null, qParams?: Object | null) {
    return this.http.post<any>(
      url + (qParams? this.formatQParams(qParams): ''), 
      data? data: undefined,
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
        })
      },
    );

  }
  put (url: string, data?: Object | null, qParams?: Object | null) {
    return this.http.put<any>(
      url + (qParams? this.formatQParams(qParams): ''), 
      data? data: undefined,
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
        })
      },
    );

  }
  delete (url: string, qParams?: Object | null) {
    return this.http.delete(
      url + (qParams? this.formatQParams(qParams): ''),
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
        })
      },
    );

  }
  
}
class APIAuth {
  constructor(
    private http: HttpClient
   ) { }

  formatQParams (qParams: Object) {
    return Object.entries(qParams).reduce(
      (rs, element, idx) => idx ? `${rs}&${element[0]}=${element[1]}` : `${rs}?${element[0]}=${element[1]}`,
      ''
    );
  }
  get (url, qParams? : Object) {
    return this.http.get<any>(
      url + (qParams? this.formatQParams(qParams): ''), 
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization" : localStorage.getItem("bidding-web-auth-token") || ''
        })
      }
    );
  }
  post (url: string, data?: Object | null, qParams?: Object | null) {
    return this.http.post<any>(
      url + (qParams? this.formatQParams(qParams): ''), 
      data? data: undefined,
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization" : localStorage.getItem("bidding-web-auth-token") || ''
        })
      },
    );

  }
  put (url: string, data?: Object | null, qParams?: Object | null) {
    return this.http.put<any>(
      url + (qParams? this.formatQParams(qParams): ''), 
      data? data: undefined,
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization" : localStorage.getItem("bidding-web-auth-token") || ''
        })
      },
    );

  }
  delete (url: string, qParams?: Object | null) {
    return this.http.delete(
      url + (qParams? this.formatQParams(qParams): ''), 
      {
        headers : new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization" : localStorage.getItem("bidding-web-auth-token") || ''
        })
      },
    );

  }
  
}