import { Component, OnInit } from '@angular/core';
import { object, Database, ref } from '@angular/fire/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  circleColor = 'initial';

  constructor(private db: Database) {

  }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
    const route = ref(this.db, "/App/ValLDR");
    object(route).subscribe((attributes: any) => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      this.circleColor = this.getColorFromValLDR(valores_db);
    });

  }

  getColorFromValLDR(valLDR: number): string {
    if (valLDR > 50) {
      this.setNotify("!!☀️!!","Buenos dias solecito ✨")
      return "#FC7712"
    } else {
      this.setNotify("!!🌙!!","Buenas noches dulzura 👻")
      return "#3E37FF"
    }
  }

  async setNotify(title:string , body:string){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: 1
        }
      ]
    })
  }

}


