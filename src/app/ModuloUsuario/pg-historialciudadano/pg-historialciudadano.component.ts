import { Component } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-historialciudadano',
  templateUrl: './pg-historialciudadano.component.html',
  styleUrls: ['./pg-historialciudadano.component.css']
})
export class PgHistorialciudadanoComponent {
  title = 'GreenPoint';
  user: any = {};
  cdn: any[] = []; // Ajustamos esto a un array para almacenar múltiples registros

  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    this.listadoInformacion();
    console.log('User info on init:', this.user); // Agregar log para debug
  }

  async listadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoHistorialReciclaje(this.user.ciudadano_id).subscribe((translated: any) => { resolve(translated) }));
    console.log("INFOOOOOOOOOO " + JSON.stringify(data, null, 2) + "XD" + this.user.ciudadano_id);
    if (data) {
      this.cdn = data; // Suponiendo que la respuesta de la API es un array de ofertas
      console.log("Ofertas:", this.cdn);
    }
  }
}