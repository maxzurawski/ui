import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TemperatureMeasurement} from "../model/TemperatureMeasurement";
import {MeasurementsSearch} from "../model/MeasurementsSearch";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private readonly API_SUFFIX: string  = '/api/temperaturearchive/';

  constructor(private httpClient: HttpClient) { }

  public findLastLimited(search: MeasurementsSearch): Observable<Map<string,TemperatureMeasurement[]>> {
    let params = new HttpParams();
    if(search) {
      if(!search.lastLimited) {
        search.lastLimited = 10
      }
      params = params.set('lastLimited', search.lastLimited.toString());
      params = params.set('orderDesc', 'true');
    }
    return this.httpClient.get<Map<string, TemperatureMeasurement[]>>(this.API_SUFFIX, {params: params});
  }

  public findItemsBySearchDto(search: MeasurementsSearch): Observable<Map<string, TemperatureMeasurement[]>> {
    let params = new HttpParams();
    if(search) {
      if(search.lastLimited) {
        params = params.set('lastLimited', search.lastLimited.toString());
      }

      if(search.uuid) {
        params = params.set('uuid', search.uuid);
      }

      if(search.reportedAtFrom) {
        params = params.set('reportedAtFrom', search.reportedAtFrom.toISOString());
      }

      if(search.reportedAtTo) {
        params = params.set('reportedAtTo', search.reportedAtTo.toISOString());
      }

      if(search.processId) {
        params = params.set('processId', search.processId);
      }

      if(search.valueFrom) {
        params = params.set('valueFrom', search.valueFrom.toString());
      }

      if(search.valueTo) {
        params = params.set('valueTo', search.valueTo.toString());
      }
    }

    return this.httpClient.get<Map<string, TemperatureMeasurement[]>>(this.API_SUFFIX, {params: params});
  }
}
