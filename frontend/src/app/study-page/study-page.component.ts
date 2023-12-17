import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LearningPackage } from "../app.component";

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.css']
})
export class StudyPageComponent implements OnInit{
  statusMessage: string = "aa";
  learningPackages: LearningPackage[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
      this.getLessons(false);
  }

  getLessons(onlyFavorites: boolean) {
    let apiUrl = onlyFavorites ? "/api/learningPackage/favorites" : "/api/learningPackage";
    this.httpClient.get<LearningPackage[]>(apiUrl).subscribe({
      next: (res) => {
        this.learningPackages = res;
        this.statusMessage = "Data loaded successfully!";
      },
      error: (err) => {
        console.error('Failed to query http /api/learning-package', err);
        this.statusMessage = "Failed to load data";
      }
    });
  }
}
