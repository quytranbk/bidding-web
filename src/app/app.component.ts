import { Component } from '@angular/core';
// import { ItemService } from './item.service';
import { CategoryService } from './services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from './services/person.service';
import { SharedRouteDataService } from './services/shared-route-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bidding-web';
  search: string;
  userInfo: any = {};
  isSignIn: boolean;
  categories: Array<any>;
  categoriesMenu: Array<any>;
  newestItems: Array<any>;
  popularItems: Array<any>;
  searchInput: string;
  ActiveCategoryId: number = undefined;

  constructor(
    private sharedS: SharedRouteDataService,
    private cateS: CategoryService,
    private personS: PersonService,
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
            this.categoriesMenu = [...data];
            
            this.categoriesMenu.unshift({
              name: "Trang chủ",
              isActive: true
            });

            let theCate = this.categories.find(element => element.id === params.categoryid);
            theCate && (this.ActiveCategoryId = theCate.id);
          }
        )
      }
    )
    
    this.checkAuth();
    
  }
  getCategories() {
    return this.cateS.getAllCategories();
  }
  
  checkAuth () {
    let check = this.personS.checkAuth();
    check && check
    .subscribe(
      (data: any) => {
        this.isSignIn = true;
        this.userInfo = data;
        this.sharedS.data["userInfo"] = this.userInfo;
      }
    );
  }

  clickSearch () {
    this.router.navigate(
      ["items"], 
      {
        queryParams: {
          search: this.searchInput, 
        }
      }
    )
  }

  callSignOut () {
    this.personS.logout();
  }
  clickSignOut () {
    this.callSignOut();
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
