import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { APIService } from './api.service'
import { CommonFunction } from '../utils/common-function';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  pattern = {
    getMyWishList: {
      in: {
        
      },
      out: {
        "categoriesid": "categoryId",
        "categoriesname": "categoryName",
        "currentbid": "highestBid",
        "enddate": "endTime",
        "imagelink": "imgUrl",
        "itemcondition": "itemCondition",
        "itemdescription": "description",
        "itemid": "itemId",
        "itemname": "title",
        "minimumincreasebid": "minIncrease",
        "sellerid": "userId",
        "sellername": "sellerName",
        "sessionid": "sessionId",
        "startdate": "startTime",
      }
    },
    addToWishList: {
      in: {
      },
      out: {
      }
    },
  }
  constructor(
    private http: HttpClient,
    private api: APIService,
  ) { }

  getAll () {
    return this.http.get(`${Constants.HOST_API}/wishlists`);
  }

  getMyWishList (data?) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/wishlist?userId=${data.userId}`);

    return this.api.APIAuth.get(`${Constants.REMOTE_API}/wishlists//all/currentuser`)
    .pipe(
      map(
        ({data}) => CommonFunction.transObjectKeys(data, this.pattern.getMyWishList.out)
      )
    );
  }

  createANewItem (data) {
    if (Constants.BACKEND === "mockup")
      return this.api.API.post(Constants.HOST_API + "/wishlists", data);

      return this.api.APIAuth.post(Constants.REMOTE_API + "/wishlists", data);
  }
  addToWishList (data) {
    if (Constants.BACKEND === "mockup")
      return this.api.API.post(Constants.HOST_API + "/wishlists", data);

      // data = CommonFunction.transObjectKeys(data, this.pattern.addToWishList.in);
      return this.api.APIAuth.post(Constants.REMOTE_API + "/wishlists", data);
  }
  removeItemWishList (data) {
      return this.api.APIAuth.delete(Constants.REMOTE_API + "/wishlists", data);
  }

}
