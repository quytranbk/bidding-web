import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private cookie: CookieService,
    private http: HttpClient
  ) { }
  getAllCategories () {
    return this.http.get(Constants.HOST_API + "/categories");
  }
}
