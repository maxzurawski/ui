import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SensorType} from "../model/SensorType";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SensorTypesService {

  static readonly API_SUFFIX: string = '/api/sensortypes';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<SensorType[]> {
    return this.httpClient.get<SensorType[]>(SensorTypesService.API_SUFFIX).pipe(
      catchError(err => {
        return EMPTY;
      }));
  }

  save(sensorType: SensorType): Observable<SensorType> {
    return this.httpClient.post<SensorType>(SensorTypesService.API_SUFFIX + '/new', sensorType);
  }

  update(sensorType: SensorType): Observable<SensorType> {
    return this.httpClient.put<SensorType>(SensorTypesService.API_SUFFIX + '/' + sensorType.id, sensorType);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(SensorTypesService.API_SUFFIX + '/' + id);
  }
}
