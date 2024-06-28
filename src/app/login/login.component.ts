import { Component } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(public ServicioLogin: LoginService, private router: Router) { }

  inicioSesion() {
    this.ServicioLogin.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        if (response.role === 'admin') {
          this.router.navigate(['/adm']);
        } else {
          this.router.navigate(['/user']); 
        }
        Swal.fire({
          icon: 'success',
          title: 'Has iniciado sesión',
          text: 'Bienvenido',
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña o correo incorrecto',
          text: 'Intenta de nuevo',
        });
      }
    });
    }

}
