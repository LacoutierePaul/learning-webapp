import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPageComponent} from "./study-page/study-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LearningFactPageComponent} from "./learning-fact-page/learning-fact-page.component";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {CreatePackageCardComponent } from './create-package-card/create-package-card.component';
import {CreateLearningFactComponent} from "./create-learning-fact/create-learning-fact.component";
import {DeleteLearningFactComponent} from "./delete-learning-fact/delete-learning-fact.component";
import {DeleteLearningPackageComponent} from "./delete-learning-package/delete-learning-package.component";
import {ModifyLearningFactComponent} from "./modify-learning-fact/modify-learning-fact.component";
import {ModifyLearningPackageComponent} from "./modify-learning-package/modify-learning-package.component";

const routes: Routes = [
  {path: 'study-page', component: StudyPageComponent},
  {path: '', component: HomePageComponent},
  {path: 'learning-fact-page/:id', component: LearningFactPageComponent},
  {path: 'statistics', component: StatisticsPageComponent},
  {path: 'create-package-card', component: CreatePackageCardComponent },
  {path: 'create-learning-fact', component: CreateLearningFactComponent},
  {path: 'delete-learning-fact', component:DeleteLearningFactComponent},
  {path: 'delete-learning-package', component:DeleteLearningPackageComponent},
  {path: 'modify-learning-package', component:ModifyLearningPackageComponent},
  {path: 'modify-learning-fact', component: ModifyLearningFactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
