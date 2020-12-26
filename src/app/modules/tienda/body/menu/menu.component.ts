import { Component, OnInit } from '@angular/core';
import { ModelCategoria } from 'src/app/core/models/model_categoria';
import { Transaccion } from 'src/app/core/models/model_transaction';
import { PublicService } from 'src/app/core/services/public.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  public lcategorias: ModelCategoria[];

  constructor(private pservice: PublicService) {

    
   }

  ngOnInit(): void {
    this.pservice.getCategorias().subscribe((item: Transaccion) => {
    
      
      if (item.result) {
        this.lcategorias = item.data;
      }
    });
  }

}
