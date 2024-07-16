import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';
declare var bootstrap: any; // Asegúrate de que Bootstrap está disponible

@Component({
  selector: 'app-pg-dashcodigosofertas',
  templateUrl: './pg-dashcodigosofertas.component.html',
  styleUrls: ['./pg-dashcodigosofertas.component.css']
})
export class PgDashcodigosofertasComponent implements OnInit {
  title = 'GreenPoint';
  user: any = {};
  ofertas: any[] = [];
  selectedOffer: any = null; // Variable para almacenar la oferta seleccionada

  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.listadoInformacion();
    console.log('User info on init:', this.user);
  }

  async listadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoHistorialOfertas(this.user.correo_electronico).subscribe((translated: any) => { resolve(translated) }));
    console.log("INFOOOOOOOOOO " + JSON.stringify(data, null, 2) + "XD" + this.user.correo_electronico);
    if (data) {
      this.ofertas = data;
      console.log("Ofertas:", this.ofertas);
    }
  }

  openModal(offer: any): void {
    this.selectedOffer = offer;
    const modalElement = document.getElementById('codeModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
