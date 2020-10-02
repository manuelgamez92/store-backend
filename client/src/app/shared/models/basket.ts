import uuid from 'uuid/dist/v4'; 

export interface IBasket {
    id: string;
    items: IBasketItem[];
  }
  
  export interface IBasketItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
  }

  export class Basket implements IBasket {
      id = uuid().toString();
      items:IBasketItem[] = [];
  }

  export interface IBasketTotals{
      shipping: number;
      subtotal: number;
      total: number;

  }