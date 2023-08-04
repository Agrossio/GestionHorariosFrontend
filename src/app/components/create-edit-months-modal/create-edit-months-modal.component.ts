import {Component, ViewChild} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {forkJoin, Observable} from "rxjs";
import {MonthRequest, MonthWorkdays, YearMonthDays} from "../../models/Request/MonthRequest";
import {MonthsService} from "../../services/months.service";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-create-edit-months-modal',
  templateUrl: './create-edit-months-modal.component.html',
  styleUrls: ['./create-edit-months-modal.component.css'],
  providers: [NgbActiveModal]
})
export class CreateEditMonthsModalComponent {
  @ViewChild('calendar', { static: false }) calendarRef: any;
  endDate: string = '';
  startDate: string = '';
  workdays: YearMonthDays[] = [];
  holidays: YearMonthDays[] = [];
  modifiedMonths: MonthRequest[] = [];
  savedMonths: MonthRequest[] = [];
  showLoader: boolean = true;
  constructor(public modalRef: NgbActiveModal,private monthsService: MonthsService,private swAlert: AlertsService) {
    this.getAllMonthsFromDatabase();
    const currentDate = new Date();
    this.startDate = currentDate.toISOString().substring(0, 10);
    this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate())
      .toISOString().substring(0, 10);
    this.reloadCalendar();
  }
  calculateProjectWorkdays() {
    this.showLoader = true;
    const startYear = this.getYearFromDate(this.startDate);
    const endYear = this.getYearFromDate(this.endDate);
    this.workdays = [];
    this.holidays = [];
    const observables: Observable<YearMonthDays[]>[] = [];
    for (let year = startYear; year <= endYear; year++) {
      observables.push(this.monthsService.getMappedHolidays(year));
    }
    forkJoin(observables).subscribe(
      results => {
        results.forEach((data, index) => {
          const year = startYear + index;
          if (year >= startYear && year <= endYear) {
            const monthWorkdays = this.calculateYearWorkdays(data, year);
            this.workdays.push(...monthWorkdays);
            this.holidays.push(...data);
          }
        });
        this.showLoader = false;
      },
      error => {
        console.error(error);
        this.showLoader = false;
      }
    );
  }
  calculateYearWorkdays(holidays: YearMonthDays[], year: number): YearMonthDays[] {
    const yearMonthDays: YearMonthDays[] = [];
    let currentDate = new Date(this.startDate);
    const endYear = this.getYearFromDate(this.endDate);
    const endMonth = new Date(this.endDate);
    endMonth.setDate(endMonth.getDate() + 1);
    while (currentDate <= new Date(this.endDate) && currentDate.getFullYear() <= endYear) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      if (currentYear === year) {
        const workDays = this.calculateMonthWorkdays(currentMonth, year, holidays);
        const monthWorkdays: { month: number; days: number[] }[] = [{
          month: currentMonth,
          days: workDays
        }];
        yearMonthDays.push({ year: currentYear, monthWorkdays });
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return yearMonthDays;
  }
  calculateMonthWorkdays(month: number, year: number, holidays: YearMonthDays[]): number[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    const workdays: number[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month - 1, day);
      if (!this.isNonWorkingDay(currentDate, holidays)) {
        workdays.push(day);
      }
    }
    return workdays;
  }
  getYearFromDate(date: string): number {
    return new Date(date).getFullYear();
  }
  getMonthFromDate(date: string): number {
    return new Date(date).getMonth() + 1;
  }
  getMonthName(month: number): string {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[month - 1];
  }
  getFilteredYearMonthWorkdays(): YearMonthDays[] {
    return this.workdays.filter(year => year.year === this.calendarRef.currentYear);
  }
  getAllMonthsFromDatabase() {
    this.monthsService.getAllMonths().subscribe(
      dbModifiedMonths => {
        this.savedMonths = dbModifiedMonths;
      },
      error => {
        console.error(error);
      }
    );
  }
  isNonWorkingDay(date: Date, holidays: YearMonthDays[]): boolean {
    const isHoliday = holidays.some(holiday =>
      holiday.monthWorkdays.some(workdays =>
        workdays.month === date.getMonth() + 1 && workdays.days.includes(date.getDate())
      )
    );
    return date.getDay() === 0 || date.getDay() === 6 || isHoliday;
  }
  reloadCalendar() {
    const startMonth = this.getMonthFromDate(this.startDate);
    this.showLoader=false;
    this.calculateProjectWorkdays();
    if (this.calendarRef) {
      this.calendarRef.currentYear = this.getYearFromDate(this.startDate);
      this.calendarRef.getDaysFromDate(startMonth, this.calendarRef.currentYear);
    }
  }
  getModifiedMonthWorkdays(month: number): number | undefined {
    const modifiedMonth = this.modifiedMonths.find(
      (m) => m.month === month && m.year === this.calendarRef.currentYear
    );
    return modifiedMonth?.working_days ?? undefined;
  }
  modifyWorkdays(monthWorkday: MonthWorkdays, value: number) {
    const modifiedMonth = this.modifiedMonths.find(
      (m) => m.month === monthWorkday.month && m.year === this.calendarRef.currentYear
    );
    const savedMonth = this.savedMonths.find(
      (m) => m.month === monthWorkday.month && m.year === this.calendarRef.currentYear
    );
    if (modifiedMonth) {
      const savedMonthWorkingDays = savedMonth?.working_days ?? 0;
      const modifiedMonthWorkingDays = modifiedMonth.working_days + value;
      if (modifiedMonthWorkingDays === savedMonthWorkingDays) {
        this.modifiedMonths = this.modifiedMonths.filter(
          (m) => m.month !== monthWorkday.month || m.year !== this.calendarRef.currentYear
        );
      } else {
        modifiedMonth.working_days = modifiedMonthWorkingDays;
      }
    } else {
      const modifiedMonthWorkingDays = (savedMonth?.working_days ?? monthWorkday.days.length) + value;
      const modifiedMonth = new MonthRequest(
        this.calendarRef.currentYear,
        monthWorkday.month,
        modifiedMonthWorkingDays
      );
      this.modifiedMonths.push(modifiedMonth);
    }
  }
  isMonthModified(month: number): boolean {
    return this.modifiedMonths.some(
      (modifiedMonth) =>
        modifiedMonth.month === month && modifiedMonth.year === this.calendarRef.currentYear
    );
  }
  isMonthSaved(month: number): boolean | undefined {
    const savedMonth = this.savedMonths.find(
      (m) => m.month === month && m.year === this.calendarRef.currentYear
    );
    const modifiedMonth = this.modifiedMonths.find(
      (m) => m.month === month && m.year === this.calendarRef.currentYear
    );
    return savedMonth && modifiedMonth === undefined;
  }
  getModifiedDays(month: number): number {
    const monthData = this.getFilteredYearMonthWorkdays().find(
      (m) => m.monthWorkdays.some((workdays) => workdays.month === month)
    );
    const modifiedMonth = this.modifiedMonths.find(
      (m) => m.month === month && m.year === this.calendarRef.currentYear
    );
    if (monthData && modifiedMonth) {
      return modifiedMonth.working_days - monthData.monthWorkdays[0].days.length;
    }
    return 0;
  }
  saveAll() {
    if (this.modifiedMonths.length > 0) {
        this.updateMonth(this.modifiedMonths);
      this.swAlert.alert('success', `¡Cambios guardados correctamente!`, false);
      } else {
      this.swAlert.alert('info', `No hay cambios para guardar.`, false);
    }
  }
  updateMonth(month: MonthRequest[]) {
    this.monthsService.updateMonth(month).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  cancelAll() { 
    this.modifiedMonths = [];
  }
}

