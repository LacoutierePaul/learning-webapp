import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LearningPackage } from "../app.component";
import { Statistics} from "../app.component";

@Component({
  selector: 'app-create-package-card',
  templateUrl: './create-package-card.component.html',
  styleUrls: ['./create-package-card.component.css']
})
export class CreatePackageCardComponent {
  newPackage: Omit<LearningPackage, 'packageId'> = {
    packageName: '',
    packageDescription: '',
    packageProgress: 0,
    packageDifficulty: 0,
    packageFavorite: false
  };

  newStat: Omit<Statistics, 'statId'> = {
    packageId: 0,
    lowConfidenceCount: 0,
    mediumConfidenceCount: 0,
    highConfidenceCount: 0,
    timeSpent: 0,
  };

  constructor(private httpClient: HttpClient) {}

  createPackage() {
    this.httpClient.post<LearningPackage>('/api/learningPackage', this.newPackage).subscribe({
      next: (response) => {
        console.log('Package created successfully', response);

        // Assign a value to newStat after package is created
        this.newStat = {
          packageId: response.packageId,
          lowConfidenceCount: 0,
          mediumConfidenceCount: 0,
          highConfidenceCount: 0,
          timeSpent: 0,
        };

        // Send the new statistics to the API
        this.httpClient.post<Statistics>('/api/statistic',this.newStat).subscribe({
          next:(response)=> {
            console.log('Statistics created successfully', response);

        },
          error: (error) => {
            console.error('Error creating statistics', error);
          }
        });

        // Reset the package form
        this.resetPackageForm();
      },
      error: (error) => {
        console.error('Error creating package', error);
      }
    });
  }

  resetPackageForm() {
    this.newPackage = {
      packageName: '',
      packageDescription: '',
      packageProgress: 0,
      packageDifficulty: 0,
      packageFavorite: false
    };
  }
}
