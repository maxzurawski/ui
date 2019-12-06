import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PanelMenuComponent implements OnInit {

  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'General',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['dashboard'],
            command: (event) => this.styleConfig(event)},
          {label: 'About...', icon: 'pi pi-fw pi-info-circle', routerLink: ['about'],
            command: (event) => this.styleConfig(event)}
        ]
      },
      {
        label: 'Sensors',
        items: [
          {label: 'Sensors register', icon: 'pi pi-fw pi-list', routerLink: ['sensors'],
            routerLinkActiveOptions: {exact: true},
            command: (event) => this.styleConfig(event)},
          {label: 'Sensor types', icon: 'pi pi-fw pi-sitemap', routerLink: ['types'], routerLinkActiveOptions: {exact: true},
            command: (event) => this.styleConfig(event)},
          {label: 'Attribute\'s dictionary', icon: 'pi pi-fw pi-briefcase', routerLink: ['attributes'],
            routerLinkActiveOptions: {exact: true},
            command: (event) => this.styleConfig(event)}
        ]
      },
      {
        label: 'Administration',
        items: [
          {
            label: 'Eventslogger',
            icon: 'pi pi-pi pi-eye',
            routerLink: ['eventslogger'],
            routerLinkActiveOptions: {exact: true},
            command: (event) => this.styleConfig(event)
          }
        ]
      }];
  }

  styleConfig(event) {
    this.items.forEach(subItems => {
      this.disableSelection(subItems);
    });
    event.item.styleClass = 'selected-menu-item';
  }

  disableSelection(item) {
    if (item.items === undefined || item.items === null || item.items.length === 0) {
      return;
    }
    item.items.forEach( subItem => {
      subItem.styleClass = 'unselected-menu-item';
    });
  }

}
