import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  items;

  constructor(private apiService:ApiService,private navCtrl:NavController) { }

  ngOnInit() {
    this.listAll()
  }

  listAll(){
    this.apiService.listAll().then((data:any)=>{
      console.log(data);
      this.items = data.data;
    }).catch((error)=>{
      console.error(error);
    })
  }

  Voltar() {
    this.navCtrl.navigateBack('menu');
  }

}
