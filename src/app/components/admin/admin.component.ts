import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private personS: PersonService,
    
    private router: Router,
    ) { }

  ngOnInit() {
  }

  callSignOut () {
    this.personS.logout();
    this.router.navigate(["/"]);
  }

}
