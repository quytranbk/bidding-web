import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  getProfileInfo () {
    return {
      username: "qqq1",
      displayName: "qqq1",
      email: "qqq1@qqq1.com",
      gender: "1"
    }
  }
  getWatchedList () {
    return [
      {
        categoryId: "1",
        name: "Quần áo"
      },
      {
        categoryId: "2",
        name: "Điện & điện tử"
      },
      {
        categoryId: "3",
        name: "Xe cộ"
      },
      {
        categoryId: "4",
        name: "Dụng cụ"
      },
      {
        categoryId: "5",
        name: "Thiết bị"
      },
      {
        categoryId: "5",
        name: "Giày dép & Phụ kiện"
      },
    ]
  }
}
