import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { SharedRouteDataService } from '../shared-route-data.service';
import { BiddingLogService } from '../bidding-log.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  bidLogs: any[];
  constructor(
    private sharedS: SharedRouteDataService,
    private personS: PersonService,
    private bidLogS: BiddingLogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data[0];
        this.callGetBidLogs()
        .subscribe(
          (data: any) => {
            this.bidLogs = data;
          }
        );
      }
    )
  }
  callGetBidLogs () {
    return this.bidLogS.getByUser({
      userId: this.userInfo.id
    });
  }
  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.checkAuth();
  }

  goToItemDetail (item) {
    this.router.navigate(["items/" + item.id]);
  }

}
