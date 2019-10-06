import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {compareByType, Sensor} from "../model/Sensor";
import {SensorsService} from "../service/sensors.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getAllSensors, getSensorsLoaded, getSensorTypesLoaded, State} from "../store/reducers";

import * as DataActions from '../store/actions/index';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.css']
})
export class SensorsListComponent implements OnInit {

  cols: any[];
  sensors$: Observable<Sensor[]> = this.store.select(getAllSensors);
  sensors: Sensor[];
  rowGroupMetadata: any;

  constructor(private service: SensorsService,
              private router: Router,
              private store: Store<State>) {

    this.cols = [
      { field: 'name', header: 'Name'},
      { field: 'uuid', header: 'Uuid'},
      { field: 'description', header: 'Description'}
    ];

    this.store.select(getSensorTypesLoaded).subscribe(
      typesLoaded => {
        if (!typesLoaded) {
          this.store.dispatch(new DataActions.LoadSensorTypesBegin());
        }
      }
    );
  }

  ngOnInit() {
    this.store.select(getSensorsLoaded).subscribe(
      sensorsLoaded => {
        if (!sensorsLoaded) {
          this.store.dispatch(new DataActions.LoadAllSensors());
        }
      }
    );

    this.sensors$.subscribe(
      data => {
        if (data) {
          this.sensors = data.sort(compareByType);
          this.updateRowGroupMetaData();
        }}
    );
  }

  selectedRow(sensor: Sensor) {
    this.router.navigate(['sensors/' + sensor.id]);
  }

  onCreateNew() {
    this.router.navigate(['sensors/new']);
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.sensors) {
      for (let i = 0; i < this.sensors.length; i++) {
        const rowData = this.sensors[i];
        const type = rowData.type;
        if (i === 0) {
          this.rowGroupMetadata[type] = { index: 0, size: 1};
        } else {
          const previousRowData = this.sensors[i - 1];
          const previousRowGroup = previousRowData.type;
          if (type === previousRowGroup) {
            this.rowGroupMetadata[type].size++;
          } else {
            this.rowGroupMetadata[type] = { index: i, size: 1};
          }
        }
      }
    }
  }

}
