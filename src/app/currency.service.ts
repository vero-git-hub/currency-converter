import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  getRates(): Observable<{ USD: number, EUR: number }> {
    return this.http.get<RateResponse[]>(this.apiUrl).pipe(
      map((response: RateResponse[]) => {
        const usdRate = response.find(r => r.cc === 'USD')?.rate;
        const eurRate = response.find(r => r.cc === 'EUR')?.rate;

        return {
          USD: usdRate ? 1 / usdRate : 0,
          EUR: eurRate ? 1 / eurRate : 0
        };
      })
    );
  }
}
