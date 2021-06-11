import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories:any[];
 @Input('category') category;
 
  constructor( private categoryService:CategoryService) {
    this.categoryService.getCategories().subscribe(categories =>{
      this.categories = categories
    })
   }
  
}
