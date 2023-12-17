import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudyPageComponent} from "./study-page/study-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LearningFactPageComponent} from "./learning-fact-page/learning-fact-page.component";
const routes: Routes = [
  { path:'study-page', component: StudyPageComponent },
  { path:'', component: HomePageComponent },
  { path:'learning-fact-page/:id', component: LearningFactPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
