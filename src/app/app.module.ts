import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TiendaComponent } from './modules/tienda/tienda/tienda.component';
import { BodyComponent } from './modules/tienda/body/body.component';
import { CarruselComponent } from './modules/tienda/body/carrusel/carrusel.component';
import { MenuComponent } from './modules/tienda/body/menu/menu.component';
import { NevagacionComponent } from './modules/tienda/body/navegacion/nevagacion.component';
import { CarroComponent } from './modules/tienda/carro/carro.component';
import { OrdenComponent } from './modules/tienda/orden/orden.component';
import { ProductoComponent } from './modules/tienda/producto/producto.component';
import { SigninComponent } from './modules/login/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TiendaComponent,
    BodyComponent,
    MenuComponent,
    NevagacionComponent,
    CarroComponent,
    OrdenComponent,
    CarruselComponent,
    ProductoComponent,
    SigninComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
