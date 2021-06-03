import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router, Event, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoader: boolean;
  constructor(private router: Router) {
    this.router.events.subscribe((e: Event) => {

      if (e instanceof NavigationStart) {
        console.log('Loader start');
        this.showLoader = true;
      }

      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        console.log('Loader End');
        this.showLoader = false;
      }
    });
  }
  title = 'AngularCrud';
}
