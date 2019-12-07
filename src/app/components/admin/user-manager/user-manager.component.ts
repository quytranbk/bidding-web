import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username'];
  dataSource;
  constructor(
    private personS: PersonService
  ) { }

  ngOnInit() {
    this.personS.getAllUsers().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

}
