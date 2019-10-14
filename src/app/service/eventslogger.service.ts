import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EventsSearch} from "../model/EventSearch";
import {Observable} from "rxjs";
import {Event} from "../model/Event";

@Injectable({
  providedIn: 'root'
})
export class EventsloggerService {

  private readonly API_SUFFIX: string  = '/api/eventslogger/events/';

  constructor(private httpClient: HttpClient) { }

  public getEvents(search: EventsSearch): Observable<Event[]> {

    let params = new HttpParams();

    if(search) {
      if(search.topic) {
        params = params.set('topic', search.topic);
      }

      if(search.errorMsg) {
        params = params.set('errorMsg', search.errorMsg);
      }

      if(search.processId) {
        params = params.set('processId', search.processId);
      }

      if(search.routingKey) {
        params = params.set('routingKey', search.routingKey);
      }

      if(search.sensorsUuid) {
        params = params.set('sensorsUuid', search.sensorsUuid);
      }

      if(search.service) {
        params = params.set('service', search.service);
      }

      if(search.publishedOnFrom) {
        params = params.set('publishedOnFrom', search.publishedOnFrom.toISOString());
      }

      if(search.publishedOnTo) {
        params = params.set('publishedOnTo', search.publishedOnTo.toISOString());
      }
    }
    return this.httpClient.get<Event[]>(this.API_SUFFIX, {params: params});
  }
}
