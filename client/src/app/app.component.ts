import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './models/product';
import { IPagination } from './models/paginations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  products: IProduct[] = [];
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http.get("https://localhost:5001/api/products").subscribe((data:IPagination)=>{
    console.log(data);
    this.products=data.data;
    },error =>{
      console.log(error);
    });
  }
}
