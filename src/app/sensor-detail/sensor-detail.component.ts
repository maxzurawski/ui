import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  getAllSensorTypes,
  getAttributesDialogOpened,
  getAttributesLoaded,
  getSensorAttributeAfterUpdate,
  getSensorTypesLoaded,
  getSingleSensor,
  State
} from '../store/reducers';
import {SensorType} from '../model/SensorType';

import * as DataActions from '../store/actions/index';
import {SensorAttribute} from '../model/SensorAttribute';
import {ComponentsMode} from '../crosscutting/componentsMode';
import {Sensor} from '../model/Sensor';
import {UuidUniquenessValidator} from '../validators/UuidUniquenessValidator';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css'],
  providers: [UuidUniquenessValidator]
})
export class SensorDetailComponent implements OnInit {
  headerTitle: string;
  mode: ComponentsMode;
  model: FormGroup;

  sensorTypes: SensorType[];
  disableUnmmutableControl = false;
  disabledUuidTooltip: string;
  disabledSensorTypeTooltip: string;

  // UI
  saveBtnLabel: string;
  attributeDialogVisible: boolean;
  attributeDialogTitle: string;

  // Delete Dialog
  displayDeleteDialog = false;
  sensorId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private store: Store<State>,
              private uuidUniquenessValidator: UuidUniquenessValidator) {

    this.model = this.fb.group({
      id: new FormControl(),
      version: new FormControl(),
      name: new FormControl('', Validators.required),
      uuid: new FormControl('',
        Validators.pattern('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'),
        uuidUniquenessValidator.checkUuidUniqueness.bind(uuidUniquenessValidator)), // sync validator must by as third parameter
      type: new FormControl('', Validators.required),
      sensorType: new FormControl('', Validators.required),
      description: new FormControl(),
      attributes: this.fb.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.mode = ComponentsMode.New;
    } else {
      this.mode = ComponentsMode.Edit;
      this.sensorId = parseInt(id, 10);
    }
    this.store.dispatch(new DataActions.UpdateDetailsMode({mode: this.mode}));
    this.disableUnmmutableControl = this.mode === ComponentsMode.Edit;

    this.initializeSensorTypes();
    this.initializeAttributes();
    this.startHandlingAddingAndUpdateOfAttributes();
    this.initHeaderTitle();
  }

  ngOnInit() {
    this.initGeneralModel();
  }

  private initHeaderTitle() {
    if (this.mode === ComponentsMode.New) {
      this.headerTitle = 'Definition of new Sensor';
      this.saveBtnLabel = 'Save';
    }
  }

  private initGeneralModel() {
    if (this.mode === ComponentsMode.Edit) {
      this.store.select(getSingleSensor, {id: this.sensorId}).subscribe(
        sensor => {
          if (!sensor) {
            return;
          }
          this.updateEditModel(sensor);
        });
    } else {
      this.updateNewModel();
    }
  }

  private updateNewModel() {
    this.updateTitleAndSubmitButtonLabel();
  }

  private updateEditModel(sensor: Sensor) {
    const sensorType = this.sensorTypes.find(obj => obj.type === sensor.type);
    if (sensorType) {
      sensor.sensorType = sensorType;
      sensor.type = sensorType.type;
    }
    if (sensor.attributes == null){
      sensor.attributes = [];
    }
    this.model.patchValue(sensor);
    this.clearAndFillAttributtes(sensor);
    this.updateTitleAndSubmitButtonLabel();
  }

  private clearAndFillAttributtes(sensor: Sensor) {
    const attributesModel = this.model.get('attributes') as FormArray;
    while (attributesModel.length) {
      attributesModel.removeAt(0);
    }
    if (sensor.attributes !== undefined && sensor.attributes != null && sensor.attributes.length > 0) {
      sensor.attributes.forEach( attribute => {
        attributesModel.push(this.fb.group(attribute));
      });
    }
  }

  private updateTitleAndSubmitButtonLabel() {
    let sensor: Sensor;
    if (ComponentsMode.New) {
      sensor = {} as Sensor;
      sensor.sensorType = this.model.get('sensorType').value as SensorType;
      sensor.type = sensor.sensorType.type;
    } else {
      sensor = this.model.value as Sensor;
    }
    this.headerTitle = this.mode === ComponentsMode.Edit ? 'Editing Sensor [' + sensor.name + ']' : 'New sensor';
    this.saveBtnLabel = this.mode === ComponentsMode.Edit ? 'Update' : 'Save';
    if (this.disableUnmmutableControl) {
      this.disabledUuidTooltip = 'Changing uuid of already registered sensor not allowed!';
      this.disabledSensorTypeTooltip = 'Changing sensor type of already registered sensor not allowed!';
    }
  }

  onSensorTypeChanged() {
    const sensorType = this.model.get('sensorType').value as SensorType;
    if (sensorType) {
      this.model.get('type').patchValue(sensorType.type);
    }
  }


  hideAttributesPanel(): boolean {
    const attributesModel = this.model.get('attributes') as FormArray;
    if (attributesModel.length === 1) {
      const firstElement = attributesModel.value[0];
      if (firstElement.symbol === '') {
        return true;
      }
    }
    return false;
  }

  isNewMode(): boolean {
    return this.mode === ComponentsMode.New;
  }

  onAddNewAttribute() {
    this.attributeDialogTitle = 'Adding new attribute';
    const attributesModel = this.model.get('attributes') as FormArray;
    const attributes = attributesModel.value as SensorAttribute[];
    this.store.dispatch(new DataActions.OpenDialogToAdd({sensorAttributes: attributes}));
    this.store.select(getAttributesDialogOpened).subscribe(
      isOpened => this.attributeDialogVisible = isOpened
    );
  }

  openUpdateAttributeDialog(sensorAttribute: SensorAttribute) {
    this.attributeDialogTitle = 'Updating attribute';
    const attributesModel = this.model.get('attributes') as FormArray;
    const attributes = attributesModel.value as SensorAttribute[];
    this.store.dispatch(new DataActions.OpenDialogToUpdate({sensorAttribute, sensorsAttributes: attributes}));
    this.store.select(getAttributesDialogOpened).subscribe(
      isOpened => this.attributeDialogVisible = isOpened
    );
  }

  backToSensors() {
    this.router.navigate(['sensors/']);
  }

  get attributesModel() {
    return this.model.get('attributes') as FormArray;
  }

  private addSensorAttributeToList(sensorAttribute: SensorAttribute) {
    const attributesModel = this.model.get('attributes') as FormArray;
    attributesModel.push(this.fb.group(sensorAttribute));
  }

  private updateSensorAttribute(sensorAttribute: SensorAttribute) {
    const attributesModel = this.model.get('attributes') as FormArray;
    const attributes = attributesModel.value as SensorAttribute[];

    attributes.forEach( item => {
      if (item.symbol === sensorAttribute.symbol) {
        item.value = sensorAttribute.value;
      }
    });
    attributesModel.patchValue(attributes);
  }

  onSubmit() {
    const sensor = this.model.value as Sensor;
    if (this.mode === ComponentsMode.New) {
      sensor.sensorType = this.model.get('sensorType').value as SensorType;
      sensor.type = sensor.sensorType.type;
      this.store.dispatch(new DataActions.SaveSensor({sensor}));
    } else {
      sensor.type = sensor.sensorType.type;
      this.store.dispatch(new DataActions.UpdateSensor({sensor}));
    }
  }

  removeAttributeFromList(symbol: string) {
    const attributesModel = this.model.get('attributes') as FormArray;
    let attributes = attributesModel.value;
    attributes = attributes.filter(obj => obj.symbol !== symbol);
    while (attributesModel.length) {
      attributesModel.removeAt(0);
    }
    attributes.forEach( attribute => {
      attributesModel.push(this.fb.group(attribute));
    });
  }

  onDelete() {
    this.store.dispatch(new DataActions.DeleteSensor({uuid: this.model.get('uuid').value}));
    this.router.navigate(['/sensors']);
    this.displayDeleteDialog = false;
  }

  private startHandlingAddingAndUpdateOfAttributes() {
    this.store.select(getSensorAttributeAfterUpdate).subscribe(
      data => {
        if (data.sensorAttributeToUpdate && data.attributeDialogMode === ComponentsMode.New) {
          this.addSensorAttributeToList(data.sensorAttributeToUpdate);
        }
        if (data.sensorAttributeToUpdate && data.attributeDialogMode === ComponentsMode.Edit) {
          this.updateSensorAttribute(data.sensorAttributeToUpdate);
        }
      }
    );
  }

  private initializeAttributes() {
    this.store.select(getAttributesLoaded).subscribe(
      attributesLoaded => {
        if (!attributesLoaded) {
          this.store.dispatch(new DataActions.LoadAttributesBegin());
        }
      }
    );
  }

  initializeSensorTypes() {
    this.store.select(getSensorTypesLoaded).subscribe(
      sensortypesLoaded => {
        if (!sensortypesLoaded) {
          this.store.dispatch(new DataActions.LoadSensorTypesBegin());
        }
      }
    );
    this.store.select(getAllSensorTypes).subscribe(sensortypes => {
      this.sensorTypes = sensortypes;
    });
  }
}
