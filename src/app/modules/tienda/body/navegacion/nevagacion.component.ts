import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { PublicService } from 'src/app/core/services/public.service';
import { CarroComponent } from '../../carro/carro.component';

@Component({
  selector: 'app-nevagacion',
  templateUrl: './nevagacion.component.html',
  styleUrls: ['./nevagacion.component.css']
})
export class NevagacionComponent {
  

  public subscription: Subscription;
  
  constructor(
    public pservice: PublicService,
    private modalService: NgbModal,
    public loginService : LoginService,
    private router: Router
    ) {

    this.pservice.getListCartSession().subscribe();

  }

  // public ngOnDestroy(): void {
  //   this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  // }

  // public ngOnInit(): void {
  //   // set subscribe to message service
  //   this.subscription = this.pservice.getidProducto().subscribe(msg => this.variable2 = msg);
  // }



  open() {


    if (this.pservice.lcart){
      const modalRef = this.modalService.open(CarroComponent);
      modalRef.componentInstance.listCart = this.pservice.lcart;
      
    }
  }

  logout(){
    this.loginService.logout().toPromise().then( _ => {
      () => this.router.navigateByUrl('/');
    })
  }

  


}
