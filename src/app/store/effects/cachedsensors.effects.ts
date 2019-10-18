import {Injectable} from "@angular/core";
import {SensorsService} from "../../service/sensors.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as DataActions from "../actions/index";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class CachedsensorsEffects {

  constructor(private action: Actions,
              private service: SensorsService) {
  }

  @Effect()
  loadAll = this.action.pipe(
    ofType(DataActions.CachedSensorsActions.LoadCachedSensors),
    switchMap( () => {
      return this.service.getCacheSensors().pipe(
        map( (data) => {
          return new DataActions.LoadCachedSensorsSuccess({cachedSensors: data});
        }),
        catchError( error => {
          return of(new DataActions.LoadCachedSensorsFailure({error}));
        })
      );
    })
  );
}
