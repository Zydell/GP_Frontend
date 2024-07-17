import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlServicios } from './urlServiciosWeb.component';
import { EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class ServiciviosVarios {
  urlServiciosTest: String="";
  user: any;
  authToken: any;
  constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
    this.urlServiciosTest = server.urlServicio ;
    
  }

  // MATERIALES
  ListadoMaterial() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 //   let parametros = opcion + "/" + tipo + "/" + codCarrera + "/" + param;
    return this.hpptclient.get<any>(this.urlServiciosTest + '/api/materiales',  { headers })
  }

  NuevoMaterial(intvalor:any, strnombre:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = { valor_por_libra: intvalor, tipo: strnombre } ;
    return this.hpptclient.post<any>(this.urlServiciosTest + '/api/materiales', parametros)
  }

  EstadoCambiarMaterial(idMaterial:number,estado:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log("AAAAAAAAAA: "+estado+idMaterial);
    let parametros = { estado: estado } ;
     return this.hpptclient.put<any>(this.urlServiciosTest + '/api/materiales/'+idMaterial, parametros)
  }

  ActualizacionMaterial(idMaterial:number,nombre:any, valorlibra:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = { tipo: nombre, valor_por_libra: valorlibra } ;
     return this.hpptclient.put<any>(this.urlServiciosTest + '/api/materiales/'+idMaterial, parametros)
  }

  //Ofertas
  ListadoOfertas() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 //   let parametros = opcion + "/" + tipo + "/" + codCarrera + "/" + param;
    return this.hpptclient.get<any>(this.urlServiciosTest + '/api/ofertas')
  }

  NuevaOferta(descripcion: string, gc_necesarios: number, negocio_id: number, fecha_inicio: Date, fecha_fin: Date){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const parametros = { descripcion, gc_necesarios, negocio_id, fecha_inicio, fecha_fin };
    return this.http.post<any>(this.urlServiciosTest + '/api/ofertas', parametros, { headers });
  }

  EstadoCambiarOfertas(idOferta: number, estado: boolean) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const parametros = { estado: estado };
    return this.hpptclient.put<any>(`${this.urlServiciosTest}/api/ofertas/${idOferta}`, parametros, { headers });
  }
  ActualizacionOfertas(idOferta: number, descripcion: string, gc_necesarios: number, negocio_id: number, fecha_inicio: Date, fecha_fin: Date, estado: boolean) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const parametros = { descripcion, gc_necesarios, negocio_id, fecha_inicio, fecha_fin, estado };
    return this.hpptclient.put<any>(`${this.urlServiciosTest}/api/ofertas/${idOferta}`, parametros, { headers });
  }
  //Puntos verdes
  // Listado de Puntos Verdes
  ListadoPuntosVerdes(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosTest + '/api/puntos_verdes')
  }

  // Listado de un punto verde por el id de negocio
  ListadoPuntoVerdeNegocio(id_negocio:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
 //   let parametros = opcion + "/" + tipo + "/" + codCarrera + "/" + param;
    return this.hpptclient.get<any>(this.urlServiciosTest + '/api/puntos_verdes/negocio/'+ id_negocio,  { headers })
  }
 
  // Crear un nuevo Punto Verde
  NuevoPuntoVerde(descripcion: string, direccion: string, latitud: number, longitud: number, negocio_id: number, estado: boolean = true){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const parametros = { descripcion, direccion, latitud, longitud, negocio_id, estado };
    return this.http.post<any>(`${this.urlServiciosTest}/api/puntos_verdes`, parametros, { headers });
  }

  // Cambiar el estado de un Punto Verde
  EstadoCambiarPuntoVerde(idPuntoVerde: number, estado: boolean){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const parametros = { estado };
    return this.http.put<any>(`${this.urlServiciosTest}/api/puntos_verdes/${idPuntoVerde}`, parametros, { headers });
  }

  // Actualizar un Punto Verde
  ActualizacionPuntoVerde(idPuntoVerde: number, descripcion: string, direccion: string, latitud: number, longitud: number, negocio_id: number, estado: boolean) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const parametros = { descripcion, direccion, latitud, longitud, negocio_id, estado };
    return this.http.put<any>(`${this.urlServiciosTest}/api/puntos_verdes/${idPuntoVerde}`, parametros, { headers });
  }

  //Negocios
  ListadoNegocios(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosTest + '/api/negocios')
  }

  NegocioId(idNegocio: number){
    return this.hpptclient.get<any>(`${this.urlServiciosTest}/api/negocios/${idNegocio}`);
  }
  
  // Cambiar el estado de un Negocio
  EstadoCambiarNegocio(idNegocio: number, estado: boolean) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const parametros = { estado };
    return this.http.put<any>(`${this.urlServiciosTest}/api/negocios/${idNegocio}`, parametros, { headers });
  }

  // Actualizar un Negocio
  ActualizacionNegocio(idNegocio: any, formData: FormData) {
    return this.http.put<any>(`${this.urlServiciosTest}/api/negocios/${idNegocio}`, formData);
}





    ListadoDimension() {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
   //   let parametros = opcion + "/" + tipo + "/" + codCarrera + "/" + param;
      return this.hpptclient.get<any>(this.urlServiciosTest + '/wsSimulador/rutadimension/ListadoDimensionTodos')
    }
  ActualizacionDimension(idDimension:number,intvalor:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = { int_valor: intvalor } ;
     return this.hpptclient.put<any>(this.urlServiciosTest + '/wsSimulador/rutadimension/ActualizarDimension/'+idDimension, parametros)
  }
  EstadoCambiarDimension(idDimension:number,estado:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = { bl_estado: estado } ;
     return this.hpptclient.put<any>(this.urlServiciosTest + '/wsSimulador/rutadimension/DesactivarDimension/'+idDimension, parametros)
  }
  NuevaDimension(intvalor:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
     let parametros = { int_valor: intvalor } ;
     return this.hpptclient.post<any>(this.urlServiciosTest + '/wsSimulador/rutadimension/CrearDimension', parametros)
  }

  // Registro de un reciclaje
  RegReciclaje(user: {  correo_electronico: string, negocio_id:any, punto_verde_id:any, cantidad:any, material_id:any, descripcion:any }): Observable<any> {
    return this.http.post<any>(this.urlServiciosTest + '/api/reciclaje/registrar', user);
  }
}
