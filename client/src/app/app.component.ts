import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/paginations';
import { ShopComponent } from './shop/shop.component';
import { ShopParams } from './shared/models/shopParams';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('shopComp') shop;
  searchText: string;

  constructor(private basketService: BasketService,private accountService: AccountService) {}

  ngOnInit() {
    this.loadBasket();
    this.loadCurrentUser();

  }
  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log("loaded user")
      },error =>{
        console.log('error: '+error);
      })
    }
  }
  passingSearch($event) {
    this.searchText = $event.trim();
  }
  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('initial basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
