import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-dashcodigosofertas',
  templateUrl: './pg-dashcodigosofertas.component.html',
  styleUrls: ['./pg-dashcodigosofertas.component.css']
})
export class PgDashcodigosofertasComponent implements OnInit {
  title = 'GreenPoint';
  user: any = {};
  ofertas: any[] = []; // Ajustamos esto a un array para almacenar múltiples registros

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
    const data = await new Promise<any>(resolve => this.authService.getInfoHistorialOfertas(this.user.correo_electronico).subscribe((translated: any) => { resolve(translated) }));
    console.log("INFOOOOOOOOOO " + JSON.stringify(data, null, 2) + "XD" + this.user.correo_electronico);
    if (data) {
      this.ofertas = data; // Suponiendo que la respuesta de la API es un array de ofertas
      console.log("Ofertas:", this.ofertas);
    }
  }
}
