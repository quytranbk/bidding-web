import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { SharedRouteDataService } from '../../../services/shared-route-data.service';
import { BiddingLogService } from '../../../services/bidding-log.service';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { Constants } from 'src/app/services/constants';
import { ItemService } from 'src/app/services/item.service';
import { combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  awaitPayments: any[] = [];
  finishPayments: any[] = [];
  bidLogs: any[] = [];
  noPayedbidLogs: any[] = [];
  payedbidLogs: any[] = [];
  sortSl1: FormControl = new FormControl("");
  sortSl2: FormControl = new FormControl("");
  Users: any;
  Items: any;
  Logs: any;

  constructor(
    private api: APIService,
    private sharedS: SharedRouteDataService,
    private personS: PersonService,
    private bidLogS: BiddingLogService,
    private itemS: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data;
        combineLatest(
          this.callGetAwaitPayment(),
          this.callFinishPayment(),
        )
        .subscribe(
          ([_callGetAwaitPayment, _callFinishPayment]: [any, any]) => {
            this.awaitPayments = _callGetAwaitPayment;
            this.finishPayments = _callFinishPayment;


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
                              if (element["biddingLog"] && element["biddingLog"].map((e) => e.id).includes(e.id)) {
                                s.push(e);
                                return s;
                              }
                              return s;
                            },
                            []
                          );
                          element["itemId"] = element.id;
                          delete element["id"];
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
                  )
                  .filter(
                    element => {
                      return element.biddingLog.some(
                        e => 
                        e.id === element.id && 
                        e.amount === element.highestBid &&
                        new Date() >= new Date(element.endTime)
                      )
                    }
                  );
      
      
      
                  console.log(this.bidLogs);
                  this.payedbidLogs = this.bidLogs.filter(
                    element => element.isPayed === 1
                  )
                  this.noPayedbidLogs = this.bidLogs.filter(
                    element => element.isPayed !== 1
                  )
                }
              )
            }
        
          }
        );
      }
    )
  }
  callGetAwaitPayment () {
    return this.itemS.getAwaitPayment();
  }
  callFinishPayment () {
    return this.itemS.getFinishPayment();
  }
  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.checkAuth();
  }

  changeSort1 () {
    if (this.sortSl1.value === "0") {
      this.awaitPayments.sort(
        (a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
      )
    }
    else {
      this.awaitPayments.sort(
        (a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        }
      )
    }
  }
  changeSort2 () {
    if (this.sortSl2.value === "0") {
      this.finishPayments.sort(
        (a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
      )
    }
    else {
      this.finishPayments.sort(
        (a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        }
      )
    }
  }

  goToItemDetail (item) {
    this.router.navigate(["/items/" + item.sessionId]);
  }
  goToPayPage (item) {
    this.router.navigate(["/payment/" + item.sessionId]);
  }

}