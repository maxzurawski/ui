import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AttributeDictionary} from "../model/AttributeDictionary";
import {getAllAttributes, getAttributesLoaded, State} from "../store/reducers";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

import * as DataActions from '../store/actions/index';

@Component({
  selector: 'app-attributes-dictionary-list',
  templateUrl: './attributes-dictionary-list.component.html',
  styleUrls: ['./attributes-dictionary-list.component.css']
})
export class AttributesDictionaryListComponent implements OnInit {

  cols: any[];
  attributes$: Observable<AttributeDictionary[]> = this.store.select(getAllAttributes);

  constructor(private store: Store<State>,
              private router: Router) {
    this.cols = [
      { field: 'symbol', header: 'Symbol'},
      { field: 'name', header: 'Name'},
      { field: 'description', header: 'Description'}
    ];
  }

  ngOnInit() {
    this.store.select(getAttributesLoaded)
      .subscribe(hasLoaded => {
        if (!hasLoaded) {
          this.store.dispatch(new DataActions.LoadAttributesBegin());
        }
      });
  }

  onRowClicked(rowData: AttributeDictionary) {
    this.router.navigate(['attributes/' + rowData.symbol]);
  }

}
