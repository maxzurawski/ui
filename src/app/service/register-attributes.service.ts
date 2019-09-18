import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AttributeDictionary} from "../model/AttributeDictionary";

@Injectable({
  providedIn: 'root'
})
export class RegisterAttributesService {

  static readonly API_SUFFIX: string = '/api/register/attributes/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<AttributeDictionary[]> {
    return this.httpClient.get<AttributeDictionary[]>(RegisterAttributesService.API_SUFFIX);
  }

  getBySymbol(symbol: string): Observable<AttributeDictionary> {
    return this.httpClient.get<AttributeDictionary>(RegisterAttributesService.API_SUFFIX + symbol);
  }

  update(symbol: string, attribute: AttributeDictionary): Observable<AttributeDictionary> {
    return this.httpClient.put<AttributeDictionary>(RegisterAttributesService.API_SUFFIX + symbol, attribute);
  }
}
