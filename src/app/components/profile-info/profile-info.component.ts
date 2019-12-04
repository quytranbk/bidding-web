import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { SharedRouteDataService } from '../../services/shared-route-data.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  editProfileForms = new FormBuilder().group({
    name: [""],
    email: [""],
    username: [""],
    phone: [""],
    address: [""],
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
        this.userInfo = data;
        this.editProfileForms = new FormBuilder().group({
          name: [this.userInfo.name],
          email: [this.userInfo.email],
          phone: [this.userInfo.phone],
          address: [this.userInfo.address],
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
    return this.personS.updateInfo({...this.editProfileForms.value});
  }
  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.getInfo();
  }
  submitForms () {
    if (this.editProfileForms.dirty) {
      this.callApiSubmitForms()
      .subscribe(
        (data: any) => {
          alert("Thành công.");
          window.location.reload();
        }, // success path  
        error => {
          this.isResolve = false;
        }// error path
      );
    }
  }
}