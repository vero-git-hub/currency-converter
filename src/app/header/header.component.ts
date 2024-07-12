import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HeaderComponent implements OnInit {
  usdToUah: number | null = null;
  eurToUah: number | null = null;
  updateInterval: number = 5;
  private updateIntervalId: any;
  autoUpdateEnabled: boolean = true;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchRates();
    this.startAutoUpdate();
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  fetchRates(): void {
    this.currencyService.getRates().subscribe(
      data => {
        console.log('Data received from API:', data);
        this.usdToUah = 1 / data.USD;
        this.eurToUah = 1 / data.EUR;
      },
      error => {
        console.error('Error fetching data from API:', error);
      }
    );
  }

  startAutoUpdate(): void {
    if (this.autoUpdateEnabled) {
      this.updateIntervalId = setInterval(() => {
        this.fetchRates();
      }, this.updateInterval * 60000);
    }
  }

  stopAutoUpdate(): void {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  updateIntervalChanged(): void {
    this.stopAutoUpdate();
    this.startAutoUpdate();
  }

  toggleAutoUpdate(event: any): void {
    this.autoUpdateEnabled = event.target.checked;
    if (this.autoUpdateEnabled) {
      this.startAutoUpdate();
    } else {
      this.stopAutoUpdate();
    }
  }
}
