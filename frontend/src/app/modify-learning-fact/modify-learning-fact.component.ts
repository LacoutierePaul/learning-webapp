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
  selectedPackageId: number = 0;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchLearningPackages();
  }

  onPackageChange() {
    this.selectedFactId = 0;
    this.fetchFactsForPackage(this.selectedPackageId);
  }

  fetchFactsForPackage(packageId: number) {
    if (packageId) {
      this.httpClient.get<LearningFact[]>(`/api/allLearningFact/${packageId}`).subscribe({
        next: (facts) => this.learningFacts = facts,
        error: (error) => console.error('Error fetching facts for package', error)
      });
    } else {
      this.learningFacts = [];
    }
  }

  loadFactDetails() {
    if (this.selectedFactId) {
      this.httpClient.get<LearningFact>(`/api/learningFact/${this.selectedFactId}`).subscribe({
        next: (fact) => {
          this.modifiedFact = fact;
          //this.selectedPackageId = fact.packageId; // Mise à jour du packageId sélectionné
        },
        error: (error) => console.error('Error fetching fact details', error)
      });
    }
  }

  fetchLearningPackages() {
    this.httpClient.get<LearningPackage[]>('/api/learningPackage').subscribe({
      next: (pack) => this.learningPackages = pack,
      error: (error) => console.error('Error fetching learning packages', error)
    });
  }

  modifyFact() {
    if (this.selectedFactId && this.modifiedFact) {
      this.modifiedFact.factId = this.selectedFactId;
      this.modifiedFact.packageId = this.selectedPackageId;

      // Send the updated fact to the server
      this.httpClient.put<LearningFact>(`/api/learningFact`, this.modifiedFact).subscribe({
        next: (response) => {
          console.log('Fact modified successfully', response);
          // Reset the form after successful modification
          this.resetFactForm();
        },
        error: (error) => {
          console.error('Error modifying fact', error);
          // Optionally, handle the error in a user-friendly way
        }
      });
    } else {
      console.error('No fact is selected or the fact data is incomplete for modification');
      // Optionally, inform the user that a fact must be selected for modification
    }
  }


  resetFactForm() {
    this.modifiedFact = {} as LearningFact;
    this.selectedFactId = 0;
    this.selectedPackageId = 0;
  }

}
