import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LearningPackage } from "../app.component";

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.css']
})
export class StudyPageComponent {
  statusMessage: string = "aa";
  learningPackages: LearningPackage[] = [];

  constructor(private httpClient: HttpClient) {}

  GetLesson() {
    this.httpClient.get<LearningPackage[]>('/api/learningPackage').subscribe({
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
