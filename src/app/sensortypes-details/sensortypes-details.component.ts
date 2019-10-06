import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getAmountOfSensorsWhichUseSensorType, getSensorsLoaded, getSingleSensorType, State} from "../store/reducers";

import * as DataActions from '../store/actions/index';
import {SensorType} from "../model/SensorType";

@Component({
  selector: 'app-sensortypes-details',
  templateUrl: './sensortypes-details.component.html',
  styleUrls: ['./sensortypes-details.component.css']
})
export class SensortypesDetailsComponent implements OnInit {

  headerTitle: string;
  model: FormGroup;
  submitButtonLabel: string;
  mode: string;
  displayDeleteDialog = false;
  readOnlyType: boolean;

  displayCannotDeleteDialog = false;
  amountOfUsingSensors: string;
  readOnlyToolTip: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<State>) {
    const id = this.route.snapshot.paramMap.get('id');
    this.mode = id;

    this.model = this.fb.group(
      {
        id: new FormControl(''),
        version: new FormControl(''),
        name: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        topic: new FormControl('', Validators.required),
        description: new FormControl()
      }
    );
  }

  ngOnInit() {
    if (this.mode !== 'new') {
      this.store.select(getSingleSensorType, {id: parseInt(this.mode, 10)}).subscribe(
        data => {
          if (!data || data.id === undefined || data.id === null) {
            return
          }
          this.model.patchValue(data);
          this.headerTitle = 'Editing ' + data.name + '';
          this.submitButtonLabel = 'Update';

          // NOTE: check if sensors are loaded if not, load them to store
          // prevents deleting of type, in case sensors where not loaded before clicking sensors types menu item.
          this.store.select(getSensorsLoaded).subscribe(
            sensorsLoaded => {
              if (!sensorsLoaded) {
                this.store.dispatch(new DataActions.LoadAllSensors());
              }
            }
          );

          // NOTE: check if sensortype is used by any of registered sensors.
          this.store.select(getAmountOfSensorsWhichUseSensorType, {sensortype: data.type}).subscribe(
            amount => {
              this.readOnlyType = true;
              if (amount === undefined || amount === null || amount === 0 ) {
                this.readOnlyType = false;
                this.readOnlyToolTip = null;
              } else if (amount > 1) {
                this.amountOfUsingSensors = `${amount} sensors`;
              } else if (amount === 1) {
                this.amountOfUsingSensors = `${amount} sensor`;
              }
              if (this.readOnlyType) {
                this.readOnlyToolTip =
                  `Cannot edit type of this sensor type, because this sensor type is already used by ${this.amountOfUsingSensors}`;
              }
            }
          );
        }
      );
    } else {
      this.submitButtonLabel = 'Save';
      this.headerTitle = 'Adding new SensorType';
    }
  }

  navigateToTypeList() {
    this.router.navigate(['/types']);
  }

  onSubmit() {
    const sensorType = this.model.value as SensorType;
    if (this.mode !== 'new') {
      this.store.dispatch(new DataActions.UpdateSensorType({sensorType}));
    } else {
      sensorType.id = null;
      sensorType.version = null;
      this.store.dispatch(new DataActions.SaveSensorType({sensorType}));
      this.router.navigate(['/types']);
    }
  }

  onDelete() {
    this.store.dispatch(new DataActions.DeleteSensorType({id: parseInt(this.mode, 10)}));
    this.displayDeleteDialog = false;
    this.router.navigate(['/types']);
  }

  showDialog() {
    if (this.amountOfUsingSensors === undefined || this.amountOfUsingSensors === null) {
      this.displayDeleteDialog = true;
    } else {
      this.displayCannotDeleteDialog = true;
    }
  }

  hideDeleteButton() {
    return this.mode === 'new';
  }
}
