import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { SharedRouteDataService } from '../../../services/shared-route-data.service';
import { BiddingLogService } from '../../../services/bidding-log.service';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { Constants } from 'src/app/services/constants';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  bidLogs: any[];
  payedbidLogs: any[];
  noPayedbidLogs: any[];
  Users: any;
  Items: any;
  Logs: any;
  constructor(
    private api: APIService,
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
        this.userInfo = data;
        this.callGetBidLogs()
        .subscribe(
          (data: any) => {
            this.bidLogs = data;


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

  goToItemDetail (item) {
    this.router.navigate(["items/" + item.id]);
  }

}