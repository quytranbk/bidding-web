import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isLoaded: boolean = false;
  filterItems: any[];
  categories: any[];
  params: any;
  categoryName: string;
  check: any = true;
  theCate:any;
  sortSl: FormControl = new FormControl('');
  arrayForm;
  constructor(
    private fb: FormBuilder,
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

        this.isLoaded = true;

        this.theCate = this.categories.find(item => item.id === params.categoryid);
        this.theCate && (this.categoryName = this.theCate.name);

        this.arrayForm = this.fb.group({
          arrayCheckBox: this.fb.array([])
        });
        let arrayCheckBox = this.arrayForm.get('arrayCheckBox') as FormArray;
        this.categories.forEach(
          (e) => {
            if (this.theCate && e.id === this.theCate.id) {
              arrayCheckBox.push(this.fb.control(true));
            }
            else {
              arrayCheckBox.push(this.fb.control(''));
            }
          }
        )
        
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

  changeSort () {
    if (this.sortSl.value === "0") {
      this.filterItems.sort(
        (a, b) => {
          return a.highestBid - b.highestBid;
        }
      )
    }
    else {
      this.filterItems.sort(
        (a, b) => {
          return b.highestBid - a.highestBid;
        }
      )
    }
  }

  getCheckBoxFC (i) {
    return (this.arrayForm.get('arrayCheckBox') as FormArray).controls[i];
  }
  setValueCheckBoxFC (i, value) {
    (this.arrayForm.get('arrayCheckBox') as FormArray).controls[i].setValue(value);
  }

  changeCheck (item, i) {
    let arrayCheckBox = this.arrayForm.get('arrayCheckBox') as FormArray;
    if (arrayCheckBox.controls[i].value == true) {
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
