import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! :Array<any> ;
  constructor() {
    this.products=[
      {id : 1 , name : 'Computer', price : 6400},
      {id : 2 , name : 'Printer', price : 3432},
      {id : 3 , name : 'Smart Phone', price : 6400},
    ]
  }
  public getAllProducts() : Observable<Array<any>>{
    let rnd =Math.random();
    if(rnd<0.1)return throwError(()=>new Error("Internet Connexion Error"))
    else return of(this.products);
  }
}
