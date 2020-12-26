import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelCarro } from 'src/app/core/models/model_carro';
import { LoginService } from 'src/app/core/services/login.service';
import { PublicService } from 'src/app/core/services/public.service';



@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  @Input() public listCart: ModelCarro;
  @Input() public orden:boolean;

  public message:String;

  constructor(
    private pservice: PublicService,
    public loginService: LoginService,
    private activatedroute: ActivatedRoute
    ) {
    this.listCart = pservice.lcart;
   }

  ngOnInit() {


  }

  generarOrden(){

   
    

    let usuarioId = this.loginService.getUsuario()._id;
    // console.log('usuarioId', usuarioId);

    this.pservice.generarOrden(usuarioId).subscribe( rpta => {
      if (rpta.result){
        this.pservice.getListCartSession().subscribe( _ => {
          this.message = "Orden Generada !!!";
        })

        if (this.pservice.paramCategoria){
          this.pservice.getProductosByCategoria(this.pservice.paramCategoria).subscribe();
        }
        
         
      }else{
        this.message = rpta.message;
      }
    }, (error) => {                   
        this.message = error.error.message;
    })
    
  }

}
