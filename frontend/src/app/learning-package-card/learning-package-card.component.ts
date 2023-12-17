import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LearningPackage} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learning-package-card',
  templateUrl: './learning-package-card.component.html',
  styleUrls: ['./learning-package-card.component.css']
})
export class LearningPackageCardComponent {

  @Input()
  learningPackage: LearningPackage = {
    packageId: 0,
    packageName: "",
    packageDescription: "",
    packageProgress: 0,
    packageDifficulty: 0,
    packageFavorite: false,
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

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
}
