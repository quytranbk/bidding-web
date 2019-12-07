import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { BiddingLogService } from 'src/app/services/bidding-log.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  isLoadedData: boolean = false;
  params: any;
  itemDetail: any = {};
  itemDetailOrigin: any = {};
  BidAmount: string;
  isResolvePay: boolean = true;
  currentImgUrl;
  shippingItem: FormControl  = new FormControl({});
  ShippingSelection: Array <any> = [
    {
      id: 1,
      name: "Giao hàng tiết kiệm",
      value: 25000
    },
    {
      id: 2,
      name: "Giao hàng nhanh",
      value: 30000
    },
    {
      id: 3,
      name: "VN Post",
      value: 20000
    },
  ]
  payForms = new FormBuilder().group({
    address: ['aaa', [Validators.required]],
    phone: ['111', [Validators.required]],
    promoCode: ['',],
  });
  Users: any;
  Items: any;
  Logs: any;
  userInfo: any;
  constructor(
    private api: APIService,
    private personS: PersonService,
    private itemS: ItemService,
    private bigLogS: BiddingLogService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log("");
  }
  
  ngOnInit() {
    this.personS.checkAuth().subscribe(
      data => this.userInfo = data
    )
    this.route.params
      .subscribe(
        params => {
          this.params = params;
          this.getItems().subscribe(
            data => {
              this.itemDetail = data;
              this.itemDetailOrigin = {...data};
              this.isLoadedData = true;
              this.currentImgUrl = this.itemDetail.imgUrl[0].url;

              /** local env */
              this.api.getAllData().subscribe(
                data => {
                  this.Users = data[0];
                  this.Items = data[1];
                  this.Logs = data[2];

                  this.itemDetail = [this.itemDetail].map(
                    element => {
                      let user = this.Users.find( e => element.userId === e.id );
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

                  console.log(this.itemDetail);

                }
              )
            }
          )

        }
      )

  }

  getItems () {
    return this.itemS.getItems({
      id: this.params.id
    });
  }

  createBiddingLog () {
    return this.bigLogS.createBiddingLog({
      itemId: this.itemDetail.id,
      userId: this.userInfo.id,
      amount: this.BidAmount,
      dateTime: new Date().toISOString()
    });
  }
  updateItem (biddingLogId) {
    this.itemDetailOrigin["biddingLog"].push({
      id: biddingLogId
    })
    return this.itemS.updateItem(this.itemDetailOrigin.id, this.itemDetailOrigin);
  }

  payBid () {
    if (/[0-9]*/.test(this.BidAmount)) {
      this.createBiddingLog().subscribe(
        (data: any) => {
          this.updateItem(data.id).subscribe(
            data => {
              alert("Bạn đã tiến hành thành công một lần đấu giá");
            }
          )
          
        }
      );
    }
  }
}
