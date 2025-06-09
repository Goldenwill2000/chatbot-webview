import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private apiUrl = 'http://localhost:8081/api/telegram/send'; 

  constructor(private http: HttpClient) {}

  sendMessageToTelegram(chatId: number, message: string): Observable<any> {
  return this.http.post(this.apiUrl, { chatId, message }, { responseType: 'text' as 'json' });
}
}
