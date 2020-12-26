import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { expand, map, tap } from 'rxjs/operators';
import { ModelCarro } from '../models/model_carro';
import { Transaccion } from '../models/model_transaction';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private host = 'http://localhost:4000';
  // private host = 'https://node4g-test.herokuapp.com';
  private url = this.host+'/api/v1';
  
  public lcart: ModelCarro;
  public paramCategoria:String='';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Credentials': 'same-origin'
    }),
    withCredentials: true,
  }
  

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  /////////////Observable subscription //////////////////

  private subject = new Subject<any>();

  sendProductXcate(obj: any) {
    this.subject.next(obj);
  }

  clearProductXcate() {
    this.subject.next();
  }

  getProductXcate(): Observable<any> {
    console.log('getProductXcate');
    
    return this.subject.asObservable();
  }


  // private idProducto = new Subject<any>();

  // setidProducto(obj: any) {
  //   this.idProducto.next(obj);
  // }

  // clearidProducto() {
  //   this.idProducto.next();
  // }

  // getidProducto(): Observable<any> {
  //   console.log('getidProducto');

  //   return this.idProducto.asObservable();
  // }




  ///////////////// Productos ////////////////////////
  public getProductos(): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(this.url +"/producto/");
  }

  public getProductosByCategoria(categoraId) {
    this.paramCategoria = categoraId;
    return this.http
      .get(this.url + "/producto/categoria/" + categoraId).pipe(
        tap((rpta: Transaccion) =>  {
          console.log('rpta:',rpta);
          
          this.sendProductXcate(
            rpta.result ? rpta.data : []
          );
        })
      );
  }


  ///////////////// Categorias ////////////////////////

  public getCategorias(): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(this.url + "/categoria/");
  }

  /////////////// Listar Carro //////////////////////////////

  public getListCartSession(): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(this.url + "/carro/session/listar", { withCredentials: true }).pipe(
        map( item => {   
          this.lcart = <any>item.data;
            return item;
        })
      );
  }

  public getAddCarrito(productoId): Observable<Transaccion> {
    return this.http
      .get<Transaccion>(this.url + "/carro/session/addcarrito/" + productoId,
       { withCredentials: true }).pipe(
        tap(item => {
          

          this.lcart = <ModelCarro>item.data;
        })
      );
  }


  //////////////// ORDEN ////////////////////

  public generarOrden(usuarioId): Observable<Transaccion> {

    const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.loginService.token })
          ,
        withCredentials: true
      };

    return this.http
      .get<Transaccion>(this.url + "/orden/generarorden/"+usuarioId , httpOptions);
  }

  public getListarOrden(usuarioId): Observable<Transaccion> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.loginService.token
      })
      ,
      withCredentials: true
    };

    return this.http
      .get<Transaccion>(this.url + "/orden/listar/" + usuarioId, httpOptions );
  }


  ////////////// PRODUCTO //////////////////
  get headers() {
    return {
      headers: {
        'x-token': 'this.token'
      }
    }
  }

  public registrarProducto(file: File, producto: any){


    console.log("producto:", producto);
    
    const formData: FormData = new FormData();
    formData.append("producto_nombre", producto.producto_nombre );
    formData.append("descripcion", producto.descripcion );
    formData.append("precio", producto.precio );
    formData.append("stock", producto.stock );
    formData.append("categoria_nombre", producto.categoria_nombre);
    formData.append("imagen", file, file.name );
  
    console.log("formData:", formData);
    
    let token = this.loginService.token;
    
    let header= new HttpHeaders({
      'Authorization': token,
      
    });
     
    
    return this.http
      .post<Transaccion>(
        this.url + "/producto", 
        formData, 
        { headers: header, withCredentials: true },
      );
  }

}





