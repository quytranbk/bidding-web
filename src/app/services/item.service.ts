import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';
import { APIService } from './api.service';
import { CommonFunction } from '../utils/common-function';
import { map } from 'rxjs/operators';

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
        "ItemDescription": "description",
        "itemname": "title",
        "sellername": "name",
        "itemcondition": "itemCondition",
        "itemid": "id",
        "enddate": "endTime"
      }
    },
    createANewItem: {
      in: {
        "title": "itemname",
        "categoryId": "categoriesid",
        "description": "itemdescription",
        "startTime": "startdate",
        "endTime": "enddate",
        "startPrice": "currentbid",
        "minSpace": "minimumincreasebid",
        "imgUrl": "imagelink",
      },
      out: {
        "categoriesid": "categoryId",
        "imagelink": "imgUrl",
        "ItemDescription": "description",
        "itemname": "title",
        "sellername": "name",
        "itemcondition": "itemCondition",
        "itemid": "id",
        "enddate": "endTime"
      }
    },
  }

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private api: APIService,
  ) { }

  getAllItems () {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/items`);

    return this.api.API.get(`${Constants.REMOTE_API}/session/`)
    .pipe(
      map(
        data => CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out)
      )
    );
  }
  getItems (data) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(Constants.HOST_API + "/items/" + data.id);
    
    return this.api.API.get(`${Constants.REMOTE_API}/session/${data.id}`)
    .pipe(
      map(
        data => {
          let transData = <any>(CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out));
          if (typeof transData === "object") {
            return {
              ...transData,
              highestBid: transData.biddingLog.reduce(
                (s, v) => v.amount > s? v.amount: s,
                transData.biddingLog[0].amount
              )
            }
          }
          return transData.map((e) => {
            return {
              ...e,
              highestBid: e.biddingLog.reduce(
                (s, v) => v.amount > s? v.amount: s,
                e.biddingLog[0].amount
              )
            }
          })
        }
      )
    );
  }
  getFilterItems (params) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/items`, params)

    return this.api.API.get(`${Constants.REMOTE_API}/session`, params)
    .pipe(
      map(
        data => {
          let transData = <any>(CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out));
          return transData.map((e) => {
            return {
              ...e,
              highestBid: e.biddingLog.reduce(
                (s, v) => v.amount > s? v.amount: s,
                e.biddingLog[0].amount
              )
            }
          })
        }
      )
    );
  }
  getNewestItems () {
    return this.api.API.get(Constants.HOST_API + "/items?_limit=5");
  }
  getPopularItems () {
    return this.api.API.get(Constants.HOST_API + "/items?_limit=5");
  }
  getMySessions (data) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(Constants.HOST_API + "/items?sellerId=" + data.userId);
    
    return this.api.APIAuth.get(`${Constants.REMOTE_API}/history/sell`)
    .pipe(
      map(
        data => CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out)
      )
    );
  }
  createANewItem (data) {
    if (Constants.BACKEND === "mockup")
      return this.api.API.post(Constants.HOST_API + "/items", data);

      data = CommonFunction.transObjectKeys(data, this.pattern.createANewItem.in);
      return this.api.APIAuth.post(Constants.REMOTE_API + "/session", data);
  }
  updateItem (id, data) {
      // let rd = Math.floor(Math.random() * 2 + 0);
      // return rd? Promise.resolve(true): Promise.reject(true);
      return this.api.APIAuth.put(Constants.HOST_API + "/items/" + id, data);
  }
}
