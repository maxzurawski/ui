import {Component, Input, OnInit} from '@angular/core';
import {CachedSensor} from "../model/CachedSensor";
import {TemperatureMeasurement} from "../model/TemperatureMeasurement";
import {Store} from "@ngrx/store";
import {getLastFoundTemperatureMeasurementsByUuid, getTemperatureMeasurementsLoaded, State} from "../store/reducers";
import {Router} from "@angular/router";
import {MeasurementsSearch} from "../model/MeasurementsSearch";
import * as DataActions from '../store/actions/index';


@Component({
  selector: 'app-temperature-sensor',
  templateUrl: './temperature-sensor.component.html',
  styleUrls: ['./temperature-sensor.component.css']
})
export class TemperatureSensorComponent implements OnInit {

  @Input()
  temperatureSensor: CachedSensor;
  data: any;
  options: any;
  measurements: TemperatureMeasurement[];

  constructor(private store: Store<State>,
              private router: Router) {
    let search = {} as MeasurementsSearch;
    search.lastLimited = 5;
    if(!this.store.select(getTemperatureMeasurementsLoaded)) {
      this.store.dispatch(new DataActions.LoadLastLimited({search}))
    }
  }

  getDate(): string {
    if(this.measurements && this.measurements.length > 0) {
      let timestamp = Date.parse(this.measurements[0].reportedAt.toString());
      let realDate = new Date();
      realDate.setTime(timestamp);
      return realDate.toLocaleDateString(navigator.language, {month: '2-digit', day: '2-digit', year: 'numeric'});
    }


  }

  formatDate(date): string{
    let timestamp = Date.parse(date);
    let realDate = new Date();
    realDate.setTime(timestamp);
    return realDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', second: '2-digit'});
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

  toDetails(uuid: string) {
    this.router.navigate(['/temperature-details/' + uuid]);
  }

  ngOnInit() {
    if(this.temperatureSensor) {

      this.store.select(getTemperatureMeasurementsLoaded).subscribe(data => {
        if(data) {
          this.store.select(getLastFoundTemperatureMeasurementsByUuid, {uuid: this.temperatureSensor.uuid}).subscribe(
            data => {
              this.measurements = data;

              let dataarray = [];
              let labels = [];
              let colors = [];
              this.measurements.forEach(item => {
                dataarray.push(item.value);
                labels.push(this.formatDate(item.reportedAt));
                colors.push(this.getColorForCrossedAcceptableValues(item))
              });

              this.data = {
                legend: false,
                labels: labels,
                datasets: [
                  {
                    backgroundColor: colors,
                    data: dataarray
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
          )
        }
      });
    }
  }

}
