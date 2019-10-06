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

}
