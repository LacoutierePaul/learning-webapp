import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './navbar/navbar.component';
import {StudyPageComponent} from './study-page/study-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LearningPackageCardComponent} from './learning-package-card/learning-package-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LearningFactPageComponent} from './learning-fact-page/learning-fact-page.component';
import {FormsModule} from "@angular/forms";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {HighchartsChartModule} from "highcharts-angular";
import { CreatePackageCardComponent } from './create-package-card/create-package-card.component';
import { CreateLearningFactComponent } from './create-learning-fact/create-learning-fact.component';
import { ModifyLearningFactComponent } from './modify-learning-fact/modify-learning-fact.component';
import { ModifyLearningPackageComponent } from './modify-learning-package/modify-learning-package.component';
import { DeleteLearningFactComponent } from './delete-learning-fact/delete-learning-fact.component';
import { DeleteLearningPackageComponent } from './delete-learning-package/delete-learning-package.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudyPageComponent,
    HomePageComponent,
    LearningPackageCardComponent,
    LearningFactPageComponent,
    StatisticsPageComponent,
    CreatePackageCardComponent,
    CreateLearningFactComponent,
    ModifyLearningFactComponent,
    ModifyLearningPackageComponent,
    DeleteLearningFactComponent,
    DeleteLearningPackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
