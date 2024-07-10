import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  registerCiudadano(user: { fecha_nac: Date, telefono: string, apellido: string, nombre: string, correo_electronico: string, contrasena: string }): Observable<any> {
    return this.http.post<any>(this.urlServiciosTest + '/api/auth/register/ciudadano', user);
  }
  /*
  registerNegocio(negocio: { nombre: string, correo_electronico: string, contrasena: string, propietario: string, tipo_negocio: string, direccion: string, telefono: string, fecha_creacion: Date, image: string | null }): Observable<any> {
    return this.http.post<any>(`${this.urlServiciosTest}/api/auth/register/negocio`, negocio);
  }
  */
  registerNegocio(user: FormData): Observable<any> {
    return this.http.post<any>(this.urlServiciosTest + '/api/auth/register/negocio', user);
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

  getInfo(id_cdn:number): any {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //let parametros = { str_nombre: strnombre, str_descripcion: strdescripcion, id_instruccion: selectedInstrucciones, id_recomendacion: selectedRecomendaciones } ;
    //console.log("VERIFICA: "+idTest, strnombre, strdescripcion, selectedInstrucciones, selectedRecomendaciones );
    return this.hpptclient.get<any>(this.urlServiciosTest + '/api/ciudadanos/'+id_cdn)
    /*
    this.hpptclient.get<any>(this.urlServiciosTest + '/api/ciudadanos/'+id_cdn)
    .subscribe(data => {
      console.log("Datos recibidos:", JSON.stringify(data, null, 2));
    },
    error => {
        console.error('Error al obtener los datos:', error);
    });
    */
    //return data;
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

  recuperar(correo_electronico: any): Observable<any> {
    return this.hpptclient.post(this.urlServiciosTest + '/api/recuperar-password', correo_electronico);
  }

}
