import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notifySignIn: string;
  isResolveSignIn: boolean = true;
  loginForms = new FormBuilder().group({
    username: ['aaa', [Validators.required]],
    password: ['aaa', [Validators.required]],
  });
  constructor(
    private personS: PersonService
  ) { }

  ngOnInit() {
  }
  callApiLoginForms () {
    return this.personS.login(this.loginForms.value);
  }
  submitLoginForms () {
    if (this.loginForms.dirty && this.loginForms.valid) {
      this.callApiLoginForms()
      .subscribe(
        (data: any) => {
          this.personS.saveWebAuthCookie(data["auth"]);
          window.location.reload();
        }, // success path  
        error => {
          this.isResolveSignIn = false;
        }// error path
      );
    }
  }
}
