import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlServicios } from './urlServiciosWeb.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    urlServiciosTest: String="";
    user: any;
    authToken: any;
    constructor(
      private http: HttpClient, 
      server: UrlServicios, 
      private hpptclient: HttpClient
    ) {
      this.urlServiciosTest = server.urlServicio ;
    }

  login(credentials: { correo_electronico: string, contrasena: string }): Observable<any> {
    return this.hpptclient.post<any>(this.urlServiciosTest + '/api/auth/login', credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user)); // Almacena la información del usuario
          }/*
            if (response && response.token) {
              localStorage.setItem('token', response.token);
              if (response.user) {
                  localStorage.setItem('user', JSON.stringify(response.user)); // Almacena la información del usuario
              } else {
                  console.error('No user information in response');
              }
            }*/
        })
      );
  }

  register(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.urlServiciosTest + '/api/auth/register', user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Elimina la información del usuario
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', user);
        return user ? JSON.parse(user) : null; 
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getProtectedData(): Observable<any> {
    const token = this.getToken();
    if (!token) {
        throw new Error('No token found');
    }

    return this.hpptclient.get<any>(this.urlServiciosTest + '/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  }
}
