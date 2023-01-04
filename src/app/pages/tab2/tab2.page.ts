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
        if (!barcodeData.cancelled) {
          let producto = JSON.parse(barcodeData.text);

          this.dataLocal.getProducto(producto.codigo).then((resp) => {
            console.log(resp['codigo']);
            if (resp['codigo'] != null) {
              this.dataLocal.updateProducto(producto.codigo,
                producto.producto,
                producto.stock,
                producto.precio);
            } else {
              this.dataLocal.guardarProducto(
                producto.codigo,
                producto.producto,
                producto.stock,
                producto.precio
              );
            }
          });      
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
