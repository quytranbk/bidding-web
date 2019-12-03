import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(
    private cookie: CookieService,
    private http: HttpClient
  ) { }
  login (data) {
    return this.http.get(Constants.HOST_API + "/users?username=" + data.username + "&password=" + data.password);
  }
  logout () {
    this.cookie.delete("bidding-web-auth-token");
  }
  register (data) {
    return this.http.post(Constants.HOST_API + "/users", data);
  }
  checkAuth () {
    // if (Math.floor(Math.random() * 2 + 0))
    return this.http.get(Constants.HOST_API + "/users");
    return;
    if (this.cookie.check("bidding-web-auth-token")) {
      return this.http.get(Constants.HOST_API + "/users");
    }
    return;
  }
  saveWebAuthCookie (token) {
    this.cookie.set("bidding-web-auth-token", token);
  }

  getInfo (data) {
    return this.http.get(`${Constants.HOST_API}/users?username=${data.username}`);
  }
  updateInfo (id, data) {
    return this.http.put(`${Constants.HOST_API}/users/${id}`, data);
  }
}
