import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Position } from '../models/position.models';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private historial: Position[] = [];

  constructor(private native: NativeStorage) {
    this.getPositions();
    this.getRuta();
  }

  async getPositions() {
    this.historial = await this.native.getItem("historial") || [];
  }

  savePosition(lat: number, lon: number) {
    const nueva_position = new Position(lat, lon);
    this.historial.unshift(nueva_position);
    this.native.setItem("historial", this.historial);
  }

  async getRuta() {
    return (await this.native.getItem("ruta")) || [];
  }

  get Positions() {
    return [...this.historial];
  }
}