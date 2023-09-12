import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {FirebaseAnalytics} from '@capacitor-community/firebase-analytics';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    const navEndEvent$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    //@ts-ignore
    navEndEvent$.subscribe(async (event: NavigationEnd) => {
      console.log('route changed: ', event.url);
      this.setScreenName(event.url);
    });
  }

  setScreenName(screenName: string) {
    const str = screenName.split('/').join('Page ');
    FirebaseAnalytics.setScreenName({
      screenName,
      nameOverride: `${str}`
    });
  }
}
