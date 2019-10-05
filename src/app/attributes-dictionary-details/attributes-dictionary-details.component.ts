import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getSingleAttribute, State} from "../store/reducers";
import {AttributeDictionary} from "../model/AttributeDictionary";

import * as fromActions from '../store/actions';

@Component({
  selector: 'app-attributes-dictionary-details',
  templateUrl: './attributes-dictionary-details.component.html',
  styleUrls: ['./attributes-dictionary-details.component.css']
})
export class AttributesDictionaryDetailsComponent implements OnInit {

  model: FormGroup;
  headerTitle: string;
  submitButtonLabel: string;

  mode: string;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private store: Store<State>) {
    this.model = this.fb.group({
      name: new FormControl('', Validators.required),
      symbol: new FormControl('', Validators.required),
      description: new FormControl()
    });
  }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('symbol');
    this.initLabels();

    if (this.mode === 'new') {
      this.model.reset();
    } else {
      this.store.select(getSingleAttribute, {symbol: this.mode}).subscribe(
        data => {
          this.model.patchValue(data);
        }
      );
    }
  }

  private initLabels() {
    if (this.mode === 'new') {
      this.headerTitle = 'New attribute definition';
      this.submitButtonLabel = 'Save';
    } else {
      this.headerTitle = 'Editing attribute ' + this.mode;
      this.submitButtonLabel = 'Update';
    }
  }

  onBack() {
    this.router.navigate(['attributes/']);
  }

  onSubmit() {
    const data = this.model.value as AttributeDictionary;
    this.store.dispatch(new fromActions.UpdateAttribute({data}));
  }

  isEditAndCreationDisabled(): boolean {
    return true;
  }

}
