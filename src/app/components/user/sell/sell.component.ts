import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { CategoryService } from '../../../services/category.service';
import { finalize } from 'rxjs/operators';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  isSignedIn: boolean = false;
  sellForms = new FormBuilder().group({
    title: ['', [Validators.required]],
    categorySl: [undefined,[Validators.required]],
    condSl: [undefined,[Validators.required]],
    description: ['',[Validators.required]],
    startTime: [formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en'),[Validators.required]],
    endTime: [formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en'),[Validators.required]],
    startPrice: ['100000',[Validators.required]],
    minSpace: ['100000',[Validators.required]],
    // biddingLog: [[]]
  });
  categories: any[];
  cond: any[] = [
    {
      name: "Mới",
      value: "NEW"
    },
    {
      name: "Đã sử dụng",
      value: "USED"
    },
  ];
  downloadURL: any;
  
  constructor(
    private router: Router,
    private afStorage: AngularFireStorage,
    private cateS: CategoryService,
    private itemS: ItemService,
    private personS: PersonService,
  ) { console.log("");
  }

  ngOnInit() {
    this.personS.checkAuth().subscribe(
      data => {
        this.isSignedIn = true;
        
      },
      error => {
        this.router.navigate(["/"]);
      }
    );

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
    let objItem = {
      ...this.sellForms.value,
      categoryId: this.sellForms.get("categorySl").value._id,
      itemCondition: this.sellForms.get("condSl").value.value,
      imgUrl: this.downloadURL,
      minSpace: parseInt(this.sellForms.get("minSpace").value),
      startPrice: parseInt(this.sellForms.get("startPrice").value),
      startTime: new Date(this.sellForms.get("startTime").value).toISOString(),
      endTime: new Date(this.sellForms.get("endTime").value).toISOString(),
    }
    delete objItem["categorySl"];
    delete objItem["condSl"];
    return this.itemS.createANewItem(objItem);
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
                this.router.navigate(["/profile/session"]);
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
