import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, IonContent } from '@ionic/angular';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatboot',
  templateUrl: './chatboot.page.html',
  styleUrls: ['./chatboot.page.scss'],
})
export class ChatbootPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  url = environment.watson_url;
  msg = {
    bot: '',
    user: null,
    img: null
  };
  contexto;
  input;
  lista = new Array();
  img;
  temp;

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.chat();
  }

  chat() {
    //this.loading.show();
    this.http.get(this.url).subscribe(data => {
      console.log(data)
      //this.loading.hide();

      const objeto_retorno: any = data;
      console.log('obj retorno =', objeto_retorno);
      this.msg.bot = objeto_retorno.output.text[0];
      let cli = Object.assign({}, this.msg);

      this.lista.push(cli);
      this.contexto = objeto_retorno;

      console.log('paramentro = ', this.contexto);
    });


  }




  enviar() {
    this.msg.user = this.input;
    console.log('lista = ', this.lista);
    this.contexto.input = { text: this.input };
    console.log("Parametro Final", this.contexto);
    this.http.post(this.url, this.contexto).subscribe(data => {

      const objeto_retorno: any = data
      console.log('obj retorno =', objeto_retorno);

      this.msg.bot = objeto_retorno.output.text[0];
      if (objeto_retorno.output.text[1]) {
        this.msg.bot = objeto_retorno.output.text[0] + ' ' + objeto_retorno.output.text[1];
      }

      if (objeto_retorno.output.generic[1]) {
        this.msg.img = objeto_retorno.output.generic[1].source;
      }

      let cli = Object.assign({}, this.msg);
      this.lista.push(cli);

      this.contexto = objeto_retorno;
      this.msg.img = null
    });
    this.input = "";
    this.temp = setInterval(() => {
      this.content.scrollToBottom();
    }, 1000);
    //timer(2000).subscribe( ()=>{ this.content.scrollToBottom() });
  }

  Voltar() {
    this.navCtrl.navigateBack('menu');
    clearInterval(this.temp);
  }

}
