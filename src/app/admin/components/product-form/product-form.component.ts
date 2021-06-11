import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 categories:any[];
 id:string;
 product:Product;

  constructor( private productService:ProductService,
              private categoryService:CategoryService,
              private route:ActivatedRoute,
              private router:Router
              ) { 
                this.categoryService.getCategories().subscribe(categories =>{
                  this.categories = categories
                })
              }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe(p => this.product = p)
     }
  
    

  save(form:NgForm){
    let product = form.value;
   if(this.id) this.productService.update(this.id, product);
    else this.productService.create( product);

    this.router.navigate(["/admin/products"]);
    
  }

  onReset(myForm:NgForm){
    myForm.form.reset();
  }

}
