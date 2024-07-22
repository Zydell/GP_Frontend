import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed

import { Router } from '@angular/router';
@Component({
  selector: 'app-pg-perfil-admin',
  templateUrl: './pg-perfil-admin.component.html',
  styleUrls: ['./pg-perfil-admin.component.css'],
  providers: [MessageService]
})
export class PgPerfilAdminComponent implements OnInit{
  user: any = {};
  admin: any = {};
  editUser: any = {};
  currentPassword: string = '';
  newPassword: string = '';
  renewPassword: string = '';

  constructor(
    public  authService: AuthService, 
    private servicios: ServiciviosVarios,
    private messageService: MessageService,
    private mensajes:Mensajes,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Obtiene la información del usuario
    this.loadUserData(this.user.admin_id); // Cargar datos del usuario al inicializar el componente
  }

  async loadUserData(id: number): Promise<void> {
    try {
      const data = await this.servicios.AdminPorId(id).toPromise();
      this.admin = data;
      console.log(this.admin);

      const correoAdmin = await this.BuscarcorreoAdmin(this.admin.admin_id);
      if (correoAdmin) {
        this.admin.correo_electronico = correoAdmin.correo_electronico;
        this.admin.idcredencial = correoAdmin.credencial_id;
      } else {
        this.admin.correo_electronico = 'No email found';
        this.admin.idcredencial = 'No credential found';
      }
    } catch (error) {
      console.error('Error in loadUserData:', error);
    }
  }

  async loadEditUser(): Promise<void> {
    await this.loadUserData(this.user.admin_id);
    this.editUser = { ...this.admin }; // Hace una copia de los datos del usuario para editar
  }

  async cambiarclave(): Promise<void> {
    this.currentPassword = '';
    this.newPassword = '';
    this.renewPassword = '';
  }  

  async BuscarcorreoAdmin(idAdmin: number): Promise<any> {
    try {
      const data = await this.servicios.CredencialIduserType(idAdmin, 3).toPromise();
      return data;
    } catch (error) {
      console.error('Error in BuscarcorreoAdmin:', error);
      return null;
    }
  }

  
  async GuardarCambiosPerfil() {
    if (this.editUser.nombre.length > 3) {
      console.log("aquí");
      try {
        const data = await new Promise<any>(resolve =>
          this.servicios.ActualizacionAdmin(this.editUser.admin_id, this.editUser.nombre).subscribe(translated => {
            resolve(translated);
          })
        );
        console.log(data);
        if (data) {
          window.location.reload();
          this.showMessage('success', 'Success', this.mensajes.ActualizacionExitosa);
        } else {
          this.showMessage('error', 'Error', this.mensajes.ActualizacionError);
        }
      } catch (error) {
        console.error(error);
        this.showMessage('error', 'Error', 'Error en la actualización');
      }
    } else {
      this.showMessage( 'info',  'Info',  'Por favor complete todos los campos' );
    }
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return passwordRegex.test(password);
  }

  CambioClave(): void {
    if (!this.validatePassword(this.newPassword)) {
      this.showMessage('error', 'Error', 'La nueva contraseña no cumple con las restricciones: mínimo 8 caracteres, máximo 16 caracteres, al menos una letra mayúscula y un número');
      return;
    }

    if (this.newPassword !== this.renewPassword) {
      this.showMessage('error', 'Error', 'Las contraseñas nuevas no coinciden');
      return;
    }

    if (this.newPassword === this.currentPassword) {
      this.showMessage('error', 'Error', 'La contraseña nueva no debe ser igual a la anterior');
      return;
    }

    this.CambiarContrasena(this.user.correo_electronico, this.currentPassword, this.newPassword);
  }

  CambiarContrasena(correo: string, claveActual: string, nuevaClave: string): void {
    this.servicios.CambiarContrasena(correo, claveActual, nuevaClave).subscribe(
      response => {
        this.showMessage('success', 'Success', 'Contraseña actualizada con éxito');
        this.logout();
      },
      error => {
        this.showMessage('error', 'Error', 'La contraseña actual es Incorrecta');
      }
    );
  }

  logout() {
    this.authService.logout();
    this.showMessage('success', 'Success', 'Contraseña actualizada con éxito');
    this.router.navigate(['/login']);
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }

}
