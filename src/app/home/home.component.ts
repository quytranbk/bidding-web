import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newestItems: Object;
  popularItems: Object;
  constructor(
    private itemS: ItemService
  ) { }

  ngOnInit() {
    combineLatest(
      this.getNewestItems(),
      this.getPopularItems(),
    ).subscribe(([_getNewestItems, _getPopularItems]) => {
      this.newestItems = _getNewestItems;
      this.popularItems = _getPopularItems;
    });
    
  }
  getAllItems () {
    return this.itemS.getAllItems();
  }
  getNewestItems() {
    return this.itemS.getNewestItems();
  }
  getPopularItems() {
    return this.itemS.getPopularItems();
  }
}
