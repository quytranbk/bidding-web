import { Component } from '@angular/core';
import { Constants } from './constants'
import { ItemService } from './item.service';
import { CategoryService } from './category.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bidding-web';
  categories: Array<any>;
  newestItems: Array<any>;
  popularItems: Array<any>;
  searchInput: string;
  constructor(
    private itemS: ItemService,
    private cateS: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.categories = this.getCategories();
    this.categories.unshift({
      name: "Trang chủ",
      isActive: true
    });

    
  }
  getCategories() {
    return this.cateS.getAllCategories();
  }
  

  goTo(params) {
    let url = '/item?categoryid=' + params.categoryId + "&search=" + this.searchInput;
    this.router.navigate([url]);
  }
}
