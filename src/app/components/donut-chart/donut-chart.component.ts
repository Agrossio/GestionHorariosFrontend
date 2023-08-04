import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements OnChanges {
  @Input() graphTitle: string | undefined;
  @Input() dataPercentages: number[] = [];
  @Input() aspectRatio: number = 5;
  @Input() fontSize: number = 30;
  @Input() hideChart : boolean = false
  @Output() graphToPDF = new EventEmitter<any>();

  public chart: Chart<'doughnut', number[], string> | undefined;
  private done = (): void => {
    const canvas = document.getElementById('MyChart') as HTMLCanvasElement;
    if (canvas != null) {
      const canvasImage = canvas.toDataURL('image/png', 1.0);
      this.graphToPDF.emit(canvasImage);
    }
  };
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: [
          'Finalizadas',
          'En proceso',
          'Por comenzar',
          'En revisión',
          'Cancelada',
        ],
        datasets: [
          {
            label: this.graphTitle,
            data: this.dataPercentages,
            backgroundColor: ['blue', 'orange', 'yellow', 'green', 'red'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        animation: {
          onComplete: this.done,
        },
        responsive: false,
        maintainAspectRatio: true,
        aspectRatio: this.aspectRatio,
        plugins: {
          legend: {
            labels: {
              padding: 15,
              color:'black',
              font: {
                size: this.fontSize,
              },
            },
          },
        },
      },
    });
  }

  ngOnChanges(): void {
    if (this.chart != undefined) {
      this.chart.update();
    } else {
      this.createChart();
    }
  }
}
