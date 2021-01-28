import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  DataParams;
  Nome;
  ClientData = "client-data";

  constructor(private navCtrl: NavController, private activateRouter: ActivatedRoute, private router: Router,private storage: Storage) {
    //pegando parametros da pagina de login
    this.activateRouter.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.DataParams = this.router.getCurrentNavigation().extras.state.item;
        if (this.DataParams != undefined) {
          console.log(this.DataParams);
          localStorage.setItem('NomeDoCliente', this.DataParams.data.name);
          this.storage.set(this.ClientData,this.DataParams).then((data) => {

          }).catch(error => {
            alert(error);
          });

        }

      }
    });
  }

  ngOnInit() {
    this.Nome = localStorage.getItem('NomeDoCliente');
  }

  Voltar() {
    this.navCtrl.navigateBack('login');
  }

  chat() {
    this.navCtrl.navigateForward('chatboot');
  }
  products() {
    this.navCtrl.navigateForward('products');
  }

  orders() {
    this.navCtrl.navigateForward('orders');
  }

}
