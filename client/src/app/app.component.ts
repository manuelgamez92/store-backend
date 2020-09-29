import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/paginations';
import { ShopComponent } from './shop/shop.component';
import { ShopParams } from './shared/models/shopParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
 
  @ViewChild('shopComp') shop;
   searchText : string ;
  ngOnInit(){
  
  }
    passingSearch($event){
    this.searchText = $event.trim();
  }
}
