import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  token;
  ClientData = "client-data"

  constructor(private apiService: ApiService, private navCtrl: NavController, private storage: Storage) {

  }

  ngOnInit() {
    this.LoadingOrders();
  }

  LoadingOrders() {
    this.storage.get(this.ClientData).then((data) => {
      if (data != undefined) {
        this.token = data.token;

        this.apiService.Orders(this.token).then((data: any) => {
          console.log(data);
        }).catch((error) => {
          console.error(error);
        });

      }
    });

  }

  Voltar() {
    this.navCtrl.navigateBack('menu');
  }

}
