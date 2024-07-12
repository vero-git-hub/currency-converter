import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  usdToUah: number | null = null;
  eurToUah: number | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
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
}
