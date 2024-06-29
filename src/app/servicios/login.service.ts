import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url_login = 'http://localhost:3000/users/auth/login';

  constructor(private http: HttpClient, private router: Router) {}


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.url_login, { username, password });
  }


  cerrar_sesion() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
