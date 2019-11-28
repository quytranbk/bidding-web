import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filterItems: Array<any>;
  categories: Array<any>;
  params: any;
  categoryName: string;
  check: any = true;
  constructor(
    private itemS: ItemService,
    private cateS: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.params = params;
        this.filterItems = this.getFilterItems(params);
        this.categories = this.getAllCategories();
        const theCate = this.categories.find(item => item.categoryId === params.categoryid);
        this.categoryName = theCate && theCate.name;
      });
  }
  getAllCategories() {
    return this.cateS.getAllCategories();
  }
  getFilterItems(params) {
    return this.itemS.getAllItems();
  }
  handleParams() {

  }

  changeCheck(item) {
    if (item.checked) {
      this.router.navigate(
        ['/items'],
        {
          queryParams: {
            categoryid: item.categoryId,
            search: this.params.search,
          }
        }
      );
    }
  }
}
