import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { log } from 'console';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private urlProd = 'http://localhost:3000/products'

  constructor(private http: HttpClient) {}

  consultarProductos(){
    return this.http.get<any>(this.urlProd);
  }


  guardar(
    title: string,
    price: string,
    token: string
   ) {

    const fd = new FormData();
    fd.append("title", title);
    fd.append("price", price);


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(this.urlProd, fd, { headers });
  }

  modificar(
    id: string,
    title: string,
    price: string,

    token: string) {

    const fd = new FormData();
    fd.append("title", title);
    fd.append("price", price);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${this.urlProd}/update/${id}`, fd, {headers});
  }

  eliminarProd(
    id: string,
    token: string) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  
    

    return this.http.delete<any>(`${this.urlProd}/delete/${id}`);
  }

}
