import {Actions, Effect, ofType} from '@ngrx/effects';
import {SensorsService} from '../../service/sensors.service';

import * as DataActions from '../actions/index';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class SensorsEffects {

  constructor(private action: Actions,
              private service: SensorsService) {

  }

  @Effect()
  loadAll = this.action.pipe(
    ofType(DataActions.SensorsActions.LoadAllSensors),
    switchMap( () => {
      return this.service.getAll().pipe(
        map( (data) => {
          return new DataActions.LoadAllSensorsSuccess({sensors: data});
        }),
        catchError( error => {
          return of(new DataActions.LoadAllSensorsFailure({error}));
        })
      );
    })
  );

  @Effect()
  loadSingle = this.action.pipe(
    ofType<DataActions.LoadSingleSensor>(DataActions.SensorsActions.LoadSingleSensor),
    switchMap(({payload}) => {
      const id = payload.id.toString();
      return this.service.getById(id).pipe(
        map((sensor) => {
          return new DataActions.LoadSingleSensorSuccess({sensor});
        }),
        catchError(error => {
          return of(new DataActions.LoadSingleSensorFailure({error}));
        })
      );
    })
  );

  @Effect()
  delete = this.action.pipe(
    ofType<DataActions.DeleteSensor>(DataActions.SensorsActions.DeleteSensor),
    switchMap(({payload}) => {
      const uuid = payload.uuid;
      return this.service.delete(uuid).pipe(
        map( () => {
          return new DataActions.DeleteSensorSuccess({uuid});
        }),
        catchError( error => {
          return of(new DataActions.DeleteSensorFailure({error}));
        })
      );
    })
  );

  @Effect()
  update = this.action.pipe(
    ofType<DataActions.UpdateSensor>(DataActions.SensorsActions.UpdateSensor),
    switchMap(({payload}) => {
      const sensorToUpdate = payload.sensor;
      return this.service.update(sensorToUpdate).pipe(
        map(result => {
          return new DataActions.UpdateSensorSuccess({sensor: result});
        }),
        catchError(error => {
          return of(new DataActions.UpdateSensorFailure({error}));
        })
      );
    })
  );

  @Effect()
  save = this.action.pipe(
    ofType<DataActions.SaveSensor>(DataActions.SensorsActions.SaveSensor),
    switchMap(({payload}) => {
      const sensorToSave = payload.sensor;
      return this.service.save(sensorToSave).pipe(
        map(result => {
          return new DataActions.SaveSensorSuccess({sensor: result});
        }),
        catchError(error => {
          return of(new DataActions.SaveSensorFailure({error}));
        })
      );
    })
  );

}
