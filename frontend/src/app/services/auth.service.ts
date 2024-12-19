import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public createUser(user: any) {
    return this.http.post('http://localhost:8000/api/users/v1/usuarios/', user);
  }
  public getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>('http://localhost:8000/api/users/v1/usuarios/')
      .pipe(
        map((response) => {
          // Asegúrate de que el response sea un array
          return Array.isArray(response) ? response : [];
        })
      );
  }
  public updateUser(user: any) {
    return this.http.put(
      `http://localhost:8000/api/users/v1/usuarios/${user.id}/`,
      user
    );
  }
  public deleteUser(id: number) {
    return this.http.delete(
      `http://localhost:8000/api/users/v1/usuarios/${id}/`
    );
  }
}
