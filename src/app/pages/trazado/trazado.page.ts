import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Position } from 'src/app/models/position.models';
import { GpsService } from '../../services/gps.service';

@Component({
  selector: 'app-trazado',
  templateUrl: './trazado.page.html',
  styleUrls: ['./trazado.page.scss'],
})
export class TrazadoPage implements OnInit {
  fecha!: string;
  historial!: Position[];
  ruta:Position[] = [];

  constructor( private geo_data:GpsService, private navCrtl: NavController ) { 
  }

  ngOnInit() {
  }

  cambioFecha(){
    console.log(this.fecha);
    let fechaAux = new Date(this.fecha);
    this.ruta = [];
    this.filterPositions(fechaAux)
    console.log(this.ruta);

  }

  verMapa(){
    this.navCrtl.navigateForward("/app/trazado/mapa",{
      "queryParams":{
        "ruta":this.ruta
      }
    })
  }

  filterPositions(fecha: Date){
    this.historial.forEach( ele => {
      if ( ele.create.getDate() == fecha.getDate()){
        this.ruta.push(ele);
      }
    })
    this.sortArray()
  }

  sortArray(){
    this.ruta.sort(this.order);
  }

  order(a:Position,b:Position){
    return new Date(a.create).getTime() - new Date(b.create).getTime()
  }

  ionViewWillEnter(){
    this.historial = this.geo_data.Positions || [];
  }

}
