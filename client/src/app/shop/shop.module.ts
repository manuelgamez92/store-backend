import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../shared/models/paginations';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ShopComponent,ProductItemComponent]
})
export class ShopModule { 



}
