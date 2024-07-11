import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class CurrencyConverterComponent implements OnInit {
  rates: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe(data => {
      this.rates = data.rates;
    });
  }
}
