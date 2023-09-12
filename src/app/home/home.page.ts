import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import {FirebaseAnalytics} from '@capacitor-community/firebase-analytics';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  analyticsEnabled = true;
  constructor() {}

  async ngOnInit() {
    const info = await Device.getInfo();
    if (info.platform === 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }

  async initFb() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }

  setUser() {
    // Use Firebase Auth uid
    FirebaseAnalytics.setUserId({
      userId: "test_123",
    });
  }

  setProperty() {
    FirebaseAnalytics.setUserProperty({
      name: "framework",
      value: "angular",
    });
  }

  logEvent() {
    FirebaseAnalytics.logEvent({
      name: "login",
      params: {
        method: "email"
      }
    });
  }

  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });
  }

}
