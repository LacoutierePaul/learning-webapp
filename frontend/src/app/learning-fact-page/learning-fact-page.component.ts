import { Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningPackage,LearningFact } from '../app.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-learning-fact-page',
  templateUrl: './learning-fact-page.component.html',
  styleUrls: ['./learning-fact-page.component.css']
})
export class LearningFactPageComponent implements  OnInit{
  learningPackage: any;
  learningFacts: LearningFact[] = [];
  showQuestion: boolean = true;
  i:number=0;
  selectedDifficulty: string='';


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit():void {
    const packageId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(`/api/learningPackage/${packageId}`).subscribe({
      next: (res) => {
        this.learningPackage = res;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
      }
    });


    this.httpClient.get<LearningFact[]>(`/api/learningFact/${packageId}`).subscribe({
      next: (res) => {
        this.learningFacts = res;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
      }
    });
  }

  changeAnswer() {
    this.showQuestion=!this.showQuestion;
  }

  nextFact() {
    if(this.i<this.learningFacts.length-1) {
      this.i = this.i + 1;
    }
    if(!this.showQuestion) {
      this.showQuestion=true;
    }
    this.selectedDifficulty = '';

  }
  previousFact() {
    if(this.i>0) {
      this.i = this.i - 1;
    }
    if(!this.showQuestion) {
      this.showQuestion=true;
    }
  }


}
