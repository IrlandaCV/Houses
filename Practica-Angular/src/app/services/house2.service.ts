import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { House } from '../models/house';
import { microservices } from './global';

@Injectable()
export class HouseService2 {
  public url2: string;

  constructor(private _http: HttpClient) {
    this.url2 = microservices.service2;
  }

  //GUARDAR
  saveHouse2(house: House): Observable<any> {
    const params = JSON.stringify(house);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url2 + 'save-house2', params, { headers });
  }

  //Listarlos
  getHouses2(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url2 + 'getAlls', { headers: headers });
  }

  //BUSCAR POR ID
  getHouse2(houseId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url2 + 'findHouse/' + houseId, {
      headers: headers,
    });
  }

  //BORRAR POR ID
  deleteHouse2(houseId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url2 + 'delete-house/' + houseId, {
      headers: headers,
    });
  }

  //ACTUALIZAR
  updateHouse2(house: House): Observable<any> {
    const body = JSON.stringify(house);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url2 + 'update-house2/' + house.houseId, body, {
      headers: headers,
    });
  }
}
