import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { PersonService } from 'src/app/services/person.service';
import { BiddingLogService } from 'src/app/services/bidding-log.service';
import { Constants } from 'src/app/services/constants';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  params;
  detail: any = {};
  Users: any;
  Items: any;
  Logs: any;
  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private personS: PersonService,
    private itemS: ItemService,
    private bigLogS: BiddingLogService,
  ) { console.log("");
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        params => {
          this.params = params;
          this.getLogs().subscribe(
            data => {
              this.detail = data;
              

            /** local env */


            if (Constants.BACKEND === "mockup") {
              this.api.getAllData().subscribe(
                data => {
                  this.Users = data[0];
                  this.Items = data[1];
                  this.Logs = data[2];
      
                  this.detail = [this.detail].map(
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
                  )[0];
      
      
      
                  console.log(this.detail);
                  
                }
              )
            }

            }
          )
        }
      )
  }

  getLogs () {
    return this.bigLogS.getLogs({
      id: this.params.id
    });
  }

  clickPay () {
    this.detail["id"] = this.detail["itemId"];
    this.itemS.updateItem(this.detail.itemId, {
      ...this.detail,
      isPayed: 1
    }).subscribe(
      data => {
        alert("Thanh toán thành công.")
      }
    )
  }

}
