import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PgInicioportadaComponent } from './Template/pg-inicioportada/pg-inicioportada.component';
import { HeaderpublicoComponent } from './Template/templatePublico/headerpublico/headerpublico.component';
import { FooterpublicoComponent } from './Template/templatePublico/footerpublico/footerpublico.component';
import { DashboardpublicoComponent } from './Template/templatePublico/dashboardpublico/dashboardpublico.component';
import { PortadainicialComponent } from './Template/templatePublico/portadainicial/portadainicial.component';
import { SpinnerService } from './ModuloServiciosWeb/spinner.service';
import { SpinnerInterceptor } from './ModuloServiciosWeb/InterceptorServicios.service';
import { SpinnerComponent } from './ModuloServiciosWeb/spinner.component';
import { ListboxModule } from 'primeng/listbox';
import { TooltipModule } from 'primeng/tooltip';
import { FooteradminComponent } from './Template/templateAdmin/footeradmin/footeradmin.component';
import { HeaderadminComponent } from './Template/templateAdmin/headeradmin/headeradmin.component';
import { MenuadminComponent } from './Template/templateAdmin/menuadmin/menuadmin.component';
import { DashboardadminComponent } from './Template/templateAdmin/dashboardadmin/dashboardadmin.component';
import { DropdownModule } from 'primeng/dropdown';
import { AuthInterceptor } from './ModuloServiciosWeb/auth.interceptor';
import { AuthService } from './ModuloServiciosWeb/Servicio.Auth';
import { UrlServicios } from './ModuloServiciosWeb/urlServiciosWeb.component'; // Asegúrate de importar tu servicio UrlServicios
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AvatarModule } from 'primeng/avatar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { MegaMenuModule } from 'primeng/megamenu';
import { SpinnerModule } from 'primeng/spinner';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { PgPrincipaladministracionComponent } from './ModuloAdministracion/pg-principaladministracion/pg-principaladministracion.component';
import { PgNegocioComponent } from './ModuloAdministracion/pg-negocio/pg-negocio.component';
import { PgMaterialComponent } from './ModuloAdministracion/pg-material/pg-material.component';
import { PgPuntoverdeComponent } from './ModuloAdministracion/pg-puntoverde/pg-puntoverde.component';
import { PgOfertaComponent } from './ModuloAdministracion/pg-oferta/pg-oferta.component';
import { PgLoginComponent } from './Template/pg-login/pg-login.component';
import { PgRegisterComponent } from './Template/pg-register/pg-register.component';
import { PgDashuserComponent } from './ModuloUsuario/pg-dashuser/pg-dashuser.component';
import { PgPuntosverdesComponent } from './ModuloUsuario/pg-puntosverdes/pg-puntosverdes.component';
import { GreenPointsMapComponent } from './green-points-map/green-points-map.component';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PgRecuperarComponent } from './Template/pg-recuperar/pg-recuperar.component';
import { PgDashnegocioComponent } from './ModuloNegocio/pg-dashnegocio/pg-dashnegocio.component';
import { PgDashpuntosverdesnegocioComponent } from './ModuloNegocio/pg-dashpuntosverdesnegocio/pg-dashpuntosverdesnegocio.component';
import { PgDashcodigosofertasComponent } from './ModuloUsuario/pg-dashcodigosofertas/pg-dashcodigosofertas.component';
import { PgAdministradoresComponent } from './ModuloAdministracion/pg-administradores/pg-administradores.component';
import { PgHistorialciudadanoComponent } from './ModuloUsuario/pg-historialciudadano/pg-historialciudadano.component';
import { PgRegistroreciclajeComponent } from './ModuloNegocio/pg-registroreciclaje/pg-registroreciclaje.component';
import { PgHistorialnegocioComponent } from './ModuloNegocio/pg-historialnegocio/pg-historialnegocio.component';
import { PgVerofertasComponent } from './ModuloNegocio/pg-verofertas/pg-verofertas.component';
import { PgGestionofertasComponent } from './ModuloNegocio/pg-gestionofertas/pg-gestionofertas.component';
import { PgCanjeoofertasComponent } from './ModuloUsuario/pg-canjeoofertas/pg-canjeoofertas.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PgMapapvnegocioComponent } from './ModuloNegocio/pg-mapapvnegocio/pg-mapapvnegocio.component';
import { PgValidarcodigoComponent } from './ModuloNegocio/pg-validarcodigo/pg-validarcodigo.component';
import { PgCiudadanosComponent } from './ModuloAdministracion/pg-ciudadanos/pg-ciudadanos.component';
import { PgPerfilAdminComponent } from './ModuloAdministracion/pg-perfil-admin/pg-perfil-admin.component';
import { PgFaqComponent } from './ModuloNegocio/pg-faq/pg-faq.component';
import { PgContactoComponent } from './ModuloNegocio/pg-contacto/pg-contacto.component';
import { PgPerfilnegocioComponent } from './ModuloNegocio/pg-perfilnegocio/pg-perfilnegocio.component';
import { PgPerfilusuarioComponent } from './ModuloUsuario/pg-perfilusuario/pg-perfilusuario.component';
import { PgMapaPuntosVerdesAdminComponent } from './ModuloAdministracion/pg-mapa-puntos-verdes-admin/pg-mapa-puntos-verdes-admin.component';
import { ErrorInterceptor } from './interceptors/error-interceptor'; 
import { ServerErrorComponent } from './server-error/server-error.component';
import { PgPuntoscriticosComponent } from './ModuloUsuario/pg-puntoscriticos/pg-puntoscriticos.component'; 

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    PgInicioportadaComponent,
    HeaderpublicoComponent,
    FooterpublicoComponent,
    DashboardpublicoComponent,
    PortadainicialComponent,
    FooteradminComponent,
    HeaderadminComponent,
    MenuadminComponent,
    DashboardadminComponent,
    PgPrincipaladministracionComponent,
    PgNegocioComponent,
    PgMaterialComponent,
    PgPuntoverdeComponent,
    PgOfertaComponent,
    PgLoginComponent,
    PgRegisterComponent,
    PgDashuserComponent,
    PgPuntosverdesComponent,
    GreenPointsMapComponent,
    PgRecuperarComponent,
    PgDashnegocioComponent,
    PgDashpuntosverdesnegocioComponent,
    PgDashcodigosofertasComponent,
    PgAdministradoresComponent,
    PgHistorialciudadanoComponent,
    PgRegistroreciclajeComponent,
    PgHistorialnegocioComponent,
    PgVerofertasComponent,
    PgGestionofertasComponent,
    PgCanjeoofertasComponent,
    PgMapapvnegocioComponent,
    PgValidarcodigoComponent,
    PgCiudadanosComponent,
    PgPerfilAdminComponent,
    PgFaqComponent,
    PgContactoComponent,
    PgPerfilnegocioComponent,
    PgPerfilusuarioComponent,
    PgMapaPuntosVerdesAdminComponent,
    ServerErrorComponent,
    PgPuntoscriticosComponent
  ],
  imports: [
    BrowserModule,
    MessagesModule, 
    RadioButtonModule,
    HttpClientModule,
    DropdownModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ListboxModule,
    TooltipModule,
    ToggleButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
    SpinnerModule,
    MegaMenuModule,
    AvatarModule,
    MenuModule,
    CardModule,
    PanelMenuModule,
    TabViewModule,
    TableModule,
    ProgressSpinnerModule,
    AccordionModule,
    TagModule,
    ImageModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    MenubarModule,
    SlideMenuModule,
    DialogModule,
    DividerModule,
    ToastModule,
    FileUploadModule
  ],
  providers: [
    AuthService, 
    UrlServicios, 
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
