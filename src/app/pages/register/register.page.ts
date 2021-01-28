import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  Voltar(){
    this.navCtrl.navigateBack('login');
  }

  register(form){
    console.log(form)
  }

}
