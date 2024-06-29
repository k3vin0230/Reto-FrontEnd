import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministradorComponent } from './administrador/administrador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';






export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'adm', component: AdministradorComponent, canActivate:[AuthGuard]},
    { path: 'user', component: UsuarioComponent, canActivate:[AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }