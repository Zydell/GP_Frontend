import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-green-points-map',
  templateUrl: './green-points-map.component.html',
  styleUrls: ['./green-points-map.component.css']
})
export class GreenPointsMapComponent implements OnInit {

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
        new google.maps.Marker({
          position: { lat: punto.latitud, lng: punto.longitud },
          map,
          title: punto.descripcion,
          icon: {
            url: "assets/img/recycle.png",
            scaledSize: new google.maps.Size(25, 25)
          }
        });
      });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
}
