import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrazadoPageRoutingModule } from './trazado-routing.module';

import { TrazadoPage } from './trazado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrazadoPageRoutingModule
  ],
  declarations: [TrazadoPage]
})
export class TrazadoPageModule {}
