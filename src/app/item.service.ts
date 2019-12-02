import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';

const httpOptions = {
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng"
  }
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private cookie: CookieService,
    private http: HttpClient
  ) { }
  getAllItems () {
    return this.http.get(Constants.HOST_API + "/items");
  }
  getItems (data) {
    return this.http.get(Constants.HOST_API + `/items/${data.id}`);
  }
  getFilterItems (params) {
  let qParams = `${Constants.HOST_API}/items`;
    if (params.search) qParams += `?q=${params.search}`; 
    if (params.categoryid) qParams += `&categoryId=${params.categoryid}`; 
    return this.http.get(qParams);
  }
  getNewestItems () {
    return this.http.get(Constants.HOST_API + "/items?_limit=5");
  }
  getPopularItems () {
    return this.http.get(Constants.HOST_API + "/items?_limit=5");
  }
  createANewItem (data) {
      // let rd = Math.floor(Math.random() * 2 + 0);
      // return rd? Promise.resolve(true): Promise.reject(true);
      return this.http.post(Constants.HOST_API + "/items", data);
  }
}
