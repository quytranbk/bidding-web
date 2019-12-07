import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name',];
  dataSource;
  constructor(
    private cateS: CategoryService
  ) { }

  ngOnInit() {
    this.cateS.getAllCategories().subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }

}
