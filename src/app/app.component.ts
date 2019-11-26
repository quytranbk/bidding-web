import { Component } from '@angular/core';
import { Constants } from './constants'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bidding-web';
  HEADER_MENU_LIST = Constants.HEADER_MENU;
  constructor() {}
}
