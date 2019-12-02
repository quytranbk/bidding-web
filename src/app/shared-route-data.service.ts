import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedRouteDataService {
  data: any = {};
  constructor() { }
}
