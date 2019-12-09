import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { CategoryService } from '../../../services/category.service';
import { finalize } from 'rxjs/operators';
import { Observable, forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  sellForms = new FormBuilder().group({
    title: ['aaa', [Validators.required]],
    categorySl: [undefined,[Validators.required]],
    description: ['aaa',[Validators.required]],
    startTime: [formatDate(new Date, 'yyyy-MM-ddThh:mm', 'en'),[Validators.required]],
    endTime: [formatDate(new Date, 'yyyy-MM-ddThh:mm', 'en'),[Validators.required]],
    startPrice: ['10',[Validators.required]],
    minSpace: ['10',[Validators.required]],
    biddingLog: [[]]
  });
  categories: any[];
  downloadURL: any;
  
  constructor(
    private afStorage: AngularFireStorage,
    private cateS: CategoryService,
    private itemS: ItemService
  ) { }

  ngOnInit() {
    this.getAllCategories()
    .subscribe((data: any) => {
      this.categories = data;
      // this.sellForms.get("categoryId").setValue(this.categories[0]);
    })
  }
  getAllCategories () {
    return this.cateS.getAllCategories();
  }
  callApiSellForms () {
    return this.itemS.createANewItem({
      ...this.sellForms.value,
      categoryId: this.sellForms.get("categorySl").value,
      imgUrl: this.downloadURL
    });
  }
  uploadImage(imgFile) {
    return new Observable(
      (obs) => {
        let ref = this.afStorage.ref(`${Date.now()}`);
        let task = ref.put(imgFile);
        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(
              data => obs.next(data),
              error => obs.error(error)
            )
          })
        )
          .subscribe()
      } 
    )
  }
  submitSellForms (imgFile) {
    
    if (this.sellForms.dirty && this.sellForms.valid) {
      let array = []
      for (let file of imgFile.files) {
        array.push(this.uploadImage(file));
      }
      combineLatest(array)
      .subscribe(
        data => {
          this.downloadURL = data;
          
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
      )
      
    }
  }
}
