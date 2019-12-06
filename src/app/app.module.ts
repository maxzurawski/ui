import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelMenuComponent } from './panel-menu/panel-menu.component';
import { FooterComponent } from './footer/footer.component';
import {
  ButtonModule,
  DialogModule,
  InputTextareaModule,
  InputTextModule,
  MenuModule,
  DropdownModule,
  MessageModule,
  MessageService,
  PanelMenuModule,
  PanelModule,
  TooltipModule,
  InputSwitchModule,
  SpinnerModule,
  AccordionModule,
  CalendarModule,
  ChartModule,
  CardModule,
  ToggleButtonModule, MegaMenuModule, MenubarModule
} from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AboutComponent } from './about/about.component';
import { SensortypesListComponent } from './sensortypes-list/sensortypes-list.component';
import {TableModule} from "primeng/table";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducers} from "./store/reducers";
import {effects} from "./store/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SensortypesDetailsComponent } from './sensortypes-details/sensortypes-details.component';
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SensorTypesService} from "./service/sensor-types.service";
import {HttpErrorInterceptorServiceService} from "./interceptors/http-error-interceptor-service.service";
import { AttributesDictionaryListComponent } from './attributes-dictionary-list/attributes-dictionary-list.component';
import { AttributesDictionaryDetailsComponent } from './attributes-dictionary-details/attributes-dictionary-details.component';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';
import { SensorDetailAttributeDialogComponent } from './sensor-detail-attribute-dialog/sensor-detail-attribute-dialog.component';
import { EventsloggerComponent } from './eventslogger/eventslogger.component';
import { TemperatureSensorComponent } from './temperature-sensor/temperature-sensor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemperatureDetailsComponent } from './temperature-details/temperature-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelMenuComponent,
    FooterComponent,
    AboutComponent,
    SensortypesListComponent,
    SensortypesDetailsComponent,
    AttributesDictionaryListComponent,
    AttributesDictionaryDetailsComponent,
    SensorsListComponent,
    SensorDetailComponent,
    SensorDetailAttributeDialogComponent,
    EventsloggerComponent,
    TemperatureSensorComponent,
    DashboardComponent,
    TemperatureDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PanelMenuModule,
    MenuModule,
    BrowserAnimationsModule,
    PanelModule,
    TableModule,
    ButtonModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    DialogModule,
    ToastModule,
    MessageModule,
    TooltipModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DropdownModule,
    InputSwitchModule,
    SpinnerModule,
    AccordionModule,
    CalendarModule,
    ChartModule,
    CardModule,
    ToggleButtonModule,
    MegaMenuModule,
    MenubarModule
  ],
  providers: [MessageService,
    SensorTypesService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorServiceService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
