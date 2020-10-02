import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/paginations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { Subject } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  private productsUpdated = new Subject<{products: IPagination}>();

  typeIdSelected: number = 0;
  brandIdSelected: number = 0;
  ifBrandSelected = false;
  sortSelected : string = "name";
  pageNumber = 1;
  pageSize = 6;
  search : string ;
  constructor(private http: HttpClient) {}

  

  getProducts(shopParams? : ShopParams) {
    let params = new HttpParams();

    if (this.brandIdSelected !== 0 ) {
      params = params.append('brandId', this.brandIdSelected.toString());
    }
    if (this.typeIdSelected !== 0) {
      params = params.append('typeId', this.typeIdSelected.toString());
    }
    if (this.search) {
      params = params.append('search', this.search);
    }

    params = params.append('sort', this.sortSelected);
    params = params.append('pageIndex', this.pageNumber.toString());
    params = params.append('pageSize', this.pageSize.toString());


    this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      ).subscribe(data =>{
          this.productsUpdated.next({products:data});
      });
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getProductsUpdateListener(){
     return this.productsUpdated.asObservable();
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'products/'+
    id);
  }
}
