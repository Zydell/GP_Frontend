import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pg-puntosverdes',
  templateUrl: './pg-puntosverdes.component.html',
  styleUrls: ['./pg-puntosverdes.component.css']
})
export class PgPuntosverdesComponent implements OnInit {

  constructor(private renderer: Renderer2, private http: HttpClient) { }

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

  async initMap(): Promise<void> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: userLat, lng: userLng },
          zoom: 16,  // Aproximadamente un radio de 2km
        });

        // Añadir marcador para la ubicación del usuario
        new google.maps.Marker({
          position: { lat: userLat, lng: userLng },
          map,
          title: 'Tu ubicación',
          icon: {
            url: "assets/img/ciudadano.png",
            scaledSize: new google.maps.Size(30, 30)
          }
        });

        try {
          const response = await this.http.get<any[]>('http://localhost:5000/api/puntos_verdes').toPromise();
          if (!response) {
            throw new Error('Error al obtener los puntos verdes');
          }

          response.forEach(punto => {
            new google.maps.Marker({
              position: { lat: punto.latitud, lng: punto.longitud },
              map,
              title: punto.descripcion,
              icon: {
                url: "assets/img/ubicacion.png",
                scaledSize: new google.maps.Size(60, 60)
              }
            });
          });
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      }, (error) => {
        console.error('Error al obtener la ubicación:', error.message);
        this.initializeMapWithFallback();
      });
    } else {
      console.error('Geolocalización no soportada por el navegador');
      this.initializeMapWithFallback();
    }
  }

  initializeMapWithFallback(): void {
    const fallbackLat = -1.6658965211679462;
    const fallbackLng = -78.65942951207546;
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: fallbackLat, lng: fallbackLng },
      zoom: 14,
    });

    this.addMarkers(map);
  }

  async addMarkers(map: any): Promise<void> {
    try {
      const response = await this.http.get<any[]>('http://localhost:5000/api/puntos_verdes').toPromise();
      if (!response) {
        throw new Error('Error al obtener los puntos verdes');
      }

      response.forEach(punto => {
        new google.maps.Marker({
          position: { lat: punto.latitud, lng: punto.longitud },
          map,
          title: punto.descripcion,
          icon: {
            url: "assets/img/ubicacion.png",
            scaledSize: new google.maps.Size(60, 60)
          }
        });
      });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
}
