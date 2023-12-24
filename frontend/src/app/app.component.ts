import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}

export interface LearningPackage {
  packageId: number;
  packageName: string;
  packageDescription: string;
  packageProgress: number;
  packageDifficulty: number;
  packageFavorite: boolean;
}

export interface LearningFact {
  factId: number;
  packageId: number;
  factQuestion: string;
  factAnswer: string;
  factTimesReviewed: number;
  factLastReviewedDate: Date;
  factNextReviewDate: Date;
  confidenceLevel: number;
}

export interface Statistics {
  statId: number;
  packageId: number;
  lowConfidenceCount: number;
  mediumConfidenceCount: number;
  highConfidenceCount: number;
  timeSpent: number;
}

export interface TimeHistory {
  historyId: number;
  packageId: number;
  timeSpent: number;
  historyDate: Date;
}

