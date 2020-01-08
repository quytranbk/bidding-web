import { Component, OnInit } from '@angular/core';
// import { ItemService } from './item.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { SharedRouteDataService } from '../../services/shared-route-data.service';
import { FormControl } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  title = 'bidding-web';
  search: string;
  userInfo: any = {};
  isSignIn: boolean;
  categories: Array<any>;
  categoriesMenu: Array<any>;
  categoriesSelect: Array<any>;
  newestItems: Array<any>;
  popularItems: Array<any>;
  searchInput: string;
  ActiveCategoryId: number = undefined;
  theCate: any;
  cateSl = new FormControl();
  countPayingWait: number;

  Users;
  Items;
  Logs;

  constructor(
    private api: APIService,
    private sharedS: SharedRouteDataService,
    private cateS: CategoryService,
    private personS: PersonService,
    private itemS: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log(""); }
  
  ngOnInit() {
    this.route.queryParams
    .subscribe(
      params => {
        this.getCategories()
        .subscribe(
          (data: any) => {
            this.categories = data;
            this.categoriesSelect = [...data];
            this.categoriesSelect.unshift({
              name:"Loại"
            });
            this.cateSl.setValue(this.categoriesSelect[0]);

            this.categoriesMenu = [...data];
            this.categoriesMenu.unshift({
              name: "Trang chủ",
              isActive: true
            });

            this.theCate = this.categories.find(element => element.id === params.categoryid);
            this.theCate && (this.ActiveCategoryId = this.theCate.id);
          }
        )
      }
    )
    
    this.checkAuth()
    .subscribe(
      (data: any) => {
        this.isSignIn = true;
        this.userInfo = data;
        if (this.userInfo.level === 9) this.router.navigate(["/admin"]);
        
        this.sharedS.data["userInfo"] = this.userInfo;
        this.callGetAwaitPayment().subscribe(
          data => this.countPayingWait = Array.isArray(data)? data.length: 0
        )
      }
    );
  }
  getCategories() {
    return this.cateS.getAllCategories();
  }
  
  checkAuth () {
    return this.personS.checkAuth();
  }

  clickSearch () {
    let qP = {
       ...this.searchInput ? {search: this.searchInput} : {},
       ...this.cateSl.value._id ? {categoryid: this.cateSl.value._id} : {},
    };
    this.router.navigate(
      ["items"], 
      {
        queryParams: qP
      }
    )
  }

  callSignOut () {
    this.personS.logout();
    window.location.reload();
  }
  clickSignOut () {
    this.callSignOut();
  }

  callGetAwaitPayment () {
    return this.itemS.getAwaitPayment();
  }

  goTo(item) {
    this.ActiveCategoryId = item.id;
    if (!item.id) window.location.href = "/";

    this.router.navigate(
      ["/items"], 
      {
        queryParams: {
          categoryid: item.id
        }
      }
    );
    
  }
}
