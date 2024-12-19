import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { request } from 'http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  dni: string;
  telefono: string;
  username: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HomeComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  public frmLogin!: FormGroup;
  userExists: boolean | null = null;
  passwordExists: boolean | null = null;
  user: any;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.user = {
      first_name: '',
      last_name: '',
      dni: '',
      telefono: '',
      username: '',
      email: '',
      password: '',
    };
    this.frmLogin = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.getUsers();
  }
  get first_name() {
    return this.frmLogin.get('first_name');
  }
  get last_name() {
    return this.frmLogin.get('last_name');
  }
  get email() {
    return this.frmLogin.get('email');
  }
  getUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  get username() {
    return this.frmLogin.get('username');
  }
  get password() {
    return this.frmLogin.get('password');
  }
  public onSubmit(): void {
    console.log('aca1');
    if (this.frmLogin.valid) {
      this.user.first_name = this.frmLogin.value.firstName;
      this.user.last_name = this.frmLogin.value.lastName;
      this.user.dni = this.frmLogin.value.dni;
      this.user.telefono = this.frmLogin.value.telefono;
      this.user.username = this.frmLogin.value.username;
      this.user.email = this.frmLogin.value.email;
      this.user.password = this.frmLogin.value.password;
      console.log('aca2');
      console.log('user', this.user);
      this.authService.createUser(this.user).subscribe(async (resp: any) => {
        console.log('resp', resp);
        if (resp) {
          alert('Creado');
        } else {
          this.passwordExists = false;
          console.log('Usuario o contraseña incorrectos');
        }
      });
    } else {
      this.userExists = false;
      console.log('Error en la validación', this.frmLogin);
    }
  }
  public editUser(user: User): void {
    this.authService.updateUser(user).subscribe((resp: any) => {
      if (resp) {
        alert('Actualizado');
      } else {
        this.passwordExists = false;
        console.log('Usuario o contraseña incorrectos');
      }
    });
  }

  public deleteUser(user: User): void {
    console.log('deleteUser', user.id);
    this.authService.deleteUser(user.id).subscribe((resp: any) => {
      if (resp) {
        alert('Eliminado');
      } else {
        this.passwordExists = false;
        console.log('Usuario o contraseña incorrectos');
      }
    });
  }
}
