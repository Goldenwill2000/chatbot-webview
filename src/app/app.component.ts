import { Component, OnInit } from '@angular/core';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedTab = 0;
  user: any = null;

  tabs = [
    { label: 'Product A', description: 'Description for Product A. Review and confirm your order.' },
    { label: 'Product B', description: 'Description for Product B. Review and confirm your order.' }
  ];

  constructor(private telegramService: TelegramService) {}

  ngOnInit(): void {
    const tg =(window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      this.user = tg.initDataUnsafe?.user;
      console.log('Telegram user:', this.user);
    }
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  confirmOrder() {
    const selectedProduct = this.tabs[this.selectedTab].label;
    const message = this.user
      ? `User ${this.user.first_name} (ID: ${this.user.id}) confirmed order for ${selectedProduct}`
      : `User confirmed order for ${selectedProduct}`;

    const chatId = this.user?.id?.toString() || "1662245531"; // fallback if no user

    this.telegramService.sendMessageToTelegram(chatId, message).subscribe({
      next: () => {
        (window as any).Telegram?.WebApp?.close();
      },
      error: (err) => {
        console.error('Failed to send message:', err);
      }
    });
  }
}
