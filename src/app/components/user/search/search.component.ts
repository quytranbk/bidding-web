import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { CategoryService } from '../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { Constants } from 'src/app/services/constants';

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
  Users;
  Items;
  Logs;
  constructor(
    private api: APIService,
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

        this.theCate = this.categories.find(item => item._id === params.categoryid);
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

        
        /** local env */


        if (Constants.BACKEND === "mockup") {
          this.api.getAllData().subscribe(
            data => {
              this.Users = data[0];
              this.Items = data[1];
              this.Logs = data[2];
  
              this.filterItems = this.filterItems.map(
                element => {
                  let user = this.Users.find(
                    e => element.userId === e.id
                  ); 
                  let log = this.Logs.reduce(
                    (s, e) => {
                      if (element["biddingLog"].map((e) => e.id).includes(e.id)) {
                        s.push(e);
                        return s;
                      }
                      return s;
                    },
                    []
                  );
                  let amountAr = log.map(e => e.amount?e.amount: 0);
                  if (!amountAr.length) amountAr = [0];
                  return {
                    ...element,
                    ...user,
                    "biddingLog": log,
                    "highestBid": Math.max(...amountAr),
                  };
                }
              )
  
              console.log(this.filterItems);
              
            }
          )
        }
        
      })


      
    })
  }
  getAllCategories () {
    return this.cateS.getAllCategories();
  }
  getFilterItems (params) {
    let p = {};
    if (Constants.BACKEND === "mockup") {
      params["search"] && (p["name"] = params["search"]);
      params["categoryid"] && (p["categoriesid"] = params["categoryid"]);
    }
    else {
      p = {
        ...params["search"] ? {itemname: params["search"]} : {},
        ...params["categoryid"] ? {categoriesid: params["categoryid"]} : {},
     };
    }
    
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
    this.router.navigate(["items/" + item._id]);
  }
}
