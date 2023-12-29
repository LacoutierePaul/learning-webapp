import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LearningPackage} from '../app.component';

@Component({
  selector: 'app-modify-learning-package',
  templateUrl: './modify-learning-package.component.html',
  styleUrls: ['./modify-learning-package.component.css']
})
export class ModifyLearningPackageComponent implements OnInit {

  modifiedPackage: LearningPackage = {} as LearningPackage;
  learningPackages: LearningPackage[] = [];
  selectedPackageId: number = 0;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.fetchLearningPackages();
  }

  fetchLearningPackages() {
    this.httpClient.get<LearningPackage[]>('/api/learningPackage').subscribe({
      next: (packages) => this.learningPackages = packages,
      error: (error) => console.error('Error fetching learning packages', error)
    });
  }

  loadPackageDetails() {
    if (this.selectedPackageId) {
      this.httpClient.get<LearningPackage>(`/api/learningPackage/${this.selectedPackageId}`).subscribe({
        next: (pack) => this.modifiedPackage = pack,
        error: (error) => console.error('Error fetching package details', error)
      });
    }
  }

  modifyPackage() {
    if (this.modifiedPackage && this.selectedPackageId) {
      this.modifiedPackage.packageId = this.selectedPackageId; // Make sure packageId is set
      this.httpClient.put<LearningPackage>(`/api/learningPackage`, this.modifiedPackage).subscribe({
        next: (response) => {
          console.log('Package modified successfully', response);
          this.resetPackageForm();
        },
        error: (error) => console.error('Error modifying package', error)
      });
    } else {
      console.error('No package is selected for modification');
    }
  }

  // Add the reset function
  resetPackageForm() {
    this.modifiedPackage = {} as LearningPackage;
    this.selectedPackageId = 0;
  }
}
