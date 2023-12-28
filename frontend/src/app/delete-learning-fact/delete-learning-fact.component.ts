import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningFact } from '../app.component'; // Adjust import path as needed

@Component({
  selector: 'app-delete-learning-fact',
  templateUrl: './delete-learning-fact.component.html',
  styleUrls: ['./delete-learning-fact.component.css']
})
export class DeleteLearningFactComponent implements OnInit {
  facts: LearningFact[] = [];
  selectedFact: LearningFact | null = null; // Store the selected fact

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchFacts();
  }

  fetchFacts() {
    this.httpClient.get<LearningFact[]>('/api/learningFact').subscribe({
      next: (facts) => this.facts = facts,
      error: (error) => console.error('Error fetching facts', error)
    });
  }

  deleteFact() {
    if (!this.selectedFact) {
      console.error('No fact selected for deletion');
      return;
    }

    this.httpClient.delete(`/api/learningFact/${this.selectedFact.packageId}/${this.selectedFact.factId}`).subscribe({
      next: () => {
        if(this.selectedFact!=null){
        console.log(`Fact with ID ${this.selectedFact.factId} from package ${this.selectedFact.packageId} deleted successfully`);
        this.selectedFact = null; // Reset the selection
        this.fetchFacts(); // Refresh the list of facts
        }
      },
      error: (error) => console.error('Error deleting fact', error)
    });
  }
}
