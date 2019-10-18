import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sensor} from '../model/Sensor';
import {CachedSensor} from "../model/CachedSensor";

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  private readonly API_SUFFIX: string  = '/api/register/sensors/';
  private readonly API_CACHED_SENSORS_SUFFIX: string = '/api/register/cachesensors/';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Sensor[]> {
    return this.httpClient.get<Sensor[]>(this.API_SUFFIX);
  }

  public getById(id: string): Observable<Sensor> {
    return this.httpClient.get<Sensor>(this.API_SUFFIX + id);
  }

  public delete(uuid: string): Observable<Sensor> {
    return this.httpClient.delete<Sensor>(this.API_SUFFIX + uuid);
  }

  public update(sensor: Sensor): Observable<Sensor> {
    return this.httpClient.put<Sensor>(this.API_SUFFIX + sensor.uuid, sensor);
  }

  public save(sensor: Sensor): Observable<Sensor> {
    return this.httpClient.post<Sensor>(this.API_SUFFIX, sensor);
  }

  public getCacheSensors(): Observable<CachedSensor[]> {
    return this.httpClient.get<CachedSensor[]>(this.API_CACHED_SENSORS_SUFFIX);
  }

}
