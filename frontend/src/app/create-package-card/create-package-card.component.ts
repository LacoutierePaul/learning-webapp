import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LearningPackage } from "../app.component";
@Component({
  selector: 'app-create-package-card',
  templateUrl: './create-package-card.component.html',
  styleUrls: ['./create-package-card.component.css']
})
export class CreatePackageCardComponent {
  constructor(private httpClient:HttpClient) {
  }


  newPackage: Omit<LearningPackage, 'packageId'> = {
    packageName: '',
    packageDescription: '',
    packageProgress: 0,
    packageDifficulty: 0,
    packageFavorite: false
  };

  createPackage() {
    this.httpClient.post<LearningPackage>('/api/learningPackage', this.newPackage).subscribe({
      next: (response) => {
        console.log('Package created successfully', response);
        // Reset the form
        this.newPackage = {
          packageName: '',
          packageDescription: '',
          packageProgress: 0,
          packageDifficulty: 0,
          packageFavorite: Boolean(0),};
      },
      error: (error) => {
        console.error('Error creating package', error);
      }
    });
  }
}
