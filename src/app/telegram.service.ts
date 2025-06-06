import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private apiUrl = 'http://localhost:8080/api/telegram/send'; 

  constructor(private http: HttpClient) {}

  sendMessageToTelegram(message: string) {
    return this.http.post(this.apiUrl, { message });
  }
}
