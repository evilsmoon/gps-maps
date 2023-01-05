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
  historial: Position[] = [];

  constructor( private geo:Geolocation, public geo_data:GpsService ) {
  }

ubicacion(){
    this.geo.getCurrentPosition().then( resp => {
      let lat = resp.coords.latitude; 
      let lon = resp.coords.longitude; 
      this.geo_data.savePosition(lat,lon);
      this.historial = this.geo_data.Positions;
    } )
  }

  ionViewWillEnter(){
    this.historial = this.geo_data.Positions;
  }
}
