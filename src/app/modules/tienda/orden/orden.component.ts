import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ModelCarro } from 'src/app/core/models/model_carro';
import { ModelOrden } from 'src/app/core/models/model_orden';
import { LoginService } from 'src/app/core/services/login.service';
import { PublicService } from 'src/app/core/services/public.service';
import { CarroComponent } from '../carro/carro.component';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {

  public lorden: ModelOrden;
  public destroyed = new Subject<any>()
  private modelCarro: ModelCarro={};

  constructor(
    private publicService: PublicService,
    private loginService: LoginService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    ) {

    console.log('--------OrdenComponent');
      
    this.listarOrdenes();
      
   }

  ngOnInit() {

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.listarOrdenes();
    });

  }

  ngOnDestroy() {
   this.destroyed.next();
   this.destroyed.complete();
  }


  listarOrdenes(){
    let usuarioId = this.loginService.getUsuario()._id;
    this.publicService.getListarOrden(usuarioId).subscribe(rpta => {
      if (rpta.result) {
        this.lorden = <ModelOrden>rpta.data;
        console.log('lorden:', this.lorden);

      }
    })
  }

  pop(orden: ModelOrden){
    console.log(orden);

    this.modelCarro.items = orden.productos.map( item => {
      let data = {
        ...item.producto ,
        cantidad: item.cantidad,
        total: item.cantidad * item.producto.precio
      }
      
      return data;
    });
    this.modelCarro.total = orden.total;
    this.modelCarro.unidades = orden.productos.reduce( (unidades,item) => unidades += item.cantidad , 0);

    
    
    const modalRef = this.modalService.open(CarroComponent);
    modalRef.componentInstance.listCart = this.modelCarro;
    modalRef.componentInstance.orden = true;
    
  }

}
