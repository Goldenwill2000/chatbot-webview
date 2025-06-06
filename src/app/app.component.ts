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

    this.telegramService.sendMessageToTelegram(message).subscribe({
      next: () => alert('Message sent to Telegram!'),
      error: err => console.error('Error sending message:', err)
    });
  }
}
