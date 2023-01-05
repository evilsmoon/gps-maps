import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/models/position.models';
import { GpsService } from '../../services/gps.service';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { ActivatedRoute } from '@angular/router';

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
  map!: Leaflet.Map;


  constructor(private geo_data: GpsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let params = this.route.snapshot.queryParams;
    this.ruta = params["ruta"];
  }

  ionViewDidEnter(){
    this.leafletMap1();
  }

  ionViewWillLeave() {
    this.map.remove();
  }


  leafletMap1() {
    var myIcon = Leaflet.icon({
      iconUrl: '../../../assets/marker-icon.png',
      iconSize: [30, 30],
      iconAnchor: [22, 40],
      popupAnchor: [-3, -76],
    });

    this.map = Leaflet.map('map').setView([this.ruta[0].lat, this.ruta[0].log], 10);
    Leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // for (let i = 0;i<this.prueba.length;i++){
    //   Leaflet.marker([this.prueba[i][0], this.prueba[i][1]], {icon: myIcon}).addTo(this.map);
    //   if (i != 0){
    //     antPath([[this.prueba[i-1][0], this.prueba[i-1][1]], [this.prueba[i][0], this.prueba[i][1]]],
    //       { color: '#FF0000', weight: 5, opacity: 0.6 })
    //       .addTo(this.map);
    //   }
    // }
    for (let i = 0;i<this.ruta.length;i++){
      Leaflet.marker([this.ruta[i].lat, this.ruta[i].log], {icon: myIcon}).addTo(this.map);
      if (i != 0){
        antPath([[this.ruta[i-1].lat, this.ruta[i-1].log], [this.ruta[i].lat, this.ruta[i].log]],
          { color: '#FF0000', weight: 5, opacity: 0.6 })
          .addTo(this.map);
      }
    }
  }
}
