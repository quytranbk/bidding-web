import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newestItems: Array <any>;
  popularItems: Array <any>;
  constructor(
    private itemS: ItemService
  ) { }

  ngOnInit() {
    this.newestItems = this.getNewestItems();
    this.popularItems = this.getPopularItems();
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
