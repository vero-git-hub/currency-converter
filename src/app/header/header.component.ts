import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  usdToUah: number | null = null;
  eurToUah: number | null = null;
  updateInterval: number = 5;
  private updateIntervalId: any;
  autoUpdateEnabled: boolean = true;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe(rates => {
      this.usdToUah = rates.USD;
      this.eurToUah = rates.EUR;
    });
    this.currencyService.fetchRates();
    this.startAutoUpdate();
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  startAutoUpdate(): void {
    if (this.autoUpdateEnabled) {
      this.updateIntervalId = setInterval(() => {
        this.currencyService.fetchRates();
      }, this.updateInterval * 1000);
    }
  }

  stopAutoUpdate(): void {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  updateIntervalChanged(): void {
    this.updateInterval = Math.floor(this.updateInterval);
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
