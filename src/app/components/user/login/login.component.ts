import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  notifySignIn: string;
  isResolveSignIn: boolean = true;
  loginForms = new FormBuilder().group({
    user_id: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private personS: PersonService
  ) { console.log("");
   }

  ngOnInit() {
  }
  
  callApiLoginForms () {
    return this.personS.login({...this.loginForms.value});
  }
  submitLoginForms () {
    if (this.loginForms.dirty && this.loginForms.valid) {
      this.callApiLoginForms()
      .subscribe(
        (data: any) => {
          this.personS.saveWebAuthCookie(data["token"]);
          window.location.reload();
        }, // success path  
        error => {
          this.isResolveSignIn = false;
        }// error path
      );
    }
  }
}
