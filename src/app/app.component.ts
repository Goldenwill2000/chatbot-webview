import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedTab = 0;
  chatId: string = '';
  firstName: string = '';

  tabs = [
    { label: 'Product A', description: 'Description for Product A. Review and confirm your order.' },
    { label: 'Product B', description: 'Description for Product B. Review and confirm your order.' }
  ];

  constructor(
    private telegramService: TelegramService,
    private route: ActivatedRoute // 👈 for reading query params
  ) {}

  ngOnInit(): void {
    // ✅ Read query params when component loads
    this.route.queryParams.subscribe(params => {
      this.chatId = params['chatId'] || '';
      this.firstName = params['firstName'] || '';
      console.log('chatId:', this.chatId);
      console.log('firstName:', this.firstName);
    });
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  confirmOrder() {
    const selectedProduct = this.tabs[this.selectedTab].label;
    const message = `${this.firstName} confirmed order for ${selectedProduct}`;
    
    // Fallback in case chatId isn't available
    const chatId = this.chatId 

    this.telegramService.sendMessageToTelegram(chatId, message).subscribe({
      next: () => {
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
