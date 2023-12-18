import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningPackage,LearningFact } from '../app.component';
import {ActivatedRoute} from "@angular/router";
import {last} from "rxjs";

@Component({
  selector: 'app-learning-fact-page',
  templateUrl: './learning-fact-page.component.html',
  styleUrls: ['./learning-fact-page.component.css']
})
export class LearningFactPageComponent implements OnInit, OnDestroy{

  learningPackage: any;
  learningFacts: LearningFact[] = [];
  showQuestion: boolean = true;
  session:boolean=false;
  i:number=0;
  timer: any;
  timeSpent: number = 0;
  learningLength: number = 0;


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.getPackage();
  }

  getPackage() {
    const packageId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(`/api/learningPackage/${packageId}`).subscribe({
      next: (res) => {
        this.learningPackage = res;
        this.getFacts();
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
      }
    });
  }

  getFacts(){
    this.httpClient.get(`/api/learningFact/${this.learningPackage.packageId}`).subscribe({
      next: (res:any) => {
        this.learningFacts = res.LearningFacts;
        this.learningLength = res.LearningLength;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${this.learningPackage.packageId}`, err);
      }
    });
  }

  putFact(fact: LearningFact) {
    this.httpClient.put(`/api/learningFact`, fact).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${this.learningPackage.packageId}`, err);
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  changeAnswer() {
    this.showQuestion=!this.showQuestion;
  }

  nextFact(difficulty: string) {
    this.updateFact(this.learningFacts[this.i],difficulty);
    this.putFact(this.learningFacts[this.i]);


    if(this.i<this.learningFacts.length-1) {
      this.i = this.i + 1;
      if(!this.showQuestion) {
        this.showQuestion=true;
      }
    }
    else
    {
      console.log("fini");
      this.session=false;
      //TODO : METTRE MODIFICATION STATS
      clearTimeout(this.timer);
    }

    let value:string = difficulty;
  //appeller une fonction pour modifier la next date et le level confidence en fonction de la difficulté
  }

  startSession() {
    this.startTimer()
    this.session=true;
    this.i=0;
  }

  startTimer(){
    this.timer = setInterval(() => {
      this.timeSpent++;
    }, 1000);
  }

  isButtonDisabled():boolean {
    return this.learningFacts.length === 0;
  }

  private updateFact(fact: LearningFact,difficulty :string) {
    let actualconfidence = this.learningFacts[this.i].confidenceLevel;
    let again=false
    let today = new Date();

    switch (difficulty) {
      case "Easy":
        this.learningFacts[this.i].confidenceLevel = actualconfidence+1;
        break;
      case "Hard":
        again=true;
        if(actualconfidence>1)
          this.learningFacts[this.i].confidenceLevel = actualconfidence-1;
        break;
      default:
        console.log('no changes');
        break;
    }
    this.learningFacts[this.i].factTimesReviewed = this.learningFacts[this.i].factTimesReviewed+1
    this.learningFacts[this.i].factLastReviewedDate = new Date();
    if(again) {
      this.learningFacts[this.i].factNextReviewDate =today;
      console.log(this.learningFacts[this.i].factNextReviewDate)

    }
    else
    {
      let lastdate =new Date(this.learningFacts[this.i].factLastReviewedDate);
      let nextdate =new Date(this.learningFacts[this.i].factNextReviewDate);
      let timeBetwen=nextdate.getDate()-lastdate.getDate();
      console.log(timeBetwen)
       if(timeBetwen<=0) timeBetwen=1;
      let value=new Date();
      value.setDate(value.getDate() + timeBetwen*this.learningFacts[this.i].confidenceLevel);
      this.learningFacts[this.i].factNextReviewDate =value;
    }

  }
}
