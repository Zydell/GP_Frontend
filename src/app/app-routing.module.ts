import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgInicioportadaComponent } from './Template/pg-inicioportada/pg-inicioportada.component';
import { DashboardpublicoComponent } from './Template/templatePublico/dashboardpublico/dashboardpublico.component';
import { DashboardadminComponent } from './Template/templateAdmin/dashboardadmin/dashboardadmin.component';
import { PortadainicialComponent } from './Template/templatePublico/portadainicial/portadainicial.component';
import { PgPrincipaladministracionComponent } from './ModuloAdministracion/pg-principaladministracion/pg-principaladministracion.component';
import { PgLoginComponent } from './Template/pg-login/pg-login.component';
import { PgRegisterComponent } from './Template/pg-register/pg-register.component';
import{ PgRecuperarComponent } from './Template/pg-recuperar/pg-recuperar.component';
//import { ProtectedComponent } from './components/protected/protected.component';
import { PgDashuserComponent } from './ModuloUsuario/pg-dashuser/pg-dashuser.component';
import { PgDashnegocioComponent } from './ModuloNegocio/pg-dashnegocio/pg-dashnegocio.component';
import { AuthGuard } from './ModuloServiciosWeb/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PgInicioportadaComponent
  },
  {
    path: 'login',
    component: PgLoginComponent
  },
  {
    path: 'registro',
    component: PgRegisterComponent
  },
  {
    path: 'recuperar',
    component: PgRecuperarComponent
  },
  //{ path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'user-menu', component: PgDashuserComponent, canActivate: [AuthGuard] },
  { path: 'user-negocio', component: PgDashnegocioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashpublic',
    component: DashboardpublicoComponent,
    children: [
      {
        path: 'inicio',
        component: PortadainicialComponent
      }     
    ]
    },
    {
      path: 'dashadmin',
      component: DashboardadminComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'inicioadmin',
          component: PortadainicialComponent
        },
        {
          path: 'principaladmin',
          component: PgPrincipaladministracionComponent
        }/*,
        {
          path: 'principaltest',
          component: PgPrincipaltestComponent
        }*/
      ]
      }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
