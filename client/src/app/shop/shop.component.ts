import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { Subscription } from 'rxjs';
import { IPagination } from '../shared/models/paginations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  private producsSub: Subscription;
  products: IProduct[];
 
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  ifBrandSelected = false;

  shopParams = new ShopParams();

  sortOptions = [
    {
      name: 'Alphabetical',
      value: 'name',
    },
    {
      name: 'Price: Low to high',
      value: 'priceAsc',
    },
    {
      name: 'Price: High to Low',
      value: 'priceDesc',
    },
  ];
  
  constructor(private shopService: ShopService) {
    this.getProducts();
        this.producsSub = this.shopService.getProductsUpdateListener()
    .subscribe((response: {products:IPagination}) =>{
      this.products = response.products.data;

      this.shopParams.pageNumber = response.products.pageIndex;
      this.shopService.pageNumber = response.products.pageIndex;

      this.shopParams.pageSize = response.products.pageSize;
      this.shopService.pageSize = response.products.pageSize;

      this.totalCount = response.products.count;
    });
  }
   ngOnInit() {
    this.getBrands();
    this.getProducts();
    this.getTypes();

    this.producsSub = this.shopService.getProductsUpdateListener()
    .subscribe((response: {products:IPagination}) =>{
      this.products = response.products.data;
      this.shopParams.pageNumber = response.products.pageIndex;
      this.shopService.pageNumber = response.products.pageIndex;

      this.shopParams.pageSize = response.products.pageSize;
      this.shopService.pageSize = response.products.pageSize;
    });

  }

  getProducts() {
    this.shopService.getProducts(this.shopParams);
    
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onBrandSelected(brandId: number) {
    this.shopService.brandIdSelected = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopService.typeIdSelected = typeId;
    this.getProducts();
  }
  getColor() {
    return 'red';
  }
  sortSelect(sort: string) {
    this.shopService.sortSelected = sort;
    this.getProducts();
  }
  onPageChanged(event: any) {
    this.shopService.pageNumber = event.page;
    this.getProducts();
  }
 
 
}
