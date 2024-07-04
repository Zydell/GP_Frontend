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
    constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
      this.urlServiciosTest = server.urlServicio ;
      
    }

  login(credentials: { correo_electronico: string, contrasena: string }): Observable<any> {
    return this.hpptclient.post<any>(this.urlServiciosTest + '/api/auth/login', credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  register(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.urlServiciosTest + '/api/auth/register', user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
