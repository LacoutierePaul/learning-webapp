import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LearningPackage, LearningFact} from '../app.component'; // Adjust import path as needed

@Component({
  selector: 'app-delete-learning-package',
  templateUrl: './delete-learning-package.component.html',
  styleUrls: ['./delete-learning-package.component.css']
})
export class DeleteLearningPackageComponent implements OnInit {
  packages: LearningPackage[] = [];
  selectedPackageId: number | null = null; // ID of the selected package

  constructor(private httpClient: HttpClient) {
  }

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

    // We delete each fact from the selected package
    this.httpClient.delete(`/api/learningFact/${this.selectedPackageId}`).subscribe({
      next: (res: string | any) => {
        this.deleteStatistic();
      },
      error: (err) => {
        console.error(err);
      }
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

  deleteStatistic() {
    this.httpClient.delete(`/api/statistic/${this.selectedPackageId}`).subscribe({
      next: () => {
        this.deleteEntirePackage();
      },
      error: (error) => console.error('Error deleting statistic', error)
    });
  }
}
