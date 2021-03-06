import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  notifyReg: string;
  isResolveReg: boolean = true;
  regForms = new FormBuilder().group({
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    reEnterPassword: ['', [Validators.required]],
  });
  constructor(
    private personS: PersonService
  ) {console.log("");
   }

  ngOnInit() {
  }
  callApiRegForms () {
    return this.personS.register(this.regForms.value);
  }
  submitRegForms () {
    if (this.regForms.dirty && this.regForms.valid) {
      this.callApiRegForms()
      .subscribe(
        (data: any) => {
          // this.personS.saveWebAuthCookie(data["auth"]);
          // window.location.reload();
          alert("Đăng ký thành công");
        }, // success path  
        ({error}) => {
          alert(error.message)
          this.isResolveReg = false;
        }
      );
    }
  }
}
