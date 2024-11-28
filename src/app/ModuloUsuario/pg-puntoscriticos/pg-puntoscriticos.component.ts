import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-pg-puntoscriticos',
  templateUrl: './pg-puntoscriticos.component.html',
  styleUrls: ['./pg-puntoscriticos.component.css']
})
export class PgPuntoscriticosComponent implements OnInit {

  private map: any; // Variable para almacenar la instancia del mapa
  private marcadorSeleccionado: any; // Variable para almacenar el marcador seleccionado
  public selectedImage: string | null = null; // Almacena la ruta de la imagen seleccionada para previsualización

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBR6xZnxe2B4Kw9VvuKGLNk9RDN_X7O2DU&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      this.initMap();
    };
    this.renderer.appendChild(document.body, script);
  }

  initMap(): void {
    const riobambaCoords = { lat: -1.663550, lng: -78.654642 }; // Coordenadas de Riobamba

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: riobambaCoords,
      zoom: 14,
    });

    // Evento de clic en el mapa para que el usuario seleccione una ubicación
    this.map.addListener('click', (event: any) => {
      this.marcarUbicacion(event.latLng);
    });
  }

  marcarUbicacion(latLng: any): void {
    // Si ya existe un marcador, lo movemos a la nueva ubicación
    if (this.marcadorSeleccionado) {
      this.marcadorSeleccionado.setPosition(latLng);
    } else {
      // Crear un nuevo marcador
      this.marcadorSeleccionado = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Ubicación seleccionada',
        draggable: true, // Permitir que el marcador se pueda mover
      });
    }

    // Mostrar las coordenadas seleccionadas en la consola (puedes adaptarlo a tu lógica)
    console.log(`Ubicación seleccionada: ${latLng.lat()}, ${latLng.lng()}`);
  }

  // Manejo del input file para previsualización
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result; // Almacenar la imagen previsualizada
      };
      reader.readAsDataURL(file);
    }
  }
}
