import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {RegisterAttributesService} from '../../service/register-attributes.service';

import * as DataActions from '../actions/index';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AttributeDictionary} from '../../model/AttributeDictionary';
import {UpdateAttribute} from '../actions/index';
import {of} from 'rxjs';

@Injectable()
export class AttributesEffects {

  constructor(private action: Actions,
              private service: RegisterAttributesService) {

  }

  @Effect()
  loadData = this.action.pipe(
    ofType(DataActions.AttributeDictionaryActions.LoadAttributesBegin),
    switchMap(() => {
      return this.service.getAll().pipe(
        map( data => new DataActions.LoadAttributesSuccessful({data}))
      );
    })
  );

  @Effect()
  updateData = this.action.pipe(
    ofType<UpdateAttribute>(DataActions.AttributeDictionaryActions.UpdateAttribute),
    switchMap( ({payload}) => {
      const result = payload.data as AttributeDictionary;
      return this.service.update(result.symbol, result).pipe(
        map( data => {
          console.log(data);
          return new DataActions.UpdateAttributeSuccessful({data});
        }),
        catchError( error => of(new DataActions.UpdateAttributeFailed({error})))
      );
    })
  );
}
