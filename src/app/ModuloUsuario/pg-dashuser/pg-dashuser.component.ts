import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-dashuser',
  templateUrl: './pg-dashuser.component.html',
  styleUrls: [ './pg-dashuser.component.css'  ] 
})
export class PgDashuserComponent {
  title = 'GreenPoint';
  constructor(public  authService: AuthService, private router: Router) {}
    
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
