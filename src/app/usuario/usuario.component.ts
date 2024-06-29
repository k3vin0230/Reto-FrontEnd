import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  Productos: any[] = [];
  productosFiltrados: any[] = [];
  clasificar: string = 'asc';
  nombreFiltrar: string = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.verProd();
  }

  verProd() {
    this.productosService.consultarProductos().subscribe((data: any) => {
      this.Productos = data.products;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    let products = this.Productos.filter(product =>
      product.title.toLowerCase().includes(this.nombreFiltrar.toLowerCase())
    );

    if (this.clasificar === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else {
      products.sort((a, b) => b.price - a.price);
    }

    this.productosFiltrados = products;
  }


}
