import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {SensorType} from "../model/SensorType";
import {getAllSensorTypes, getSensorTypesLoaded, State} from "../store/reducers";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

import * as DataActions from '../store/actions/index';

@Component({
  selector: 'app-sensortypes-list',
  templateUrl: './sensortypes-list.component.html',
  styleUrls: ['./sensortypes-list.component.css']
})
export class SensortypesListComponent implements OnInit {

  cols: any[];
  sensorTypes$: Observable<SensorType[]> = this.store.select(getAllSensorTypes);

  constructor(private router: Router,
              private store: Store<State>) {

    this.cols = [
      { field: 'type', header: 'Type' },
      { field: 'name', header: 'Name' },
      { field: 'topic', header: 'Topic' }
    ];
  }

  ngOnInit() {
    this.store.select(getSensorTypesLoaded)
      .subscribe( hasLoaded => {
        if (!hasLoaded) {
          this.store.dispatch(new DataActions.LoadSensorTypesBegin());
        }
      });
  }

  onCreateNew() {
    this.router.navigate(['types/new']);
  }

  onRowSelected(rowData: SensorType) {
    this.router.navigate(['types/' + rowData.id]);
  }

}
