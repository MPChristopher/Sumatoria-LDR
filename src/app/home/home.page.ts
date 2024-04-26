import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() {}
  async ngOnInit() {
    await LocalNotifications.requestPermissions();

    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Esta es una notificación emergente",
          body: "Esta notificación debería ejecutarse en segundo plano pero no cuando lapp esté cerrada",
          id: 1
        }
      ]
    });
  }
}
