import {Component, Input,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LearningPackage} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learning-package-card',
  templateUrl: './learning-package-card.component.html',
  styleUrls: ['./learning-package-card.component.css']
})
export class LearningPackageCardComponent implements OnInit{

  @Input()
  learningPackage: LearningPackage = {
    packageId: 0,
    packageName: "",
    packageDescription: "",
    packageProgress: 0,
    packageDifficulty: 0,
    packageFavorite: false,
  };
  length: number = 0;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getLength();
  }
  changeFavoriteStatus(favorite: boolean){
    this.httpClient.put<LearningPackage>("/api/learningPackage", {
      "packageId": this.learningPackage.packageId,
      "packageFavorite": favorite})
      .subscribe({
        next: (res: LearningPackage) => {
          this.learningPackage = res;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  goToLearningFactPage(learningPackageId: number) {
    this.router.navigate(['/learning-fact-page', learningPackageId]);
  }

  private getLength() {
    this.httpClient.get(`/api/learningFact/${this.learningPackage.packageId}/count`).subscribe({
      next: (res: any) => {
        this.length =res;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${this.learningPackage.packageId}`, err);
      }
    });
  }

  getProgressBarColor() {
    if (this.learningPackage.packageProgress < 50) {
      return 'red'; // Change to your desired color for progress less than 30%
    } else if (this.learningPackage.packageProgress < 100) {
      return 'orange'; // Change to your desired color for progress between 30% and 70%
    } else {
      return 'green'; // Change to your desired color for progress greater than or equal to 70%
    }
  }
}
