import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { House } from '../models/house';
import { microservices } from './global';

@Injectable()
export class HouseService {
  public url1: string;

  constructor(private _http: HttpClient) {
    this.url1 = microservices.service1;
  }

  testService() {
    return 'Probando el servicio';
  }

  //GUARDAR
  saveHouse(house: House): Observable<any> {
    const params = JSON.stringify(house);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url1 + 'save-house', params, {
      headers,
    });
  }

  getHouses(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url1 + 'get-houses', { headers: headers });
  }

  getHouse(houseId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url1 + 'getById/' + houseId, {
      headers: headers,
    });
  }

  deleteHouse(houseId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url1 + 'delete-house/' + houseId, {
      headers: headers,
    });
  }

  updateHouse(house: House): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(house);

    return this._http.put(this.url1 + 'update-house/' + house.houseId, body, {
      headers: headers,
    });
  }
}
