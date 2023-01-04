import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private dataLocal: DataLocalService, private barcodeScanner: BarcodeScanner,) {
    this.dataLocal.databaseConn();
  }
  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);

        if (!barcodeData.cancelled) {
          let producto = JSON.parse(barcodeData.text);

          this.dataLocal.guardarProducto(
            producto.codigo,
            producto.producto,
            producto.stock,
            producto.precio,
          );
        }
      })
      .catch((err) => {
        console.log('Error', err);

        this.dataLocal.guardarProducto(
          'XCBA2M83GFU3RHEX',
          'QUINOA',
          8,
          17.96,
      
        );
      });
  }
}
