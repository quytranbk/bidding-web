import { Component } from '@angular/core';
// import { ItemService } from './item.service';
import { CategoryService } from './category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from './person.service';
import { SharedRouteDataService } from './shared-route-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bidding-web';
  search: string;
  userInfo: any = {};
  isSignIn: boolean;
  categories: Array<any>;
  newestItems: Array<any>;
  popularItems: Array<any>;
  searchInput: string;
  constructor(
    private sharedS: SharedRouteDataService,
    private cateS: CategoryService,
    private personS: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { console.log(""); }
  ngOnInit() {
    
    this.getCategories()
    .subscribe((data: any) => {
      this.categories = data;
      this.categories.unshift({
        name: "Trang chủ",
        isActive: true
      });
    })
    
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
        this.userInfo = data[0];
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

  goTo(params) {
    let url = '/items?categoryid=' + params.categoryId + "&q=" + this.searchInput;
    this.router.navigate([url]);
  }
}
