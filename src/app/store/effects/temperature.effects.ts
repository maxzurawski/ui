import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {TemperatureService} from "../../service/temperature.service";

import * as DataActions from "../actions/index";
import {catchError, map, switchMap} from "rxjs/operators";
import {MeasurementsSearch} from "../../model/MeasurementsSearch";
import {of} from "rxjs";

import {
  LoadLastLimited, LoadSearchItemsAction
} from '../actions/index';

@Injectable()
export class TemperatureEffects {

  constructor(private actions: Actions,
              private service: TemperatureService) {
  }

  @Effect()
  loadLimited = this.actions.pipe(
    ofType<LoadLastLimited>(DataActions.TemperatureSensorActions.LoadLastLimited),
    switchMap(({payload}) => {
      let search = payload.search as MeasurementsSearch;
      return this.service.findLastLimited(search).pipe(
        map(data => {
          return new DataActions.LoadLastLimitedSuccess({data});
        }),
        catchError(error => {
          return of(new DataActions.LoadLastLimitedFailure({error}));
        })
      )
    })
  );

  @Effect()
  loadDetailItems = this.actions.pipe(
    ofType<LoadSearchItemsAction>(DataActions.TemperatureSensorActions.LoadSearchItems),
    switchMap(({payload}) => {
      let search = payload.search as MeasurementsSearch;
      return this.service.findItemsBySearchDto(search).pipe(
        map(data => {
          return new DataActions.LoadSearchItemsSuccessAction({data});
        }),
        catchError(error => {
          return of(new DataActions.LoadSearchItemsFailureAction({error}));
        })
      )
    })
  );
}
