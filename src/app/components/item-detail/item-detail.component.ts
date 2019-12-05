import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  isLoadedData: boolean = false;
  params: any;
  itemDetail: any = {};
  BidAmount: number;
  isResolvePay: boolean = true;
  currentImgUrl;
  shippingItem: FormControl  = new FormControl({});
  ShippingSelection: Array <any> = [
    {
      id: 1,
      name: "Giao hàng tiết kiệm",
      value: 25000
    },
    {
      id: 2,
      name: "Giao hàng nhanh",
      value: 30000
    },
    {
      id: 3,
      name: "VN Post",
      value: 20000
    },
  ]
  payForms = new FormBuilder().group({
    address: ['aaa', [Validators.required]],
    phone: ['111', [Validators.required]],
    promoCode: ['',],
  });
  constructor(
    private itemS: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log("");
  }
  
  ngOnInit() {
      this.route.params
        .subscribe(
          params => {
            this.params = params;
            this.getItems().subscribe(
              data => {
                this.itemDetail = data ? data : {};
                this.isLoadedData = true;
                this.currentImgUrl = this.itemDetail.imgUrl[0].url;
              }
            )
            
          }
        )
    
  }

  getItems () {
    return this.itemS.getItems({
      id: this.params.id
    });
  }


  payBid () {
    console.log( document.querySelector('#comfirmBidModal'));
     
  }
}
