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
  // lat!:number;
  // lon!:number;

  constructor( private geo:Geolocation, private geo_data:GpsService ) {
    // Current
    // save possition 
    // this.geo_data.getLines('-78.488217%2C-0.175448%3B-78.486054%2C-0.191163');
  }

ubicacion(){
    this.geo.getCurrentPosition().then( resp => {
      let lat = resp.coords.latitude; 
      let lon = resp.coords.longitude; 
      this.geo_data.savePosition(lat,lon);
    } )
  }

  ionViewWillEnter(){
    this.historial = this.geo_data.Positions;
  }
}
