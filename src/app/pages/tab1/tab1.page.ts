import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GpsService } from 'src/app/services/gps.service';
import { Position } from '../../models/position.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  historial!: Position[];
  // lat!:number;
  // lon!:number;

  constructor( private geo:Geolocation, private geo_data:GpsService ) {}

  // ubicacion(){
  //   this.geo.getCurrentPosition().then( resp => {
  //     console.log(resp.coords.latitude);
  //     console.log(resp.coords.longitude);
  //     this.lat = resp.coords.latitude; 
  //     this.lon = resp.coords.longitude; 
  //     this.geo_data.savePosition(this.lat,this.lon);

  //     this.historial = this.geo_data.Positions || [];
  //   } )
  // }

  ionViewWillEnter(){
    this.historial = this.geo_data.Positions || [];
  }
}
