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

}
