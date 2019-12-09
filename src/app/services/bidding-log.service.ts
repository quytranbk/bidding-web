import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { APIService } from './api.service'
import { CommonFunction } from '../utils/common-function';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BiddingLogService {
  pattern = {
    createBiddingLog: {
      in: {
        "sessionId": "sessionid"
      },
      out: {}
    },
    getMyBidLogs: {
      in: {},
      out: {
        "bidamount": "amount",
        "biddate": "dateTime",
        "images": "imgUrl",
        "itemid": "itemId",
        "itemname": "title",
        "sessionenddate": "endTime",
        "sessionid": "sessionId",
        "sessionstartdate": "startTime",
      }
    },
  }
  constructor(
    private api: APIService,
  ) { }

  getAll () {
    return this.api.API.get(`${Constants.HOST_API}/biddinglogs`);
  }

  getLogs (data) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/biddinglogs/${data.id}`);

    return this.api.APIAuth.get(`${Constants.REMOTE_API}/logs`);
  }
  getByUser (data) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/biddinglogs?userId=${data.userId}`);

    return this.api.APIAuth.get(`${Constants.REMOTE_API}/logs`);
  }
  getMyBidLogs (data?) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/biddinglogs?userId=${data.userId}`);

    return this.api.APIAuth.get(`${Constants.REMOTE_API}/history/bid`)
    .pipe(
      map(
        data => CommonFunction.transObjectKeys(data, this.pattern.getMyBidLogs.out)
      )
    );;
  }
  createBiddingLog (data) {
    if (Constants.BACKEND === "mockup")
    return this.api.API.post(`${Constants.HOST_API}/biddinglogs`, data);

    data = CommonFunction.transObjectKeys(data, this.pattern.createBiddingLog.in);
    return this.api.APIAuth.post(`${Constants.REMOTE_API}/logs`, data);
    
  }

}
