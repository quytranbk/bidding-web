import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { SharedRouteDataService } from '../../../services/shared-route-data.service';
import { WishListService } from '../../../services/wish-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  wishList: any[];
  constructor(
    private sharedS: SharedRouteDataService,
    private personS: PersonService,
    private wishListS: WishListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data;
        this.callGetMyWishList()
        .subscribe(
          (data: any) => {
            this.wishList = data;
          }
        );
      }
    )
  }
  callGetMyWishList () {
    return this.wishListS.getMyWishList({
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
    this.router.navigate(["/items/" + item.itemId]);
  }

}
