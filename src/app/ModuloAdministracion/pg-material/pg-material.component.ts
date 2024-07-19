import { Component,OnInit } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed

@Component({
  selector: 'app-pg-material',
  templateUrl: './pg-material.component.html',
  styleUrls: ['./pg-material.component.css'],
  providers: [MessageService]
})
export class PgMaterialComponent implements OnInit{

  lsListado:any=[];
  objSeleccion:any="-1";
  intvalor:number = 0;
  strnombre:any="";
  strEstado:any="";
  visibleEditar: boolean=false;
  visibleEstado: boolean=false;
  visibleNuevo: boolean=false;
  selectedSize: any = 'p-datatable-sm';
  constructor
  (
    private servicios: ServiciviosVarios,
    private messageService: MessageService,
    private mensajes:Mensajes,
    private sortingService: SortingService
  ) { }
async ngOnInit() {
 await this.ListadoInformacion();
}

ModalNuevoInformacion() {
this.intvalor=0;
this.strnombre="";
    this.visibleNuevo = true;
}
ModalEditarInformacion(seleccion:any) {
  this.objSeleccion = { ...seleccion };
  console.log(this.objSeleccion)
  this.visibleEditar = true;
}
ModalCambiarEstado(seleccion:any) {
  this.objSeleccion=seleccion;
  if(this.objSeleccion.estado){
    this.strEstado="Desactivar";
  }else{
    this.strEstado="Activar";
  }
  console.log(this.objSeleccion)
  this.visibleEstado = true;
}
  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.servicios.ListadoMaterial().subscribe(translated => { resolve(translated) }));
    console.log(data)

    if (data) {
      this.lsListado = this.sortingService.ordenarPorIdAscendente(data, 'materiales_id'); // Default sorting by ID Ascending
    }
  }
  
  async RegistrarNuevo(){
    if(this.intvalor>0 && this.strnombre!=""){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.NuevoMaterial(this.intvalor, this.strnombre).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
        this.visibleNuevo = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
      }
    }else{
      this.messageService.add({ severity: 'info', summary: 'Info',detail: "Valores Validos" });
      
    }
  }

  async RegistrarActualizacion(){
    if(this.objSeleccion.tipo!="" && this.objSeleccion.valor_por_libra>0){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.ActualizacionMaterial(this.objSeleccion.materiales_id,this.objSeleccion.tipo,this.objSeleccion.valor_por_libra).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data){
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
    if(this.objSeleccion.estado){
      estado=false;
    }else{
      estado=true;
    }
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarMaterial(this.objSeleccion.materiales_id,estado).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEstado = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
 
  }
}
