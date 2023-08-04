import {Component, Input} from '@angular/core';
import {YearMonthDays} from "../../models/Request/MonthRequest";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Input() holidays: YearMonthDays[]=[];
  @Input() workdays: YearMonthDays[]=[];
  currentYear: number = new Date().getFullYear();
  week: string[]=[];
  monthSelect: { indexWeek: number; value: number }[] = [];
  dateSelect!: Date;
  dateValue!: number;
  getDaysFromDate(month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    this.dateSelect = startDate;
    this.monthSelect = [...Array(endDate.getDate())].map((_, i) => {
      const day = i + 1;
      const dayObject = new Date(year, month - 1, day + 1);
      return {
        value: day,
        indexWeek: dayObject.getDay() === 0 ? 7 : dayObject.getDay()
      };
    });
  }
  changeMonthBy(delta: number) {
    const nextDate = new Date(this.dateSelect.getFullYear(), this.dateSelect.getMonth() + delta, 1);
    this.getDaysFromDate(nextDate.getMonth() + 1, nextDate.getFullYear());
    this.currentYear = nextDate.getFullYear();
  }
  changeYearBy(delta: number) {
    const nextDate = new Date(this.dateSelect.getFullYear() + delta, this.dateSelect.getMonth(), 1);
    this.getDaysFromDate(nextDate.getMonth() + 1, nextDate.getFullYear());
    this.currentYear = nextDate.getFullYear();
  }

  clickDay(day: number) {
    this.dateValue = day;
  }
  constructor() {
    this.loadWeek();
    this.getDaysFromDate(new Date().getMonth() + 1, new Date().getFullYear());
  }
  loadWeek(): void {
    for (let i = 0; i < 7; i++) {
      const date = new Date(2000, 0, i + 2);
      const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
      const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      this.week.push(capitalizedDayName);
    }
  }
  isWorkingDay(day: number): boolean {
    const currentMonth = this.dateSelect.getMonth() + 1;
    const currentYear = this.dateSelect.getFullYear();
    const monthWorkdays = this.workdays.find(
      item => item.year === currentYear && item.monthWorkdays.some(month => month.month === currentMonth)
    );
    return monthWorkdays?.monthWorkdays.some(month => month.days.includes(day)) ?? false;
  }
}
