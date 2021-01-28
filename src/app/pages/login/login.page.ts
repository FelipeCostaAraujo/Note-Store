import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toggleSelect:boolean;
  Email ;
  Senha ;
  Login_data = "login-data";

  constructor(private loginService: LoginService,private router: Router ,private nav: NavController, private toastCtrl: ToastController,private storage: Storage) { }

  ngOnInit() {
    this.storage.get(this.Login_data).then(data => {
      if (data != undefined) {
        this.toggleSelect = true;
        this.Email = data.email;
        this.Senha = data.senha;
      }else{
        this.toggleSelect = false;
        this.Email = null;
        this.Senha = null;
      }
    });
  }
  doLogin(email, senha) {
    console.log(email, senha)
    this.loginService.Login(email, senha).then((data: any) => {
      console.log(data);
      if (data.sucesso == true) {
        if(this.toggleSelect == true){
          this.saveDataLoginStorage()
        }else if(this.toggleSelect == false){
          this.removeDataLoginStorage();
        }
        
        let navigationExtras: NavigationExtras = {
          state: {
            item: data
          }
        }
        this.router.navigate(['menu'], navigationExtras);

      }
      if (data.sucesso != true) {
        this.showMessageError(data.message);
      }
    }).catch((error) => {
      console.log(error.error)
    })
  }

  async showMessageError(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  saveDataLoginStorage(){
    const params = {
      email:this.Email,
      senha:this.Senha,
    }
    this.storage.set(this.Login_data, params).then((data) => {
        console.log("Salvo com sucesso");
    }).catch(error => {
      alert(error);
    });
  }

  removeDataLoginStorage(){
    this.storage.remove(this.Login_data).then((data) =>{

    }).catch((error)=>{
      console.log(error);
    })
  }

  register(){
    this.nav.navigateForward('register');
  }

}
