import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrazadoPage } from './trazado.page';

const routes: Routes = [
  {
    path: '',
    component: TrazadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrazadoPageRoutingModule {}
