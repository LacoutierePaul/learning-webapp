import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningPackage, LearningFact } from '../app.component'; // Adjust import path as needed

@Component({
  selector: 'app-delete-learning-package',
  templateUrl: './delete-learning-package.component.html'
})
export class DeleteLearningPackageComponent implements OnInit {
  packages: LearningPackage[] = [];
  selectedPackageId: number | null = null; // ID of the selected package

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchPackages();
  }

  fetchPackages() {
    this.httpClient.get<LearningPackage[]>('/api/learningPackage').subscribe({
      next: (packages) => this.packages = packages,
      error: (error) => console.error('Error fetching packages', error)
    });
  }

  deletePackage() {
    if (this.selectedPackageId === null) {
      console.error('No package selected for deletion');
      return;
    }

    // First, fetch all facts associated with the package
    this.httpClient.get<LearningFact[]>(`/api/allLearningFact/${this.selectedPackageId}`).subscribe({
      next: (facts) => {
        // Then, delete each fact
        facts.forEach(fact => {
          this.httpClient.delete(`/api/learningFact/${this.selectedPackageId}/${fact.factId}`).subscribe({
            next: () => console.log(`Fact with ID ${fact.factId} deleted successfully`),
            error: (error) => console.error('Error deleting fact', error)
          });
        });

        // Finally, delete the package itself
        this.deleteEntirePackage();
      },
      error: (error) => console.error('Error fetching facts for package', error)
    });
  }

  deleteEntirePackage() {
    this.httpClient.delete(`/api/learningPackage/${this.selectedPackageId}`).subscribe({
      next: () => {
        console.log(`Package with ID ${this.selectedPackageId} deleted successfully`);
        this.selectedPackageId = null; // Reset the selection
        this.fetchPackages(); // Refresh the list of packages
      },
      error: (error) => console.error('Error deleting package', error)
    });
  }
}
