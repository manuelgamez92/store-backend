import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
   basket$: Observable<IBasket>;
   currentUser$ : Observable<IUser>;
  constructor(private basketService: BasketService,private shopService: ShopService, private route: Router,private accountService: AccountService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }
  onSearch(search:string){
    this.route.navigateByUrl("shop");
     this.shopService.search = search.trim();
     this.shopService.getProducts();

  }
  logout(){
    this.accountService.logOut();
  }
  
}
