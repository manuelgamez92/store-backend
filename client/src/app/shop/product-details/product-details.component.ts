import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : IProduct;
  quantity = 1;
  constructor(private basketService: BasketService, private shopService: ShopService, private activateRoute : ActivatedRoute,private _location: Location,private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails', ' ');
   }

  ngOnInit(): void {
    this.loadProduct(2);
  }
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;

    }
  }
  goBack(){
    this._location.back();
  }
  loadProduct(id:number ){
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe
    (product =>{
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error =>{
      console.log(error);
    });
  }

}
