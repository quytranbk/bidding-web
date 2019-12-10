import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';
import { APIService } from './api.service'
import { CommonFunction } from '../utils/common-function';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  pattern = {
    login: {
      in: {
        "username": "userid",
      },
      out: {
        "sessiontoken": "sToken",
      }
    },
    checkAuth: {
      in: {
        
      },
      out: {
        "accesslevel": "level",
        "userid": "username"
      }
    },
    updateInfo: {
      in: {
        username: "userid",
      },
      out: {

      },
    },
    changePass: {
      in: {
        oldPassword: "oldpassword",
        newPassword: "newpassword",
      },
      out: {

      }
    },
    register: {
      in: {
        "username": "userid",
      },
      out: {

      }
    },
  }
  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private api: APIService,
  ) { }

  getSVCurrentTime () {
    return of(new Date().toISOString());
  }
  login (data) {
    data = CommonFunction.transObjectKeys(data, this.pattern.login.in);
    return this.api.API.post(`${Constants.REMOTE_API}/login`, data)
    .pipe(
      map(
        data => CommonFunction.transObjectKeys(data, this.pattern.login.out)
      )
    );
  }
  logout () {
    // this.cookie.delete("bidding-web-auth-token");
    localStorage.removeItem('bidding-web-auth-token');

  }
  register (data) {
    data = CommonFunction.transObjectKeys(data, this.pattern.register.in);
    return this.api.API.post(`${Constants.REMOTE_API}/signup`, data);
  }
  checkAuth () {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/users/1`)
    // .pipe(
    //   map(data => [data])
    // );

    // if (this.cookie.check("bidding-web-auth-token")) {
      return this.api.APIAuth.get(`${Constants.REMOTE_API}/profile`)
      .pipe(
        map(
          data => CommonFunction.transObjectKeys(data, this.pattern.checkAuth.out)
        )
      );
    // }
  }
  saveWebAuthCookie (token) {
    localStorage.setItem('bidding-web-auth-token', token);
    // this.cookie.set("bidding-web-auth-token", token);
  }

  getInfo () {
    if (Constants.BACKEND === "mockup")
    return this.api.API.get(`${Constants.HOST_API}/users/1`)
    // .pipe(
    //   map(data => data[0])
    // );

    return this.api.APIAuth.get(`${Constants.REMOTE_API}/profile`)
    .pipe(
      map(
        data => CommonFunction.transObjectKeys(data, this.pattern.checkAuth.out)
      )
    );
  }
  getUserById (data) {

    return this.api.APIAuth.get(`${Constants.REMOTE_API}/user/${data.userId}`)
    .pipe(
      map(
        data => CommonFunction.transObjectKeys(data, this.pattern.checkAuth.out)
      )
    );
  }
  updateInfo (data) {
    return this.api.APIAuth.put(`${Constants.REMOTE_API}/profile`, data);
  }
  changePass (data) {
    data = CommonFunction.transObjectKeys(data, this.pattern.changePass.in);
    return this.api.APIAuth.put(`${Constants.REMOTE_API}/password`, data);
  }

  getAllUsers () {
    return this.api.API.get(`${Constants.HOST_API}/users`);
  }
} 
