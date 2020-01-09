import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        "itemdescription": "description",
        "itemname": "title",
        "sellerid": "sellerId",
        "sellername": "sellerName",
        "itemcondition": "itemCondition",
        "itemid": "itemId",
        "sessionid": "sessionId",
        "enddate": "endTime",
        "currentbid": "highestBid",
        "sessionstatus": "sessionStatus",
        "minimumincreasebid": "minSpace",
      }
    },
    createANewItem: {
      in: {
        "title": "itemname",
        "categoryId": "categoriesid",
        "description": "itemdescription",
        "startTime": "startdate",
        "endTime": "enddate",
        "startPrice": "startprice",
        "minSpace": "minimumincreasebid",
        "imgUrl": "imagelink",
        "itemCondition": "itemcondition"
      },
      out: {
        "categoriesid": "categoryId",
        "imagelink": "imgUrl",
        "itemdescription": "description",
        "itemname": "title",
        "sellername": "name",
        "itemcondition": "itemCondition",
        "itemid": "id",
        "enddate": "endTime"
      }
    },
    getMySessions: {
      in: {
      },
      out: {
        "itemid": "itemId",
        "itemname": "title",
        "enddate": "endTime",
        "sessionid": "sessionId",
        "startdate": "startTime",
        "images": "imgUrl",
        "currentbid": "highestBid",
        "bidcount": "bidCount"
      }
    },
    getAwaitPayment: {
      in: {
      },
      out: {
        "categoriesid": "categoryId",
        "imagelink": "imgUrl",
        "itemdescription": "description",
        "itemname": "title",
        "startprice": "startPrice",
        "itemcondition": "itemCondition",
        "itemid": "itemId",
        "sessionid": "sessionId",
        "enddate": "endTime",
        "currentbid": "highestBid",
      }
    },
  }

  constructor(
    private http: HttpClient,
    private api: APIService,
  ) { console.log("");
  }

  getAllItems () {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/items`);

    return this.api.API.get(`${Constants.REMOTE_API}/biddingsessions`)
    .pipe(
      map(
        ({data}) => {
          let transData = <any>(CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out));
          return transData;
        }
      )
    );
  }
  getItems (data) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(Constants.HOST_API + "/items/" + data.id);
    
    return this.api.API.get(`${Constants.REMOTE_API}/biddingsessions/${data.id}`)
    .pipe(
      map(
        ({data}) => {
          let transData = <any>(CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out));
          return transData;
        }
      )
    );
  }
  getFilterItems (params) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/items`, params)

    return this.api.API.get(`${Constants.REMOTE_API}/biddingsessions`, params)
    .pipe(
      map(
        ({data}) => {
          let transData = <any>(CommonFunction.transObjectKeys(data, this.pattern.getAllItems.out));
          return transData.map((e) => {
            return {
              ...e,
              highestBid: (e.biddinglog || []).reduce(
                (s, v) => v.bidamount > s? v.bidamount: s,
                e.startPrice
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
    
    return this.api.APIAuth.get(`${Constants.REMOTE_API}/biddingsessions/all/currentuser`)
    .pipe(
      map(
        ({data}) => CommonFunction.transObjectKeys(data, this.pattern.getMySessions.out)
      )
    );
  }
  getAwaitPayment () {
    return this.api.APIAuth.get(`${Constants.REMOTE_API}/biddingsessions/all/awaitpayment`)
    .pipe(
      map(
        ({data}) => CommonFunction.transObjectKeys(data, this.pattern.getAwaitPayment.out)
      )
    );
  }
  getFinishPayment () {
    return this.api.APIAuth.get(`${Constants.REMOTE_API}/biddingsessions/all/finished`)
    .pipe(
      map(
        ({data}) => CommonFunction.transObjectKeys(data, this.pattern.getAwaitPayment.out)
      )
    );
  }
  createANewItem (data) {
    if (Constants.BACKEND === "mockup")
      return this.api.API.post(Constants.HOST_API + "/items", data);

      data = CommonFunction.transObjectKeys(data, this.pattern.createANewItem.in);
      return this.api.APIAuth.post(Constants.REMOTE_API + "/biddingsessions", data);
  }
  updateItem (id, data) {
      return this.api.APIAuth.put(Constants.HOST_API + "/items/" + id, data);
  }
  handlePay (sessionid) {
      return this.api.APIAuth.post(`${Constants.REMOTE_API}/biddingsessions/${sessionid}/payment`);
  }
  updateEndSession (data) {
      return this.api.APIAuth.put(Constants.REMOTE_API + "/lock/" + data.sessionId);
  }
}
