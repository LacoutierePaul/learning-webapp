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
    this.loadChart();
  }

  getStartedPackages() {
    this.httpClient.get<LearningPackage[]>("/api/startedLearningPackage").subscribe({
      next: (res: LearningPackage[]) => {
        this.startedLearningPackages = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadChart() {
    let categories = this.startedLearningPackages.map(learningPackage => (
      {packageName: learningPackage.packageName}
    ));

    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Confidence counts by packages'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Goals'
        }
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
      }
    }
    Highcharts.chart('chart-container', this.chartOptions);
  }
}
