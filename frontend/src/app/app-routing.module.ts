import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPageComponent} from "./study-page/study-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LearningFactPageComponent} from "./learning-fact-page/learning-fact-page.component";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {CreatePackageCardComponent } from './create-package-card/create-package-card.component';
import {CreateLearningFactComponent} from "./create-learning-fact/create-learning-fact.component";

const routes: Routes = [
  {path: 'study-page', component: StudyPageComponent},
  {path: '', component: HomePageComponent},
  {path: 'learning-fact-page/:id', component: LearningFactPageComponent},
  {path: 'statistics', component: StatisticsPageComponent},
  {path: 'create-package-card', component: CreatePackageCardComponent },
  {path: 'create-learning-fact', component: CreateLearningFactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
