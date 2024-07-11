/*import { Component } from '@angular/core';

@Component({
  selector: 'app-pg-negocio',
  templateUrl: './pg-negocio.component.html',
  styleUrls: ['./pg-negocio.component.css']
})
export class PgNegocioComponent {

}*/
import { Component,OnInit } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pg-negocio',
  templateUrl: './pg-negocio.component.html',
  styleUrls: ['./pg-negocio.component.css'],
  providers: [MessageService]
})
export class PgNegocioComponent implements OnInit{

  lsListado:any=[];
  objSeleccion:any="-1";

  nombre:any="";
  propietario :any="";
  tipo_negocio :any="";
  direccion:any="";
  telefono :any="";
  fecharegistro: Date | null = null;
  correo_electronico: string = "";
  contrasena: string = "";

  maxDate: string = '';
  uploadedFiles: any[] = [];
  imageBase64: string | null = null;

  strEstado:any="";
  visibleEditar: boolean=false;
  visibleEstado: boolean=false;
  visibleNuevo: boolean=false;
  selectedSize: any = 'p-datatable-sm';
  constructor
  (
    private servicios: ServiciviosVarios,
    private messageService: MessageService,
    private mensajes:Mensajes
  ) { }
async ngOnInit() {
 await this.ListadoInformacion();
}

ModalNuevoInformacion() {
this.nombre="";
this.propietario = "";
this.tipo_negocio = "";
this.direccion = "";
this.telefono = "";
this.fecharegistro = null;
this.correo_electronico = "";
this.contrasena = "";
this.visibleNuevo = true;
this.uploadedFiles = [];
this.imageBase64 = null;
const today = new Date();
this.maxDate = today.toISOString().split('T')[0];
}
onUpload(event: any): void {
  this.uploadedFiles = event.files;
  console.log("XDXDXD "+ this.uploadedFiles);
}

ModalEditarInformacion(seleccion:any) {
  this.objSeleccion=seleccion;
  console.log(this.objSeleccion)
    this.visibleEditar = true;
}
ModalCambiarEstado(seleccion:any) {
  this.objSeleccion=seleccion;
  if(this.objSeleccion.bl_estado){
    this.strEstado="Desactivar";
  }else{
    this.strEstado="Activar";
  }
  console.log(this.objSeleccion)
  this.visibleEstado = true;
}
  async ListadoInformacion() {

    const data = await new Promise<any>(resolve => this.servicios.ListadoNegocios().subscribe(translated => { resolve(translated) }));
   console.log(data)

    if (data) {
      this.lsListado=data;
    }
  }
  
  async RegistrarNuevo(){
    if (this.nombre?.trim() && 
    this.propietario?.trim() && 
    this.tipo_negocio?.trim() && 
    this.direccion?.trim() && 
    this.telefono?.trim() && 
    this.correo_electronico?.trim() && 
    this.contrasena?.trim() &&
    this.uploadedFiles.length > 0) {
      console.log("aqui")
      const formData = new FormData();
      formData.append('nombre', this.nombre.trim());
      formData.append('propietario', this.propietario.trim());
      formData.append('tipo_negocio', this.tipo_negocio.trim());
      formData.append('direccion', this.direccion.trim());
      formData.append('telefono', this.telefono.trim());
      if (this.fecharegistro) {
        formData.append('fecharegistro', this.fecharegistro.toISOString());
      }
        // Agregar la imagen si se ha cargado
        if (this.uploadedFiles.length > 0) {
          formData.append('image', this.uploadedFiles[0], this.uploadedFiles[0].name);
        }

        const data = await new Promise<any>(resolve => {
          this.servicios.NuevoNegocio(formData).subscribe(translated => {
            resolve(translated);
          });
        });
        console.log(data);
        if (data.success) {
          await this.ListadoInformacion();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
          this.visibleNuevo = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
        }
      
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Formulario inválido" });
    }
  }

  async RegistrarActualizacion(){
    if(this.objSeleccion.int_valor!=""){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.ActualizacionDimension(this.objSeleccion.id_dimension,this.objSeleccion.int_valor).subscribe(translated => { resolve(translated) }));
      //const data = await new Promise<any>(resolve => this.servicios.ActualizacionDimension(this.strEstado,this.objSeleccion.ounombre).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data.success){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEditar = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
    }else{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre }); 
    }
  }
  async EstadoCambiarActualizacion(){
    var estado:any;
    if(this.objSeleccion.bl_estado){
      estado=false;
    }else{
      estado=true;
    }
      console.log("aqui")
      //const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarDimension(this.objSeleccion.id_dimension,estado).subscribe(translated => { resolve(translated) }));
      const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarDimension(this.objSeleccion.id_dimension,estado).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data.success){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEstado = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
 
  }
}


