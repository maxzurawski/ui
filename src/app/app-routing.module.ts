import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {SensortypesListComponent} from "./sensortypes-list/sensortypes-list.component";
import {SensortypesDetailsComponent} from "./sensortypes-details/sensortypes-details.component";

const routes: Routes = [
  { path:'', component: AboutComponent},
  { path: 'types', component: SensortypesListComponent},
  { path: 'types/:id', component: SensortypesDetailsComponent},
  { path:'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
