import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit{

  Productos: any[] = [];
  producto = {
    id: '',
    title: '',
    price: '',
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.verProd();
  }

  verProd() {
    this.productosService.consultarProductos().subscribe((data: any) => {
      this.Productos = data.products;
    });
  }

  guardarProd(){
    const token = localStorage.getItem('token') || '';

    this.productosService.guardar(
      this.producto.title,
      this.producto.price,
      token
    ).subscribe(
      (res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Producto registrado',
          text: '',
        });
        this.verProd();
        this.producto.title = "",
        this.producto.price = ""
      },
      (err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Producto no registrado',
          text: 'Intenta de nuevo',
        });
      }
    );
  }

  editarProd() {
      const token = localStorage.getItem('token') || '';

      this.productosService
        .modificar(
          this.producto.id,
          this.producto.title,
          this.producto.price,
          token
        )
        .subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Producto modificado',
              text: '',
            });
            this.verProd();
            this.producto.id = "",
            this.producto.title = "",
            this.producto.price = ""
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al modificar el producto',
              text: 'Intenta de nuevo',
            });
          }
        );
  }

  modoEditar(id:string, title:string, price:string){
    this.producto.id = id
    this.producto.title = title
    this.producto.price = price
  }

}
