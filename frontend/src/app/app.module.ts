import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { StudyPageComponent } from './study-page/study-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LearningPackageCardComponent } from './learning-package-card/learning-package-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LearningFactPageComponent } from './learning-fact-page/learning-fact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudyPageComponent,
    HomePageComponent,
    LearningPackageCardComponent,
    LearningFactPageComponent
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
