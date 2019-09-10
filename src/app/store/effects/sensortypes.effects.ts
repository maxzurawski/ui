import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SensorTypesService} from '../../service/sensor-types.service';

import * as DataActions from '../actions/index';
import {
  DeleteSensorType,
  LoadSensorTypesSuccessful, SaveSensorType,
  UpdateSensorType,
} from '../actions/index';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SensorType} from '../../model/SensorType';

@Injectable()
export class SensortypesEffects {

  constructor(private action: Actions,
              private service: SensorTypesService) {
  }

  @Effect()
  loadSensorTypes = this.action.pipe(
    ofType<LoadSensorTypesSuccessful>(DataActions.SensorTypesActions.LoadSensorTypesBegin),
    switchMap( ({}) => {
      return this.service.getAll().pipe(
        map( data => new DataActions.LoadSensorTypesSuccessful({sensortypes: data})),
        catchError( error => of(new DataActions.LoadSensorTypesFailure({error})))
      );
    })
  );

  @Effect()
  updateSensorType = this.action.pipe(
    ofType<UpdateSensorType>(DataActions.SensorTypesActions.UpdateSensorType),
    switchMap( ({payload}) => {
      const sensorType = payload.sensorType as SensorType;
      return this.service.update(sensorType).pipe(
        map(data => {
          return new DataActions.UpdateSensorTypeSuccessful({sensortype: data});
        }),
        catchError(error => of(new DataActions.UpdateSensorTypeFailure({error})))
      );
    })
  );

  @Effect()
  deleteSensorType = this.action.pipe(
    ofType<DeleteSensorType>(DataActions.SensorTypesActions.DeleteSensorType),
    switchMap(({payload}) => {
      const id = payload.id;
      return this.service.delete(id).pipe(
        map( result => {
          if (result) {
            return new DataActions.DeleteSensorTypeSuccessful({id});
          }
          return new DataActions.DeleteSensorTypeFailure({error: 'Could not delete sensortype with id: ' + id});
        }),
        catchError(error => {
          return of(new DataActions.DeleteSensorTypeFailure({error}));
        })
      );
    })
  );

  @Effect()
  saveSensorType = this.action.pipe(
    ofType<SaveSensorType>(DataActions.SensorTypesActions.SaveSensorType),
    switchMap(({payload}) => {
      const sensorType = payload.sensorType as SensorType;
      return this.service.save(sensorType).pipe(
        map( (result) => {
          return new DataActions.SaveSensorTypeSuccessful({sensorType: result});
        }),
        catchError(error => {
          return of(new DataActions.SaveSensorTypeFailure({error}));
        })
      );
    })
  );

}
