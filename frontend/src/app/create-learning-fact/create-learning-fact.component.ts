import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningFact } from '../app.component';
import {LearningPackage} from "../app.component";

@Component({
  selector: 'app-create-learning-fact',
  templateUrl: './create-learning-fact.component.html',
  styleUrls: ['./create-learning-fact.component.css']
})
export class CreateLearningFactComponent implements OnInit {

    newFact: Omit<LearningFact, 'factId'> = {
        packageId: 0,
        factQuestion: '',
        factAnswer: '',
        factTimesReviewed: 0,
        factLastReviewedDate: new Date(),
        factNextReviewDate: new Date(),
        confidenceLevel: 1
    };

    learningPackages: LearningPackage[] = [];

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
        this.fetchLearningPackages();
    }

    fetchLearningPackages() {
        this.httpClient.get<LearningPackage[]>('/api/learningPackage').subscribe({
            next: (packages) => this.learningPackages = packages,
            error: (error) => console.error('Error fetching learning packages', error)
        });
    }

    createFact() {
        this.httpClient.post<LearningFact>('/api/learningFact', this.newFact).subscribe({
            next: (response) => {
                console.log('Fact created successfully', response);
                // Reset the form or handle success
                this.resetFactForm();
            },
            error: (error) => console.error('Error creating fact', error)
        });
    }

    resetFactForm() {
        this.newFact = {
            packageId: 0,
            factQuestion: '',
            factAnswer: '',
            factTimesReviewed: 0,
            factLastReviewedDate: new Date(),
            factNextReviewDate: new Date(),
            confidenceLevel: 1
        };
    }
}
