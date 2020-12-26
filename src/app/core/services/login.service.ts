import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Transaccion } from '../models/model_transaction';
import { ModelUsuario } from '../models/model_usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private host = 'http://localhost:4000';
  // private host = 'https://node4g-test.herokuapp.com';
  private url = this.host + '/api/v1';
  public usuario: ModelUsuario;
  public 

constructor(
  private http: HttpClient,
) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }




  guardarLocalStorage(token: string) {

    localStorage.setItem('token', token);

    let hoy = new Date();
    hoy.setSeconds(1800);
    localStorage.setItem('expira', hoy.getTime().toString());

  }

  estaAutenticado(): boolean {
        
    if (localStorage.getItem('token')===null)
      return false;

    if (localStorage.getItem('usuario') === null)
      return false;

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }


  }

  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario')) || {};
  }



//////////////Signin

  login(email:String, password: String){

    let data = {
      email,
      password
    }
    return this.http.post<Transaccion>(`${this.url}/login`, data, 
    { withCredentials: true })
    .pipe(
      tap((resp: Transaccion )=> {
        if (resp.result ){
          this.guardarLocalStorage(resp.data['token']);

          this.usuario = new ModelUsuario(
            resp.data['usuarioId'],
            resp.data['nombre'],
            resp.data['role']
          );
          localStorage.setItem('usuario', JSON.stringify(this.usuario))
          
          
        }
        
      })
    );

  }


  signin(formValue:any) {

    console.log('formValue:', formValue);
    
    return this.http.post<Transaccion>(`${this.url}/signin`, formValue,
      { withCredentials: true })
      .pipe(
        tap((resp: Transaccion) => {
          if (resp.result) {
            this.guardarLocalStorage(resp.data['token']);

            this.usuario = new ModelUsuario(
              resp.data['usuarioId'],
              resp.data['nombre'],
              resp.data['role']
            );
            localStorage.setItem('usuario', JSON.stringify(this.usuario))


          }

        })
      );

  }



  logout(){

    return this.http.get<Transaccion>(`${this.url}/logout`, { withCredentials: true })
    .pipe(
      tap((resp: Transaccion) => {
        console.log('logout=>', resp.result);
        
        if(resp.result){
          localStorage.removeItem('token');
          localStorage.removeItem('expira');
          localStorage.removeItem('usuario');
        }
      }
      )
    )

    


    
  }


}
