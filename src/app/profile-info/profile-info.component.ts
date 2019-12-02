import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { SharedRouteDataService } from '../shared-route-data.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  editProfileForms = new FormBuilder().group({
    name: [""],
    email: [""],
    username: [""],
    checkChangePw: [false],
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    reEnterPassword: ['', [Validators.required]],
  });;
  constructor(
    private sharedS: SharedRouteDataService,
    private personS: PersonService
  ) { }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data[0];
        this.editProfileForms = new FormBuilder().group({
          name: [this.userInfo.name],
          email: [this.userInfo.email],
          username: [this.userInfo.username],
          checkChangePw: [false],
          oldPassword: ['', [Validators.required]],
          newPassword: ['', [Validators.required]],
          reEnterPassword: ['', [Validators.required]],
        });
      }
    )
  }
  callApiSubmitForms () {
    return this.personS.updateInfo(this.userInfo["id"], this.editProfileForms.value);
  }
  callGetInfo () {
    return this.personS.getInfo({
      username: this.sharedS.data["userInfo"].username
    });
  }
  submitForms () {
    if (this.editProfileForms.dirty) {
      this.callApiSubmitForms()
      .subscribe(
        (data: any) => {
          alert("Thành công.")
          window.location.reload();
        }, // success path  
        error => {
          this.isResolve = false;
        }// error path
      );
    }
  }
}
