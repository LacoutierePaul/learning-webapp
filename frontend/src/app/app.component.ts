import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}

export interface LearningPackage  {
   packageId: number;
   packageName: string;
   packageDescription: string;
   packageProgress: number;
   packageDifficulty: number;
   packageFavorite: boolean;
}
