import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Position } from '../models/position.models';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private historial: Position[] = [];
  private ruta: Position[] = [];


  constructor(private native: NativeStorage, private http: HTTP, private httpClient: HttpClient) {
    this.getPositions();
  }

  async getPositions() {
    this.historial = await this.native.getItem("historial") || [];
  }

  savePosition(lat: number, lon: number) {
    const nueva_position = new Position(lat, lon);
    this.historial.unshift(nueva_position);
    this.native.setItem("historial", this.historial);
  }

  saveRuta(rut: Position[]) {
    this.ruta = rut;
    this.native.setItem("ruta", this.ruta);
    this.getRuta();
  }

  async getRuta() {
    this.ruta = await this.native.getItem("ruta") || [];
  }

  get Positions() {
    return [...this.historial];
  }

  get Ruta() {
    return [...this.ruta];
  }

  // getLines(coordinates: string) {
  //   return this.httpClient.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?alternatives=false&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=false&access_token=pk.eyJ1IjoiZXZpbHNtb29uIiwiYSI6ImNrd2w4YWllMzF6bHcydm5za2l1dnZqOWwifQ.bQ82x317PQ3LE3kW6TmUIQ`,).subscribe((resp) => {
  //     console.log(resp);

  //   })

  // }
}
