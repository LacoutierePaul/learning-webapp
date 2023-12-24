import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LearningPackage, Statistics, TimeHistory} from "../app.component";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  startedLearningPackages: LearningPackage[] = [];
  statisticsStartedLearningPackages: Statistics[] = [];


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getStartedPackages();
    //this.getStartedPackageStatistics();
  }

  getStartedPackages() {
    this.httpClient.get<LearningPackage[]>("/api/startedLearningPackage").subscribe({
      next: (res: LearningPackage[]) => {
        this.startedLearningPackages = res;
        this.getStartedPackageStatistics();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getStartedPackageStatistics() {
    this.httpClient.get<Statistics[]>("/api/statisticsStartedPackages").subscribe({
      next: (res: Statistics[]) => {
        this.statisticsStartedLearningPackages = res;
        this.loadConfidenceChart();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadConfidenceChart() {
    let categories = this.startedLearningPackages.map(learningPackage => (
      learningPackage.packageName
    ));
    let series = [
      {
        name: "Low confidence (To review / Difficult)",
        data: this.statisticsStartedLearningPackages.map(statistic => {
          return statistic.lowConfidenceCount;
        })
      },
      {
        name: "Medium confidence",
        data: this.statisticsStartedLearningPackages.map(statistic => {
          return statistic.mediumConfidenceCount;
        })
      },
      {
        name: "High confidence",
        data: this.statisticsStartedLearningPackages.map(statistic => {
          return statistic.highConfidenceCount;
        })
      }
    ];

    let chartOptions: {} = {
      chart: {
        type: 'bar',
        height: "80%",
        width: 1000
      },
      title: {
        text: 'Confidence counts by packages'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        min: 0
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: series
    }
    Highcharts.chart('chart-container', chartOptions);
  }


  loadTimeChart(packageId: number) {
    let data: any[] = []
    this.httpClient.get(`/api/timeHistory/${packageId}`).subscribe({
      next: (timeHistories: TimeHistory[] | any) => {
        timeHistories.forEach((timeHistory: TimeHistory) => {
          data.push([timeHistory.historyDate.getTime(), timeHistory.timeSpent]);
        });
        this.createTimeChart(data)
      },
      error: err => {
        console.error(err);
      }
    });
  }

  createTimeChart(data: any[]) {
    let timeChartOptions: {} = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Time spent on the package over time',
        align: 'left'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Time spent (in seconds)'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            }
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [{
        type: 'area',
        name: 'Time spent on the package',
        data: data
      }]
    }
    Highcharts.chart('time-container', timeChartOptions);
  }
}
