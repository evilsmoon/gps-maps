import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/models/position.models';
import { GpsService } from '../../services/gps.service';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  ruta:Position[] = [];
  lat!: number;
  lng!: number;

  constructor( private geo_data:GpsService ) {
  }

  ngOnInit() {
    this.ruta = this.geo_data.Ruta || [];
    this.lat = Number(this.ruta[0].lat);
    this.lng = Number(this.ruta[0].log);
  }

  // ionViewWillEnter(){
  //   this.ruta = this.geo_data.Ruta || [];
  // }

  // ionViewDidEnter(){
  //   console.log(this.ruta);
  //   this.lat = Number(this.ruta[0].lat);
  //   this.lng = Number(this.ruta[0].log);
  //   console.log(this.lat);
  //   console.log(this.lng);
  // }

  ngAfterViewInit() {
    // console.log(this.ruta)
    if (this.ruta.length == 1){
      this.drawMap(this.ruta[0].lat,this.ruta[0].log)
    }

  }

  drawMap(lat:number,lng:number){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXZpbHNtb29uIiwiYSI6ImNrd2w4YWllMzF6bHcydm5za2l1dnZqOWwifQ.bQ82x317PQ3LE3kW6TmUIQ';

    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map'
    });

    map.on('load', () => {

      map.resize();

      // Marker
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);



      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);
    });

  }

}
