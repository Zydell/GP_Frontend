import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let openInfoWindows: any[] = []; // Declare openInfoWindows as an array of google.maps.InfoWindow

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
            this.http.get<any>(`http://localhost:5000/api/negocios/${punto.negocio_id}`).subscribe(
              (negocio: any) => {
                let distancia=calcularDistancia(userLat,userLng,punto.latitud,punto.longitud);
                const contentString = `
                  <div>
                    <h1>${negocio.nombre}</h1>
                    <div>
                      <p>${punto.descripcion}</p>
                      <p>${punto.direccion}</p>                      
                      <p><b>Estas a :</b>${distancia} m.</p>
                    </div>
                  </div>`;
                const infoWindow = new google.maps.InfoWindow({
                  content: contentString,
                  ariaLabel: negocio.nombre,
                });
            
                const marker = new google.maps.Marker({
                  position: { lat: punto.latitud, lng: punto.longitud },
                  map,
                  title: punto.descripcion,
                  icon: {
                    url: "assets/img/ubicacion.png",
                    scaledSize: new google.maps.Size(60, 60)
                  }
                });
                marker.addListener('click', () => {
                  this.openInfoWindow(map, marker, infoWindow);
                });
              },
              (error: any) => {
                console.error('Error al obtener el negocio:', error.message);
              }
            );
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
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBR6xZnxe2B4Kw9VvuKGLNk9RDN_X7O2DU&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      this.addMarkers();
    };
    this.renderer.appendChild(document.body, script);
  }

  async addMarkers(): Promise<void> {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -1.6658965211679462, lng: -78.65942951207546 },
      zoom: 14,
    });

    try {
      const response = await this.http.get<any[]>('http://localhost:5000/api/puntos_verdes').toPromise();
      if (!response) {
        throw new Error('Error al obtener los puntos verdes');
      }
      
      response.forEach(punto => {
        this.http.get<any>(`http://localhost:5000/api/negocios/${punto.negocio_id}`).subscribe(
          (negocio: any) => {
            const contentString = `
              <div>
                <h1>${negocio.nombre}</h1>
                <div>
                  <p>${punto.descripcion}</p>
                  <p>${punto.direccion}</p>
                </div>
              </div>`;
            const infoWindow = new google.maps.InfoWindow({
              content: contentString,
              ariaLabel: negocio.nombre,
            });
        
            const marker = new google.maps.Marker({
              position: { lat: punto.latitud, lng: punto.longitud },
              map,
              title: punto.descripcion,
              icon: {
                url: "assets/img/ubicacion.png",
                scaledSize: new google.maps.Size(60, 60)
              }
            });
            marker.addListener('click', () => {
              this.openInfoWindow(map, marker, infoWindow);
            });
          },
          (error: any) => {
            console.error('Error al obtener el negocio:', error.message);
          }
        );
      
      });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
  openInfoWindow(map: any, marker: any, infoWindow: any): void {
    // Close the oldest infoWindow if there are two open
    if (openInfoWindows.length >=1) {
      const oldestInfoWindow = openInfoWindows.shift();
      oldestInfoWindow?.close();
    }

    // Open the new infoWindow and add it to the array
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
    openInfoWindows.push(infoWindow);
  }
}
function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = lat1 * Math.PI / 180; // Convertir latitud 1 a radianes
  const φ2 = lat2 * Math.PI / 180; // Convertir latitud 2 a radianes
  const Δφ = (lat2 - lat1) * Math.PI / 180; // Diferencia de latitud en radianes
  const Δλ = (lon2 - lon1) * Math.PI / 180; // Diferencia de longitud en radianes

  // Fórmula de Haversine
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = R * c; // Distancia en metros

  return distancia;
}