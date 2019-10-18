import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppMetadata} from "../model/AppMetadata";

@Injectable({
  providedIn: 'root'
})
export class ServicesResolverService {

  private readonly API_SUFFIX: string  = '/api/servicesresolver/';

  constructor(private httpClient: HttpClient) { }

  public getAppMetadata(appName: string): Observable<AppMetadata> {
    return this.httpClient.get<AppMetadata>(this.API_SUFFIX + appName);
  }
}
