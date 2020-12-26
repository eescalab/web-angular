import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth_guard';
import { LoginComponent } from './modules/login/login/login.component';
import { SigninComponent } from './modules/login/signin/signin.component';
import { BodyComponent } from './modules/tienda/body/body.component';
import { OrdenComponent } from './modules/tienda/orden/orden.component';
import { ProductoComponent } from './modules/tienda/producto/producto.component';

import { TiendaComponent } from './modules/tienda/tienda/tienda.component';


const routes: Routes = [
  { path: '', redirectTo: 'tienda', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'tienda', component: BodyComponent,
    children: [

      {
        path: ':id', component: TiendaComponent
      },
    ],
    
  },

  {
    path: 'privado', component: BodyComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'producto', component: ProductoComponent
      },
      {
        path: 'listarOrden', component: OrdenComponent
      }
    ],

  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
