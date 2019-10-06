import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttributeDictionary} from '../model/AttributeDictionary';
import {Store} from '@ngrx/store';
import {
  getAllAttributes,
  getAttributesDialogMode,
  getAttributesDialogOpened,
  getSensorAttribute,
  getSensorsAttributes,
  State
} from '../store/reducers';

import * as fromActions from '../store/actions/index';
import {SensorAttribute} from '../model/SensorAttribute';
import {ComponentsMode} from '../crosscutting/componentsMode';
import {InputType} from '../model/InputType';

@Component({
  selector: 'app-sensor-detail-attribute-dialog',
  templateUrl: './sensor-detail-attribute-dialog.component.html',
  styleUrls: ['./sensor-detail-attribute-dialog.component.css'],
})

export class SensorDetailAttributeDialogComponent implements OnInit {

  model: FormGroup;
  attributesLeft: AttributeDictionary[];
  sensorsAttributes: SensorAttribute[];
  mode: ComponentsMode;
  sensorAttribute: SensorAttribute;
  dropdownDisabled = false;


  constructor(private fb: FormBuilder,
              private store: Store<State>) {
    this.model = this.fb.group({
      attribute: new FormControl(),
      value: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.store.select(getAttributesDialogOpened).subscribe(
      isOpened => {
        if (isOpened === true) {
          this.initializeDialog();
        }
      }
    );
  }

  private initializeDialog() {

    this.store.select(getAttributesDialogMode).subscribe(
      mode => {
        this.mode = mode;
        this.dropdownDisabled = this.mode === ComponentsMode.Edit;
      }
    );

    this.store.select(getSensorAttribute).subscribe(
      sensorAttribute => this.sensorAttribute = sensorAttribute
    );

    this.store.select(getSensorsAttributes).subscribe(
      sensorAttributes => {
        this.sensorsAttributes = sensorAttributes;
      }
    );

    this.store.select(getAllAttributes).subscribe(
      attributes => {
        this.recalculateAttributesLeft(attributes);
      }
    );
  }

  onSubmitNewAttribute() {
    const sensorToUpdate: SensorAttribute = {
      value: this.model.get('value').value,
      symbol: this.model.get('attribute').value.symbol,
      sensor_id: this.mode === ComponentsMode.Edit ? this.sensorAttribute.sensor_id : null,
      id: this.mode === ComponentsMode.Edit ? this.sensorAttribute.id : null,
      version: this.mode === ComponentsMode.Edit ? this.sensorAttribute.version : null
    };
    this.store.dispatch(new fromActions.UpdateSensorAttribute({sensorAttribute: sensorToUpdate}));
    this.model.reset();
    this.store.dispatch(new fromActions.CloseDialog());
  }

  onCancelNewAttribute() {
    this.model.reset();
    this.store.dispatch(new fromActions.CloseDialog());
  }

  private recalculateAttributesLeft(allAttributes: AttributeDictionary[]) {
    this.attributesLeft = allAttributes;
    if (this.mode === ComponentsMode.New) {
      this.sensorsAttributes.forEach(item => {
        this.attributesLeft = this.attributesLeft.filter(obj => obj.symbol !== item.symbol);
      });
    }
    if (this.mode === ComponentsMode.Edit) {
      const attributesFiltered = this.attributesLeft.filter(obj => obj.symbol === this.sensorAttribute.symbol);
      if (attributesFiltered.length === 1) {
        this.model.get('attribute').patchValue(attributesFiltered[0]);
        this.model.get('value').patchValue(this.sensorAttribute.value);
      }
    }
  }

  onModelChanged() {
  }

  getInputtype(): InputType {
    const attribute = this.model.get('attribute').value as AttributeDictionary;
    if (!attribute) {
      return null;
    }
    return attribute.inputtype;
  }
}
