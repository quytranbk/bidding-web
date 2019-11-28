import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }
  getAllItems () {
    return [
      {
        itemId: "1",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "2",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "3",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "4",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "5",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
    ]
  }
  getNewestItems () {
    return [
      {
        itemId: "1",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "2",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "3",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "4",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "5",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
    ]
  }
  getPopularItems () {
    return [
      {
        itemId: "1",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "2",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "3",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "4",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
      {
        itemId: "5",
        title: "Apple iPhone 7 plus vàng,bản QT,Ko camera sau+MVT",
        startPrice: 1000000,
        stepPrice: 100000,
        imgUrl: [
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg",
          "https://cdn.chotot.com/4EG39RJynWg4WFctZJvbZA2b7lMk5As8p_WvA5uDnKU/preset:view/plain/ab5ab671a3d114e1baf11900cbd38b00-2641093925735742008.jpg"
        ],
        startTime: "2019-11-27T07:19:04.241Z",
        endTime: "2019-11-28T07:19:04.241Z",
      },
    ]
  }
}
