import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventsloggerService} from "../service/eventslogger.service";
import {EventsSearch} from "../model/EventSearch";
import {Event} from "../model/Event";

@Component({
  selector: 'app-eventslogger',
  templateUrl: './eventslogger.component.html',
  styleUrls: ['./eventslogger.component.css']
})
export class EventsloggerComponent implements OnInit {

  cols: any[];
  events: Event[];
  searchModel: FormGroup;

  constructor(private service: EventsloggerService,
              private fb: FormBuilder) {

    this.searchModel = this.fb.group({
      processId: new FormControl('',
        Validators.pattern('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')),
      topic: new FormControl(''),
      routingKey: new FormControl(''),
      sensorsUuid: new FormControl('',
        Validators.pattern('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')),
      logMsg: new FormControl(''),
      errorMsg: new FormControl(''),
      service: new FormControl(''),
      publishedOnFrom: new FormControl(''),
      publishedOnTo: new FormControl('')
    });
  }

  ngOnInit() {
    const initialSearch = {
      topic: 'xdevices.logs',
      service: 'register'
    } as EventsSearch;

    this.service.getEvents(initialSearch).subscribe(
      data => {
        this.events = data;
      }
    );

    this.cols = [
      { field: 'publishedOn', header: 'Published on', styleclass: 'wide'},
      { field: 'service', header: 'Service', styleclass: 'slim'},
      { field: 'topic', header: 'Topic', styleclass: 'topic'},
      { field: 'routingKey', header: 'Routing key'},
      { field: 'processId', header: "ProcessId"}
    ]
  }

  onReset() {
    this.searchModel.reset();
  }

  onSearch() {
    let eventsSearch = this.searchModel.value as EventsSearch;
    this.service.getEvents(eventsSearch).subscribe(
      data => {
        this.events = data;
      }
    );
  }

  getBackgroundColor(value: string): string {
    let errorLog = value.includes('error') || value.includes('failure');
    if (errorLog) {
      return 'orangered'
    }
    return '';
  }

  getTextColor(value: string): string {
    let errorLog = value.includes('error') || value.includes('failure');
    if (errorLog) {
      return 'white'
    }
    return 'black';
  }

  getFormattedValue(field, value): string{
    if(field === 'publishedOn' || field === null) {
      return new Date(value).toUTCString()
    }
    return value;
  }

}
