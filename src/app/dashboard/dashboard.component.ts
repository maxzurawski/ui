import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {CachedSensor} from "../model/CachedSensor";
import {ServicesResolverService} from "../service/services-resolver.service";
import {WebSocketService} from "../service/web-socket.service";
import {TemperatureService} from "../service/temperature.service";
import {Store} from "@ngrx/store";
import {getCachedSensors, getLoaded, State} from "../store/reducers";
import {RefreshStateEvent} from "../model/RefreshStateEvent";
import {MeasurementsSearch} from "../model/MeasurementsSearch";
import * as DataActions from '../store/actions/index';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerUrl: string;
  messageFromServer: string;
  wsSubscription: Subscription;
  sensors: CachedSensor[];

  constructor(private servicesResolver: ServicesResolverService,
              private webSocketService: WebSocketService,
              private temperatureService: TemperatureService,
              private store: Store<State>) {
    this.store.select(getLoaded).subscribe(data => {
      if(!data) {
        this.store.dispatch(new DataActions.LoadCachedSensors());
      }
    });

    this.store.select(getCachedSensors).subscribe( data => {
      this.sensors = data;
    });

    // NOTE: init data from the past (last 10)
    this.fireLoadTemperatureMeasurements();


    this.servicesResolver.getAppMetadata("temperaturearchive").subscribe(
      data => {
        this.registerUrl = environment.host + ":" + data.port;

        this.wsSubscription = this.webSocketService.createObservableSocket('ws://' + this.registerUrl + '/ws')
          .subscribe(
            data => {
              let receivedStateRefreshEvent = JSON.parse(data) as RefreshStateEvent;
              this.messageFromServer = receivedStateRefreshEvent.source + ' at ' + new Date().toUTCString();
              // NOTE: update temperature
              this.fireLoadTemperatureMeasurements();
              this.webSocketService.sendEventToServer(false);
            },
            error1 => console.log('err' + error1),
            () => console.log('The observable stream is complete')
          )
      }
    )
  }

  fireLoadTemperatureMeasurements() {
    let search = {} as MeasurementsSearch;
    search.lastLimited = 5;
    console.log('firing' + search.lastLimited);
    this.store.dispatch(new DataActions.LoadLastLimited({search}));
    this.store.dispatch(new DataActions.LoadCachedSensors());
  }

  ngOnInit() {
    this.servicesResolver.getAppMetadata("temperaturearchive").subscribe(
      data => {
        this.registerUrl = data.ip + ":" + data.port;
      }
    );
  }

  closeSocket() {
    this.wsSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.closeSocket();
  }
}
