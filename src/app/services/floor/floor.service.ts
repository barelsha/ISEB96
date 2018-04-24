import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FloorService {
  configUrl = '../../../assets/config.json';
  constructor(private http: HttpClient) { }
  getFloor() {
    return this.http.get(this.configUrl);
  }

  
}
