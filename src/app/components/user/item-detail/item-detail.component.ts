import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { BiddingLogService } from 'src/app/services/bidding-log.service';
import { PersonService } from 'src/app/services/person.service';
import { Constants } from 'src/app/services/constants';
import { interval, combineLatest, forkJoin } from 'rxjs';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishListService } from 'src/app/services/wish-list.service';

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
  isResolvePay: boolean = true;
  showContainer: boolean;
  currentImgUrl;
  cDownDate: string;
  BidAmount: FormControl  = new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]);
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
    private wishListS: WishListService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log("");
  }
  
  ngOnInit() {
    this.personS.checkAuth().subscribe(
      data => {
        this.userInfo = data;
      }
    );
    this.route.params.subscribe(
      (params) => {
        this.params = params;
            this.refreshItemDetail();
      }
    )

  }

  refreshItemDetail () {
    this.getItems().subscribe(
      data => {
        this.isLoadedData = true;
        if (data) {
          this.showContainer = true;
          this.itemDetail = data;



          /** local env */
          if (Constants.BACKEND === "mockup") {

            this.api.getAllData().subscribe(
              data => {
                this.Users = data[0];
                this.Items = data[1];
                this.Logs = data[2];

                this.itemDetail = [this.itemDetail].map(
                  element => {
                    let user = this.Users.find(e => element.userId === e.id);
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


          this.itemDetailOrigin = { ...data };
          this.currentImgUrl = this.itemDetail.imgUrl[0];

          this.getSVCurrentTime().subscribe(
            crTime => {
              let distance = new Date(this.itemDetail.endTime).getTime() - new Date(crTime).getTime();
              this.countDowmTime(distance);
            }
          );

          if (
            new Date() >= new Date(this.itemDetail.endTime) &&
            this.itemDetail.sessionStatus === "RUNNING"
          ) {
            this.callUpdateEndSession().subscribe();
          }

        }
        
      }
    )
  }

  callUpdateEndSession () {
    return this.itemS.updateEndSession({
      sessionId: this.itemDetail.sessionId
    });
  }
  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.checkAuth();
  }

  getItems () {
    return this.itemS.getItems({
      id: this.params.id
    });
  }

  getSVCurrentTime () {
    return this.personS.getSVCurrentTime();
  }

  showBidInput () {
    return this.cDownDate && this.userInfo && this.userInfo._id !== this.itemDetail.user._id;
  }
  
  countDowmTime(distance) {
    // Update the count down every 1 second
    let intervalObs = interval(1000)
    .subscribe(x => {
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.cDownDate = days >= 0 ? (days? days + " ngày ": '') + hours + " giờ " + minutes + " phút " + seconds + " giây": undefined;
        
        if (distance < 0) {
          intervalObs.unsubscribe();
        }
        distance-=1000;
  });

  }
  createBiddingLog () {
    return this.bigLogS.createBiddingLog(this.itemDetail._id, {
      amount: parseInt(this.BidAmount.value),
    });
  }
  updateItem (biddingLogId) {
    this.itemDetailOrigin["biddingLog"].push({
      id: biddingLogId
    })
    return this.itemS.updateItem(this.itemDetailOrigin.id, this.itemDetailOrigin);
  }

  payBid () {
    if (Constants.BACKEND === "mockup") { 
      if (this.BidAmount.dirty && this.BidAmount.valid) {
        this.createBiddingLog().subscribe(
          (data: any) => {
            // this.updateItem(data.id).subscribe(
            //   data => {
            //     alert("Bạn đã tiến hành thành công một lần đấu giá");
            //   }
            // )
            alert("Bạn đã tiến hành thành công một lần đấu giá");
            
          }
        );
      }
    }
    else {
      if (this.BidAmount.dirty && this.BidAmount.valid) {
        this.createBiddingLog().subscribe(
          (data: any) => {
            // this.updateItem(data.id).subscribe(
            //   data => {
            //     alert("Bạn đã tiến hành thành công một lần đấu giá");
            //   }
            // )
            alert("Bạn đã tiến hành thành công một lần đấu giá");
            this.refreshItemDetail();
          },
          error => {
            alert("Giá của bạn phải cao hơn giá bid hiện tại!")
          }
        );
      }
    }
    
  }

  callAddToWishList () {
    return this.wishListS.addToWishList({
      sessionid: this.itemDetail._id
    });
  }
  clickAddToWishList () {
    this.callAddToWishList().subscribe(
      data => {
        alert("Thành công.")
      }
    );
    
  }
}
