import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { APIService } from './api.service';
import { CommonFunction } from '../utils/common-function';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  pattern = {
    getAllCategories: {
      in: {
        
      },
      out: {
        "categoriesname": "name",
        "categoriesid": "id"
      }
    },
  }
  constructor(
    private api: APIService,
  ) { }
  getAllCategories () {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/categories`);

    return this.api.API.get(`${Constants.REMOTE_API}/categories`)
    .pipe(
      map(
        ({data}) => CommonFunction.transObjectKeys(data, this.pattern.getAllCategories.out)
      )
    );
  }
}
