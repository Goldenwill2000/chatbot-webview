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
    const chatId = "7826648391:AAEUENATbIVDngbwsu_wZOisUbuPhhqvHzk"; // TODO: Replace with actual user chatId from Telegram WebApp

   this.telegramService.sendMessageToTelegram(chatId, message).subscribe({
  next: () => alert('Message sent to Telegram!'),
  error: err => console.error('Error sending message:', err)
});
  }
}
