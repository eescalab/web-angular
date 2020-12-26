import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public message = null;

  public loginForm = this.fb.group({
    nombre: ['', [Validators.required,Validators.min(5), ]],
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)  ]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)]]
  });

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  
  submit(){
    this.loginForm.value
    this.loginservice.signin(this.loginForm.value).subscribe( rpta => {
      console.log('rpta:',rpta);
      
      this.router.navigateByUrl('/');
    }, ( err) => {
      console.log('err:',err);
        this.message = err.error.message + " " + err.error.data[0]?.msg;
    })
  }
 

}
