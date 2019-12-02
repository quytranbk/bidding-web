import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { SharedRouteDataService } from '../shared-route-data.service';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  wishList: any[];
  constructor(
    private sharedS: SharedRouteDataService,
    private personS: PersonService,
    private wishListS: WishListService,
  ) { }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data[0];
        this.callGetBidLogs()
        .subscribe(
          (data: any) => {
            this.wishList = data;
          }
        );
      }
    )
  }
  callGetBidLogs () {
    return this.wishListS.getByUser({
      userId: this.userInfo.id
    });
  }
  callGetInfo () {
    return this.personS.getInfo({
      username: this.sharedS.data["userInfo"].username
    });
  }

}
