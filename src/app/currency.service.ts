import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface RateResponse {
  cc: string;
  rate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  private ratesSubject = new BehaviorSubject<{ USD: number, EUR: number }>({ USD: 0, EUR: 0 });
  rates$ = this.ratesSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchRates(): void {
    this.http.get<RateResponse[]>(this.apiUrl).pipe(
      map((response: RateResponse[]) => {
        const usdRate = response.find(r => r.cc === 'USD')?.rate;
        const eurRate = response.find(r => r.cc === 'EUR')?.rate;

        return {
          USD: usdRate ? usdRate : 0,
          EUR: eurRate ? eurRate : 0
        };
      })
    ).subscribe(rates => this.ratesSubject.next(rates));
  }

  getRates(): Observable<{ USD: number, EUR: number }> {
    return this.rates$;
  }
}
