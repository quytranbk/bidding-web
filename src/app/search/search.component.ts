import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filterItems: any[];
  categories: any[];
  params: any;
  categoryName: string;
  check: any = true;
  constructor(
    private itemS: ItemService,
    private cateS: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log("") }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.params = params;
      combineLatest(
        this.getFilterItems(params),
        this.getAllCategories()
      )
      .subscribe(([_getFilterItems, _getAllCategories]: [any, any]) => {
        this.filterItems = _getFilterItems;
        this.categories = _getAllCategories;
        let theCate = this.categories.find(item => item.id === params.categoryid);
        theCate && (this.categoryName = theCate.name);
      })
      
    })
  }
  getAllCategories () {
    return this.cateS.getAllCategories();
  }
  getFilterItems (params) {
    let p = {};
    params["search"] !== undefined && (p["q"] = params["search"]);
    params["categoryid"] !== undefined && (p["categoryId"] = params["categoryid"]);
    return this.itemS.getFilterItems(p);
  }
  handleParams () {
    
  }

  changeCheck (item) {
    if (item.checked) {
      this.router.navigate(
        ["/items"], 
        {
          queryParams: {
            categoryid: item.id, 
            search: this.params.search, 
          }
        }
      )
    }
  }

  goToItemDetail (item) {
    this.router.navigate(["items/" + item.id]);
  }
}
