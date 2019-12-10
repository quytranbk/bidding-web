import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isSignedIn: boolean = false;
  constructor(
    private router: Router,
    private personS: PersonService,
  ) { }

  ngOnInit() {
    this.personS.checkAuth().subscribe(
      data => {
        this.isSignedIn = true;
        
      },
      error => {
        this.router.navigate(["/"]);
      }
    );
  }

}
