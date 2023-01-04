import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Producto } from '../pages/models/productos.model';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  private dbInstance!: SQLiteObject;

  readonly db_name: string = 'productos.db';
  readonly db_table: string = 'productos';

  guardados: Producto[] = [];

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: this.db_name,
          location: 'default',
        })
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite
            .executeSql(
              `
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                codigo TEXT PRIMARY KEY,
                producto TEXT,
                stock INTEGER,
                precio REAL
              )`,
              []
            )
            .then((res) => {
              // alert(JSON.stringify(res));
            })
            .catch((error) => alert('SQLLITE: ' + JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }
  async guardarProducto(
    codigo: string,
    producto: string,
    stock: number,
    precio: number
  ) {
    const codigoP = this.getProducto(codigo);
    console.log(codigoP);

    if (codigoP != null) {
      this.updateProducto(codigo, producto, stock, precio);
      alert('Update');
    } else {
      this.dbInstance
        .executeSql(
          `
    INSERT INTO ${this.db_table} (codigo,producto,stock,precio) VALUES ('${codigo}', '${producto}',${stock},${precio})`,
          []
        )
        .then(
          () => {
            alert('Success');
            this.getAllProductos();
          },
          (e) => {
            alert('Error');
          }
        );
    }
  }

  getAllProductos() {
    try {
      this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then(
        (res) => {
          this.guardados = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              this.guardados.push(res.rows.item(i));
            }
          }
        },
        (e) => {}
      );
    } catch (error) {
      console.log(error);
    }
  }
  // Update
  updateProducto(
    codigo: string,
    producto: string,
    stock: number,
    precio: number
  ) {
    let data = [producto, stock, precio];


    return this.dbInstance.executeSql(
      `UPDATE ${this.db_table} SET producto = ?, stock = ?, precio = ? WHERE codigo = '${codigo}'`,
      data
    );
  }

  // Get user
  getProducto(codigo: string): Promise<any> {
    return this.dbInstance
      .executeSql(`SELECT * FROM ${this.db_table} WHERE codigo = '?'`, [codigo])
      .then((res) => {
        return {
          codigo: res.rows.item(0).codigo,
        };
      });
  }
  deleteProducto(codigo: string) {
    this.dbInstance
      .executeSql(
        `
        DELETE FROM ${this.db_table} WHERE codigo = '${codigo}'`,
        []
      )
      .then(() => {
        alert('User deleted!');
        this.getAllProductos();
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }
}
