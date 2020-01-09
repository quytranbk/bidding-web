import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { SharedRouteDataService } from '../../../services/shared-route-data.service';
import { WishListService } from '../../../services/wish-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  isLoading: boolean = true;
  userInfo: any;
  wishListOrigin: any[] = [];
  wishList: any[] = [];
  sttSl: FormControl = new FormControl('');
  sortSl: FormControl = new FormControl('');
  
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
        this.refreshMyWishList();
      }
    )
  }
  refreshMyWishList () {
    this.callGetMyWishList()
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.wishList = this.wishListOrigin = data;
        }
      );
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

  changeStatus () {
    if (this.sttSl.value === "0") {
      this.wishList = this.wishListOrigin.filter(
        element => {
          return new Date() < new Date(element.endTime)
        }
      )
    }
    else {
      this.wishList = this.wishListOrigin.filter(
        element => {
          return new Date() >= new Date(element.endTime)
        }
      )
    }
  }

  changeSort () {
    if (this.sortSl.value === "0") {
      this.wishList.sort(
        (a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
      )
    }
    else {
      this.wishList.sort(
        (a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        }
      )
    }
  }

  goToItemDetail (item) {
    this.router.navigate(["/items/" + item.itemId]);
  }

  clickRemoveWishList (item) {
    this.wishListS.removeItemWishList({
      itemId: item.itemId
    }).subscribe(
      data => {
        this.refreshMyWishList();
      }
    )
  }

}
