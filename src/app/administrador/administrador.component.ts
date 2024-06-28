import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit{

  Productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.verProd();
  }

  verProd() {
    this.productosService.consultarProductos().subscribe((data: any) => {
      this.Productos = data.products;
    });
  }

}
