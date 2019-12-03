import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(
    private http: HttpClient
  ) { }

  getAll () {
    return this.http.get(`${Constants.HOST_API}/wishlist`);
  }

  getByUser (data) {
    return this.http.get(`${Constants.HOST_API}/wishlist?userId=${data.userId}`);
  }

}
