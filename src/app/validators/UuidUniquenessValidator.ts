import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {getSensorDetailsMode, getSensorsLoaded, getUuids, State} from '../store/reducers';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';

import * as SensorActions from '../store/actions/sensors.actions';
import {ComponentsMode} from '../crosscutting/componentsMode';

@Injectable()
export class UuidUniquenessValidator {

  mode: ComponentsMode;

  constructor(private store: Store<State>) {
    this.store.select(getSensorsLoaded).subscribe(
      areSensorsLoaded => {
        if (!areSensorsLoaded) {
          this.store.dispatch(new SensorActions.LoadAllSensors());
        }
      }
    );

    this.store.select(getSensorDetailsMode).subscribe(
      mode => {
        this.mode = mode;
      }
    );
  }

  checkUuidUniqueness(field: AbstractControl): Observable<ValidationErrors | null> {
    // NOTE: in edit mode - never check uniqueness
    if (this.mode === ComponentsMode.Edit) {
      return of(null);
    }
    let validatorUuids: string[] = [];
    this.store.select(getUuids).subscribe(
      uuids => {
        validatorUuids = uuids;
      }
    );
    // tslint:disable-next-line:variable-name
    const number = validatorUuids.indexOf(field.value);
    console.log(number);
    return of(validatorUuids.indexOf(field.value) < 0 ? null : {invalid: 'Uuid already registered.'});
  }
}
