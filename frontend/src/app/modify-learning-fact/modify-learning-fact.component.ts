import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningFact, LearningPackage } from '../app.component';

@Component({
  selector: 'app-modify-learning-fact',
  templateUrl: './modify-learning-fact.component.html',
  styleUrls: ['./modify-learning-fact.component.css']
})
export class ModifyLearningFactComponent implements OnInit {

  modifiedFact: LearningFact = {} as LearningFact;
  learningPackages: LearningPackage[] = [];
  learningFacts: LearningFact[] = [];
  selectedFactId: number = 0;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchLearningPackages();
    this.fetchLearningFacts();
  }

  fetchLearningFacts() {
    this.httpClient.get<LearningFact[]>('/api/learningFact').subscribe({
      next: (facts) => this.learningFacts = facts,
      error: (error) => console.error('Error fetching learning facts', error)
    });
  }

  loadFactDetails() {
    if (this.selectedFactId) {
      this.httpClient.get<LearningFact>(`/api/learningFact/${this.selectedFactId}`).subscribe({
        next: (fact) => this.modifiedFact = fact,
        error: (error) => console.error('Error fetching fact details', error)
      });
    }
  }

  fetchLearningPackages() {
    this.httpClient.get<LearningPackage[]>('/api/learningPackage').subscribe({
      next: (packages) => this.learningPackages = packages,
      error: (error) => console.error('Error fetching learning packages', error)
    });
  }

  modifyFact() {
    if (this.modifiedFact && this.selectedFactId) {
      // Ensure the factId and packageId are correctly set
      this.modifiedFact.factId = this.selectedFactId;
      this.modifiedFact.packageId = this.modifiedFact.packageId || 0;  // Example, set to 0 if not set

      this.httpClient.put<LearningFact>(`/api/learningFact`, this.modifiedFact).subscribe({
        next: (response) => {
          console.log('Fact modified successfully', response);
          this.resetFactForm();
        },
        error: (error) => console.error('Error modifying fact', error)
      });
    } else {
      console.error('No fact is selected for modification');
    }
  }


  resetFactForm() {
    this.modifiedFact = {} as LearningFact;
    this.selectedFactId = 0;
  }
}
