import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../currency.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  rates: { [key: string]: number } = {};
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  isDataLoaded: boolean = false;
  private updateIntervalId: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.rates$.subscribe(rates => {
      const oldRates = this.rates;
      this.rates = { 'USD': 1 / rates.USD, 'EUR': 1 / rates.EUR, 'UAH': 1 };
      this.isDataLoaded = true;

      if (oldRates['USD'] !== this.rates['USD'] || oldRates['EUR'] !== this.rates['EUR']) {
        this.convert1to2();
      }
    });
    this.currencyService.fetchRates();
  }

  ngOnDestroy(): void {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  convert1to2() {
    if (this.isDataLoaded && this.currency1 && this.currency2 && !isNaN(this.amount1)) {
      const rate = this.rates[this.currency2] / this.rates[this.currency1];
      const result = parseFloat((this.amount1 * rate).toFixed(2));
      if (!isNaN(result)) {
        this.amount2 = result;
      }
    }
  }

  convert2to1() {
    if (this.isDataLoaded && this.currency1 && this.currency2 && !isNaN(this.amount2)) {
      const rate = this.rates[this.currency1] / this.rates[this.currency2];
      const result = parseFloat((this.amount2 * rate).toFixed(2));
      if (!isNaN(result)) {
        this.amount1 = result;
      }
    }
  }
}
