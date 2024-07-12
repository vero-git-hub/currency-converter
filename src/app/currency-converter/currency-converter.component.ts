import { Component, OnInit } from '@angular/core';
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
export class CurrencyConverterComponent implements OnInit {
  rates: { [key: string]: number } = {};
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  isDataLoaded: boolean = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe(
      data => {
        console.log('Data received from API:', data);
        this.rates = { 'USD': data.USD, 'EUR': data.EUR, 'UAH': 1 };
        this.isDataLoaded = true;
        this.convert1to2();
      },
      error => {
        console.error('Error fetching data from API:', error);
        this.isDataLoaded = false;
      }
    );
  }

  convert1to2() {
    if (this.isDataLoaded && this.currency1 && this.currency2 && !isNaN(this.amount1)) {
      const rate = this.rates[this.currency2] / this.rates[this.currency1];
      const result = parseFloat((this.amount1 * rate).toFixed(2));
      console.log(`Converting ${this.amount1} ${this.currency1} to ${result} ${this.currency2} at rate ${rate}`);
      if (!isNaN(result)) {
        this.amount2 = result;
      }
    }
  }

  convert2to1() {
    if (this.isDataLoaded && this.currency1 && this.currency2 && !isNaN(this.amount2)) {
      const rate = this.rates[this.currency1] / this.rates[this.currency2];
      const result = parseFloat((this.amount2 * rate).toFixed(2));
      console.log(`Converting ${this.amount2} ${this.currency2} to ${result} ${this.currency1} at rate ${rate}`);
      if (!isNaN(result)) {
        this.amount1 = result;
      }
    }
  }
}
