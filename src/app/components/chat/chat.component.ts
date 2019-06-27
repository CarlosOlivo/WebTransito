import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $  from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private serverUrl = 'http://localhost:8484/socket'
  private stompClient;
  private personal: any = null;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.initializeWebSocketConnection();
    this.personal = this.auth.getPersonal();
    if(this.personal == null) {
      window.location.pathname = '';
    }
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (mensaje) => {
        if(mensaje.body) {
          $(".chat").append("<div class='mensaje'>"+mensaje.body+"</div>")
        }
      });
    }, function(msg) {
      if(msg.startsWith("Whoops! Lost connection")) {
        alert("Servicio de chat no disponible, redireccionando...");
        window.location.pathname = '';
      }
    });
  }

  sendMessage(mensaje){
    this.stompClient.send("/send/mensaje" , {}, `${this.personal.nombre}> ${mensaje}`);
    $('#input').val('');
  }

}
