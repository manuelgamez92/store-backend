import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  constructor(private shopService: ShopService, private route: Router) { }

  ngOnInit() {
  }
  onSearch(search:string){
    this.route.navigateByUrl("shop");
     this.shopService.search = search.trim();
     this.shopService.getProducts();

  }
}
