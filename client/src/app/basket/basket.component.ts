import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
   
  basket$: Observable<IBasket>;
  constructor(private basketService : BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$
    console.log(this.basket$);
  }

  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementQuantity(item);
  }
  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementQuantity(item);
  }

}