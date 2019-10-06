import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sensor} from '../model/Sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  private readonly API_SUFFIX: string  = '/api/register/sensors/';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Sensor[]> {
    return this.httpClient.get<Sensor[]>(this.API_SUFFIX);
  }

}
