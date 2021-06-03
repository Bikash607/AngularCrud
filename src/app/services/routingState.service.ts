import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RoutingState {
  previousUrl: string;
  showLoader: boolean;
  constructor(private router: Router) {

  }

  loadRouting(): void {
    this.router.events.subscribe((e: Event) => {

      if (e instanceof NavigationStart) {
        this.showLoader = true;
      }

      if (e instanceof NavigationEnd) {
        this.showLoader = false;
      }
    });
  }
}
