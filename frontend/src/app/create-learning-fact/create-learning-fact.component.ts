import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningFact } from '../app.component'; // Adjust the import path as necessary

@Component({
  selector: 'app-create-learning-fact',
  templateUrl: './create-learning-fact.component.html',
  styleUrls: ['./create-learning-fact.component.css']
})

export class CreateLearningFactComponent {

  newFact: LearningFact = {
    factId: 0,
    packageId: 0, // This can be set based on the selected package
    factQuestion: '',
    factAnswer: '',
    factTimesReviewed: 0,
    factLastReviewedDate: new Date(),
    factNextReviewDate: new Date(),
    confidenceLevel: 0,
  };

  constructor(private httpClient: HttpClient) {}

  createFact() {
    // Add your API endpoint here
    this.httpClient.post<LearningFact>('/api/learningFact', this.newFact).subscribe({
      next: (response) => {
        console.log('Fact created successfully', response);
        this.newFact = {
          factId: 0,
          packageId: 0, // This can be set based on the selected package
          factQuestion: '',
          factAnswer: '',
          factTimesReviewed: 0,
          factLastReviewedDate: new Date(),
          factNextReviewDate: new Date(),
          confidenceLevel: 0,
        };
      },
      error: (error) => console.error('Error creating fact', error)
    });
  }
}
