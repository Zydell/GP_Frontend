import { Component,OnInit } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pg-puntoverde',
  templateUrl: './pg-puntoverde.component.html',
  styleUrls: ['./pg-puntoverde.component.css'],
  providers: [MessageService]
})
export class PgPuntoverdeComponent implements OnInit{

  lsListado:any=[];

  objSeleccion:any="-1";
  
  descripcion:any="";

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

ModalEditarInformacion(seleccion:any) {
  this.objSeleccion = { ...seleccion };
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

    const data = await new Promise<any>(resolve => this.servicios.ListadoPuntosVerdes().subscribe(translated => { resolve(translated) }));
    console.log(data)

    if (data) {
      for (let puntoverde of data) {
        const negocioInfo = await this.Buscarnegocio(puntoverde.negocio_id);
        puntoverde.negocioInfo = negocioInfo;
      }
      this.lsListado=data;
    }
  }

  async Buscarnegocio(idNegocio: number): Promise<string> {
    try {
      const data = await new Promise<any>((resolve, reject) => {
        this.servicios.NegocioId(idNegocio).subscribe({
          next: (translated) => resolve(translated),
          error: (err) => reject(err)
        });
      });
      return `${data.nombre} - Propietario: ${data.propietario} - Dirección: ${data.direccion}`
    } catch (error) {
      console.error('Error al buscar el negocio:', error);
      return 'Error al buscar el negocio';
    }
  }
  /*async RegistrarNuevo(){
    if(this.descripcion!=""){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.NuevoPuntoVerde(this.descripcion,this.).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data.success){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
        this.visibleNuevo = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
      }
    }else{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre });
      
    }


  }*/
  async RegistrarActualizacion(){
    if(this.objSeleccion.descripcion!=""){
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
    if(this.objSeleccion.estado){
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