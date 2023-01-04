import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private dbInstance!: SQLiteObject;

  readonly db_name: string = "productos.db";
  readonly db_table: string = "productos";
  constructor(private platform: Platform,  private sqlite: SQLite,) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({
          name: this.db_name,
          location: 'default'
        }).then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                codigo INTEGER PRIMARY KEY,
                producto TEXT,
                stock INTEGER,
                precio REAL,
              )`, [])
            .then((res) => {
              alert(JSON.stringify(res));
            })
            .catch((error) => alert("SQLLITE: "+JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });   
}
}
