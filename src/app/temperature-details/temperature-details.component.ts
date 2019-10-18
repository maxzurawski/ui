import { Component, OnInit } from '@angular/core';
import {CachedSensor} from "../model/CachedSensor";
import {TemperatureMeasurement} from "../model/TemperatureMeasurement";
import {MeasurementsSearch} from "../model/MeasurementsSearch";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getCachedSensors, getTempMeasurements, State} from "../store/reducers";
import * as DataActions from '../store/actions/index';
import * as moment from 'moment';

@Component({
  selector: 'app-temperature-details',
  templateUrl: './temperature-details.component.html',
  styleUrls: ['./temperature-details.component.css']
})
export class TemperatureDetailsComponent implements OnInit {

  temperatureSensor: CachedSensor;
  nameOfSensor: string;
  uuid:string;
  customSearch: boolean = false;
  measurements: TemperatureMeasurement[];
  search: MeasurementsSearch;

  model: FormGroup;

  data: any;
  options: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<State>,
              private fb: FormBuilder) {
    this.model = this.fb.group({
      reportedAtFrom: new FormControl(),
      reportedAtTo: new FormControl()
    });

    this.search = {} as MeasurementsSearch;
    this.uuid = route.snapshot.paramMap.get('uuid');
    this.store.dispatch(new DataActions.LoadSearchItemsAction({search: this.createSearchDtoForToday()}));

    this.store.select(getCachedSensors).subscribe( data => {
      data.forEach(item => {
        if(item.uuid === this.uuid) {
          this.temperatureSensor = item;
          this.nameOfSensor = this.temperatureSensor.name;
          return;
        }
      })
    });

    this.store.select(getTempMeasurements).subscribe(
      data => {
        console.log("constructor");

        if(data && data[this.uuid]) {
          this.measurements = data[this.uuid];
          let dataarray = [];
          let labels = [];
          let colors = [];
          this.measurements.forEach(item => {
            dataarray.push(item.value);
            labels.push(this.formatDate(item.reportedAt));
            colors.push(this.getColorForCrossedAcceptableValues(item))
          });
          console.log(dataarray);

          this.data = {
            legend: false,
            labels: labels,
            datasets: [
              {
                backgroundColor: colors,
                data: dataarray,
                fill: false
              }
            ]
          };

          this.options = {
            legend: {
              display: false
            },
            animation: false
          }
        }

      }
    )
  }

  formatDate(date): string{
    let timestamp = Date.parse(date);
    let realDate = new Date();
    realDate.setTime(timestamp);
    let t_str = realDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', second: '2-digit'});
    let d_str = realDate.toLocaleDateString(navigator.language, {year: 'numeric', month: '2-digit', day: '2-digit'})
    return d_str + " " + t_str;
  }

  onSubmit() {
    this.resetSearch();
    let reportedAtFrom = this.model.get("reportedAtFrom").value as Date;
    if(reportedAtFrom) {
      this.search.reportedAtFrom = reportedAtFrom;
    }

    let reportedAtTo = this.model.get('reportedAtTo').value as Date;
    if(reportedAtTo) {
      this.search.reportedAtTo = reportedAtTo;
    }

    this.store.dispatch(new DataActions.LoadSearchItemsAction({search: this.search}));
  }

  canSearchWithCriteria() {
    let reportedAtFrom = this.model.get("reportedAtFrom").value as Date;
    let reportedAtTo = this.model.get('reportedAtTo').value as Date;
    let isFilled = reportedAtFrom || reportedAtTo;
    return this.customSearch && !isFilled;
  }

  resetSearchForm() {
    this.model.reset();
  }

  getColorForCrossedAcceptableValues(measurement: TemperatureMeasurement): string {
    if(this.measurements && this.measurements.length > 0) {

      if(this.temperatureSensor.max && (measurement.value > +this.temperatureSensor.max)) {
        return 'red';
      }

      if(this.temperatureSensor.min && (measurement.value < +this.temperatureSensor.min)) {
        return 'red';
      }

    }
    return 'green'
  }

  onLastMonth() {
    this.resetSearch();
    let now = moment(new Date());
    let yesterdayStart = now.clone().add(-30, 'day');
    yesterdayStart = yesterdayStart.set('hour', 0);
    yesterdayStart = yesterdayStart.set('minute', 0);
    yesterdayStart = yesterdayStart.set('second', 0);

    let yesterdayEnd = now.clone().add(-1, 'day');
    yesterdayEnd = yesterdayEnd.set('hour', 23);
    yesterdayEnd = yesterdayEnd.set('minute', 59);
    yesterdayEnd = yesterdayEnd.set('second', 59);

    this.search.reportedAtFrom = yesterdayStart.toDate();
    this.search.reportedAtTo = yesterdayEnd.toDate();

    this.store.dispatch(new DataActions.LoadSearchItemsAction({search: this.search}));
  }

  onLastWeek() {
    this.resetSearch();
    let now = moment(new Date());
    let yesterdayStart = now.clone().add(-7, 'day');
    yesterdayStart = yesterdayStart.set('hour', 0);
    yesterdayStart = yesterdayStart.set('minute', 0);
    yesterdayStart = yesterdayStart.set('second', 0);

    let yesterdayEnd = now.clone().add(-1, 'day');
    yesterdayEnd = yesterdayEnd.set('hour', 23);
    yesterdayEnd = yesterdayEnd.set('minute', 59);
    yesterdayEnd = yesterdayEnd.set('second', 59);

    this.search.reportedAtFrom = yesterdayStart.toDate();
    this.search.reportedAtTo = yesterdayEnd.toDate();

    this.store.dispatch(new DataActions.LoadSearchItemsAction({search: this.search}));
  }

  onYesterday() {
    this.resetSearch();
    let now = moment(new Date());
    let yesterdayStart = now.clone().add(-1, 'day');
    yesterdayStart = yesterdayStart.set('hour', 0);
    yesterdayStart = yesterdayStart.set('minute', 0);
    yesterdayStart = yesterdayStart.set('second', 0);

    let yesterdayEnd = now.clone().add(-1, 'day');
    yesterdayEnd = yesterdayEnd.set('hour', 23);
    yesterdayEnd = yesterdayEnd.set('minute', 59);
    yesterdayEnd = yesterdayEnd.set('second', 59);

    this.search.reportedAtFrom = yesterdayStart.toDate();
    this.search.reportedAtTo = yesterdayEnd.toDate();

    this.store.dispatch(new DataActions.LoadSearchItemsAction({search: this.search}));
  }

  onToday() {
    this.store.dispatch(new DataActions.LoadSearchItemsAction({search: this.createSearchDtoForToday()}));
  }

  resetSearch() {
    this.search = {} as MeasurementsSearch;
    this.search.uuid = this.uuid;
  }
  createSearchDtoForToday(): MeasurementsSearch {
    this.resetSearch();
    let now = moment(new Date());
    now = now.set('hour', 0);
    now = now.set('minute', 0);
    now = now.set('second', 0);
    this.search.reportedAtFrom = now.toDate();
    return this.search;
  }

  ngOnInit() {
    this.search.uuid = this.uuid;
    this.search.reportedAtFrom = new Date();
    this.store.dispatch(new DataActions.LoadLastLimited({search: this.search}));
  }

  onBack() {
    this.store.dispatch(new DataActions.ResetFoundItemsAction());
    this.router.navigate(['/dashboard']);
  }

  // customSearchClicked() {
  //   if(this.customSearch) {
  //     // disable others
  //   } else {
  //     // enable others
  //   }
  // }

}
