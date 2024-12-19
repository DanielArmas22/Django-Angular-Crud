import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8000/api/login/';
  constructor(private http: HttpClient) {}
  public verificar(usuario: string, clave: string) {
    console.log('verificar', usuario, clave);
    const body = { username: usuario, password: clave };
    // Obtener el response del servidor
    this.http.post(this.url, body).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    return this.http.post(this.url, body);
  }
}
