import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {SensortypesListComponent} from "./sensortypes-list/sensortypes-list.component";
import {SensortypesDetailsComponent} from "./sensortypes-details/sensortypes-details.component";
import {AttributesDictionaryListComponent} from "./attributes-dictionary-list/attributes-dictionary-list.component";
import {AttributesDictionaryDetailsComponent} from "./attributes-dictionary-details/attributes-dictionary-details.component";
import {SensorsListComponent} from "./sensors-list/sensors-list.component";
import {SensorDetailComponent} from "./sensor-detail/sensor-detail.component";

const routes: Routes = [
  { path:'', component: AboutComponent},
  { path: 'types', component: SensortypesListComponent},
  { path: 'types/:id', component: SensortypesDetailsComponent},
  { path: 'attributes', component: AttributesDictionaryListComponent},
  { path: 'attributes/:symbol', component: AttributesDictionaryDetailsComponent},
  { path: 'sensors', component: SensorsListComponent},
  { path: 'sensors/:id', component: SensorDetailComponent},
  { path:'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
