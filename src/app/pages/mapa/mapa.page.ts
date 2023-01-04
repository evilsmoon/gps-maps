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

  ruta: Position[] = [];
  lat!: number;
  lng!: number;

  constructor(private geo_data: GpsService) {

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
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXZpbHNtb29uIiwiYSI6ImNrd2w4YWllMzF6bHcydm5za2l1dnZqOWwifQ.bQ82x317PQ3LE3kW6TmUIQ';
    if (this.ruta.length == 1){
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v9',
        center: [this.ruta[0].log, this.ruta[0].lat],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map'
      });
      this.drawMap(this.ruta[0].lat,this.ruta[0].log,map)
      // .setLngLat([-78.49687202383572, -0.21161780956462992])
      this.addMarker(-78.49687202383572, -0.21161780956462992,map)
    }
    else {
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v9',
        center: [this.ruta[0].log, this.ruta[0].lat],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map'
      });
      this.drawMap(this.ruta[0].lat,this.ruta[0].log,map)

      for (let i = 1 ; i < this.ruta.length; i++){
        this.addMarker(this.ruta[i].lat,this.ruta[i].log,map)
      }
    }
  }

  drawMap(lat:number,lng:number, map:any){
  // drawMap(lat: number, lng: number) {
    // mapboxgl.accessToken = 'pk.eyJ1IjoiZXZpbHNtb29uIiwiYSI6ImNrd2w4YWllMzF6bHcydm5za2l1dnZqOWwifQ.bQ82x317PQ3LE3kW6TmUIQ';

    // const map = new mapboxgl.Map({
    //   style: 'mapbox://styles/mapbox/streets-v12',
    //   center: [lng, lat],
    //   zoom: 15.5,
    //   pitch: 45,
    //   bearing: -17.6,
    //   container: 'map'
    // });

    map.on('load', () => {

      map.resize();

      // Marker
      // new mapboxgl.Marker()
      //   .setLngLat([lng, lat])
      //   .addTo(map);



      // Insert the layer beneath any symbol layer.
      // const layers = map.getStyle().layers;

      // let labelLayerId;
      // for (let i = 0; i < layers.length; i++) {
      //   if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      //     labelLayerId = layers[i].id;
      //     break;
      //   }
      // }
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [
                -78.488151,
                -0.175536
              ],
              [
                -78.48813,
                -0.175521
              ],
              [
                -78.488073,
                -0.17551
              ],
              [
                -78.488074,
                -0.175615
              ],
              [
                -78.488239,
                -0.175683
              ],
              [
                -78.489182,
                -0.180056
              ],
              [
                -78.489856,
                -0.182274
              ],
              [
                -78.489585,
                -0.182928
              ],
              [
                -78.488939,
                -0.184436
              ],
              [
                -78.488639,
                -0.185144
              ],
              [
                -78.488626,
                -0.185176
              ],
              [
                -78.488655,
                -0.185188
              ],
              [
                -78.487811,
                -0.187087
              ],
              [
                -78.487729,
                -0.187112
              ],
              [
                -78.487722,
                -0.187217
              ],
              [
                -78.487517,
                -0.187596
              ],
              [
                -78.486274,
                -0.190472
              ],
              [
                -78.486028,
                -0.190659
              ],
              [
                -78.486033,
                -0.190695
              ],
              [
                -78.486042,
                -0.190727
              ],
              [
                -78.485929,
                -0.191094
              ],
              [
                -78.486038,
                -0.191146
              ]
            ]
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });

  }

  addMarker(lat:number,log:number,map:any){
    new mapboxgl.Marker()
      .setLngLat([lat,log])
      .addTo(map);
  }

}
