import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  
  subscription:Subscription
  products:Product[];
  filteredProducts :Product[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe((products: Product[])=>{this.filteredProducts = this.products = products});
  }
  applyFilter(value:string){
    this.filteredProducts = (value)? this.products.filter(p => p.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())):
    this.products
  }
  ngOnDestroy(){
      this.subscription.unsubscribe()
  }
 
}
