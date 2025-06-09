import { Component } from '@angular/core';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedTab = 0;

  tabs = [
    { label: 'Product A', description: 'Description for Product A. Review and confirm your order.' },
    { label: 'Product B', description: 'Description for Product B. Review and confirm your order.' }
  ];

  constructor(private telegramService: TelegramService) {}

  selectTab(index: number) {
    this.selectedTab = index;
  }

    confirmOrder() {
    const selectedProduct = this.tabs[this.selectedTab].label;
    const message = `User confirmed order for ${selectedProduct}`;
    const chatId = "1662245531"; 
 this.telegramService.sendMessageToTelegram(chatId, message).subscribe({
  next: () => {
    // ✅ Close the Telegram WebApp from the frontend
    if ((window as any).Telegram?.WebApp) {
      (window as any).Telegram.WebApp.close();
    }
  },
  error: (err) => {
    console.error('Failed to send message:', err);
  }
});
  }
}
