import { Component, OnInit } from '@angular/core';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedTab = 0;
  chatId: string | null = null;
  firstName: string | null = null;

  tabs = [
    { label: 'Product A', description: 'Description for Product A. Review and confirm your order.' },
    { label: 'Product B', description: 'Description for Product B. Review and confirm your order.' }
  ];

  constructor(private telegramService: TelegramService) {}

 ngOnInit(): void {
    // Option A: From Telegram Web App context (secure)
    const tg = (window as any).Telegram?.WebApp;
    const userInfo = tg?.initDataUnsafe?.user;
    if (userInfo) {
      this.firstName = userInfo.first_name;
      this.chatId = userInfo.id?.toString();  // user.id, not chat.id
    }

    // Option B: From query string
    const urlParams = new URLSearchParams(window.location.search);
    this.chatId = this.chatId || urlParams.get('chatId');
    this.firstName = this.firstName || urlParams.get('firstName');
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  confirmOrder() {
    const selectedProduct = this.tabs[this.selectedTab].label;
    const message = `User ${this.firstName} confirmed order for ${selectedProduct}`;

    if (!this.chatId) {
      console.error("Chat ID not found!");
      return;
    }

    this.telegramService.sendMessageToTelegram(this.chatId, message).subscribe({
      next: () => {
        if ((window as any).Telegram?.WebApp) {
          (window as any).Telegram.WebApp.close();
        }
      },
      error: (err:any) => {
        console.error('Failed to send message:', err);
      }
    });
  }
}
