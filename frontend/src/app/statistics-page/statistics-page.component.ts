import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LearningPackage, Statistics} from "../app.component";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  startedLearningPackages: LearningPackage[] = [];
  statisticsStartedLearningPackages: Statistics[] = [];
  chartOptions: {} = {};

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
        this.loadChart();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  loadChart() {
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

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: "50%"
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
    Highcharts.chart('chart-container', this.chartOptions);
  }
}
