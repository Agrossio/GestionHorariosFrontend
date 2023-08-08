import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {MonthRequest, YearMonth, YearMonthDays} from "../models/Request/MonthRequest";
import {MonthResponse} from "../models/Response/MonthResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MonthsService {
  private SERVER_URL = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  private httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }
  getAllMonths(): Observable<MonthRequest[]> {
    try {
      return this.http.get<any>(`${this.SERVER_URL}/month/all`).pipe(
        map(response => {
          if (response.success) {
            return response.data.map((monthData :MonthRequest) => new MonthRequest(monthData.year, monthData.month, monthData.working_days));
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        })
      );
    } catch (error) {
      throw error;
    }
  }
  updateMonth(months: MonthRequest[]): Observable<MonthResponse> {
    try {
      return this.http.put<MonthResponse>(
        `${this.SERVER_URL}/month`,
        months,
        this.httpOptionsWithToken()
      );
    } catch (error) {
      throw error;
    }
  }
  getHolidays(year: number): Observable<any[]> {
    try {
      return this.http.get<any[]>(`https://nolaborables.com.ar/api/v2/feriados/${year}`, this.httpOptionsWithToken());
    } catch (error) {
      throw error;
    }
  }
  getMappedHolidays(year: number): Observable<YearMonthDays[]> {
    try {
      return new Observable<YearMonthDays[]>(observer => {
        this.getHolidays(year).subscribe(data => {
          const mappedHolidays: YearMonthDays[] = data.map(holiday => ({
            year: year,
            monthWorkdays: [
              { month: holiday.mes, days: [holiday.dia] }
            ]
          }));
          observer.next(mappedHolidays);
          observer.complete();
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
