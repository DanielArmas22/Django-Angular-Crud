import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { request } from 'http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css'],
  styles: [
    `
      @import url('../../../assets/css/login.css');
      // @import url('../../../assets/css/style.css');
    `,
  ],
})
export class LoginComponent implements OnInit {
  public frmLogin!: FormGroup;
  userExists: boolean | null = null;
  passwordExists: boolean | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get username() {
    return this.frmLogin.get('username');
  }
  get password() {
    return this.frmLogin.get('password');
  }
  public submitLogin(): void {
    console.log('aca');
    if (this.frmLogin.valid) {
      const useremail = this.frmLogin.value.username;
      const clave = this.frmLogin.value.password;
      console.log('aca');

      this.authService
        .verificar(useremail!, clave!)
        .subscribe(async (resp: any) => {
          if (resp.token) {
            this.router.navigate(['/home']);
            console.log('bienvendio');
          } else {
            this.passwordExists = false;
            console.log('Usuario o contraseña incorrectos');
          }
        });
    } else {
      this.userExists = false;
    }
  }
}
