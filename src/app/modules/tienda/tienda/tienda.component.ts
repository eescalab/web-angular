import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { ModelProducto } from 'src/app/core/models/model_producto';
import { Transaccion } from 'src/app/core/models/model_transaction';
import { PublicService } from 'src/app/core/services/public.service';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit
// OnDestroy 
{

  public lmProducto$: Observable<any>;

  
  constructor(
    private pservice: PublicService,
    private activatedroute: ActivatedRoute
    ) {}


   

  ngOnInit(): void {
    
    
    this.activatedroute.params.subscribe(data => {
      
      this.listarProductos(data.id);
    })

  }

  
  listarProductos(productoId){
    // this.pservice.setidProducto(productoId);
    this.pservice.getProductosByCategoria(productoId).subscribe();
    this.lmProducto$ = this.pservice.getProductXcate();
  }

  addCarrito(productoId){
    console.log('add carrito', productoId);
    this.pservice.getAddCarrito(productoId).subscribe();
    
    
  }
}
