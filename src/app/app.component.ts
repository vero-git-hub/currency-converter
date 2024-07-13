import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CurrencyConverterComponent],
})
export class AppComponent {
  title = 'Currency Converter';
}
