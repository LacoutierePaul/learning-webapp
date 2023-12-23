import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LearningPackage} from "../app.component";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {

  }

  getPackages() {
    this.httpClient.get<LearningPackage[]>("/api/learningPackageF")
  }
}
