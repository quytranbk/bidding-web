import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';
import { APIService } from './api.service';
import { CommonFunction } from '../utils/common-function';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  pattern = {
    getAllCategories: {
      in: {
        
      },
      out: {
        "CategoriesName": "name",
        "categoriesid": "id"
      }
    },
  }
  constructor(
    private cookie: CookieService,
    private api: APIService,
  ) { }
  getAllCategories () {
    return this.api.API.get(`${Constants.HOST_API}/categories`);
    return this.api.API.get(`${Constants.REMOTE_API}/categories`)
    .pipe(CommonFunction.transObjectKeysPipe(this.pattern.getAllCategories.out));
  }
}
