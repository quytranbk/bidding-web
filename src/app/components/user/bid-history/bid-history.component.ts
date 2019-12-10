import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { SharedRouteDataService } from '../../../services/shared-route-data.service';
import { BiddingLogService } from '../../../services/bidding-log.service';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { Constants } from 'src/app/services/constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  bidLogsOrigin: any[] = [];
  bidLogs: any[] = [];
  Users: any;
  Items: any;
  Logs: any;
  sttSl: FormControl = new FormControl('');
  sortSl: FormControl = new FormControl('');
  constructor(
    private api: APIService,
    private sharedS: SharedRouteDataService,
    private personS: PersonService,
    private bidLogS: BiddingLogService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log("");
  }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data;
        this.callGetBidLogs()
        .subscribe(
          (data: any) => {
            this.bidLogs = this.bidLogsOrigin = data;


            /** local env */


            if (Constants.BACKEND === "mockup") {
              this.api.getAllData().subscribe(
                data => {
                  this.Users = data[0];
                  this.Items = data[1];
                  this.Logs = data[2];
      
                  this.bidLogs = this.bidLogs.map(
                    element => {
                      let user = this.Users.find(
                        e => element.userId === e.id
                      ); 
                      let item = this.Items.find(
                        e => element.itemId === e.id
                      ); 
                      item = [item].map(
                        element => {
                          let user = this.Users.find(
                            e => element.userId === e.id
                          ); 
                          let log = this.Logs.reduce(
                            (s, e) => {
                              if (element["biddingLog"].map((e) => e.id).includes(e.id)) {
                                s.push(e);
                                return s;
                              }
                              return s;
                            },
                            []
                          );
                          return {
                            ...element,
                            ...user,
                            "biddingLog": log,
                            "highestBid": Math.max(...log.map(e => e.amount)),
                          };
                        }
                      )[0];
                      return {
                        ...element,
                        ...user,
                        ...item,
                      };
                    }
                  );
      
      
      
                  console.log(this.bidLogs);
                  
                }
              )
            }
        
          }
        );
      }
    )
  }
  callGetBidLogs () {
    return this.bidLogS.getMyBidLogs({
      userId: this.userInfo.id
    });
  }
  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.checkAuth();
  }

  showStatus (item) {
    switch(new Date() >= new Date(item.endTime)) {
      case true: return 'Đã kết thúc'
      case false: return 'Đang diễn ra'
    }
  }

  changeStatus () {
    if (this.sttSl.value === "0") {
      this.bidLogs = this.bidLogsOrigin.filter(
        element => {
          return new Date() < new Date(element.endTime)
        }
      )
    }
    else {
      this.bidLogs = this.bidLogsOrigin.filter(
        element => {
          return new Date() >= new Date(element.endTime)
        }
      )
    }
  }

  changeSort () {
    if (this.sortSl.value === "0") {
      this.bidLogs.sort(
        (a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
      )
    }
    else {
      this.bidLogs.sort(
        (a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        }
      )
    }
  }

  goToItemDetail (item) {
    this.router.navigate(["items/" + item.sessionId]);
  }

}
