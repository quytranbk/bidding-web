import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  sellForms = new FormBuilder().group({
    title: ['aaa', [Validators.required]],
    category: ['1',[Validators.required]],
    description: ['aaa',[Validators.required]],
    endTime: [formatDate(new Date, 'yyyy-MM-ddThh:mm', 'en'),[Validators.required]],
    startPrice: ['10',[Validators.required]],
    minSpace: ['10',[Validators.required]],
  });
  categories: any[];
  constructor(
    private cateS: CategoryService,
    private itemS: ItemService
  ) { }

  ngOnInit() {
    this.getAllCategories()
    .subscribe((data: any) => {
      this.categories = data;
    })
  }
  getAllCategories () {
    return this.cateS.getAllCategories();
  }
  callApiSellForms () {
    return this.itemS.createANewItem(this.sellForms.value);
  }
  submitSellForms () {
    if (this.sellForms.dirty && this.sellForms.valid) {
      this.callApiSellForms()
      .subscribe(
        data => {
          alert("Đăng bán thành công");
        }, // success path
        error => {
          alert(JSON.stringify(error));
        }// error path
      );
    }
  }
}
