import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @Input() searchedText: string;

  products: IProduct[];
  constructor(private shopService: ShopService) {}
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
  ngOnInit(): void {
    this.getBrands();
    this.getProducts();
    this.getTypes();

  }

  ngOnChanges() {
    this.searchText();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        console.log(response.data);
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        
      },
      (error) => {
        console.log(error);
      }
    );
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
    this.shopParams.brandIdSelected = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeIdSelected = typeId;
    this.getProducts();
  }
  getColor() {
    return 'red';
  }
  sortSelect(sort: string) {
    this.shopParams.sortSelected = sort;
    this.getProducts();
  }
  onPageChanged(event: any) {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }
  searchText() {
   this.shopParams.search = this.searchedText;
   this.getProducts();
  }
  onReset(){
    this.searchedText = undefined;
    this.shopParams = new ShopParams();
    this.getProducts();

  }
}
