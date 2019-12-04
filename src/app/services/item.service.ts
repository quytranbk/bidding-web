import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';
import { APIService } from './api.service';
import { CommonFunction } from '../utils/common-function';

const httpOptions = {
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng"
  }
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  pattern = {
    getAllItems: {
      in: {
        
      },
      out: {
        "categoriesid": "categoryId",
        "imagelink": "imgUrl",
        "itemDescription": "description",
        "itemName": "name",
        "itemcondition": "itemCondition",
        "itemid": "id"
      }
    },
  }

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private api: APIService,
  ) { }

  getAllItems () {
    return this.api.API.get(`${Constants.REMOTE_API}/item/`)
    .pipe(CommonFunction.transObjectKeysPipe(this.pattern.getAllItems.out));
  }
  getItems (data) {
    return this.api.API.get(`${Constants.REMOTE_API}/item/${data.id}`)
    .pipe(CommonFunction.transObjectKeysPipe(this.pattern.getAllItems.out));
  }
  getFilterItems (params) {
    return this.api.API.get(`${Constants.HOST_API}/items`, params)
    return this.api.API.get(`${Constants.REMOTE_API}/item/`, params)
    .pipe(CommonFunction.transObjectKeysPipe(this.pattern.getAllItems.out));
  }
  getNewestItems () {
    return this.api.API.get(Constants.HOST_API + "/items?_limit=5");
  }
  getPopularItems () {
    return this.api.API.get(Constants.HOST_API + "/items?_limit=5");
  }
  createANewItem (data) {
      // let rd = Math.floor(Math.random() * 2 + 0);
      // return rd? Promise.resolve(true): Promise.reject(true);
      return this.api.APIAuth.post(Constants.HOST_API + "/items", data);
  }
}
