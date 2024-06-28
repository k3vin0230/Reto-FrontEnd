import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private urlProd = 'http://localhost:3000/products'

  constructor(private http: HttpClient) {}

  consultarProductos(){
    return this.http.get<any>(this.urlProd);
  }


}
