import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningPackage,LearningFact } from '../app.component';
import {ActivatedRoute} from "@angular/router";
import {leadingComment} from "@angular/compiler";

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


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const packageId = await this.getPackage();
    this.getFacts(packageId);
  }

  async getPackage(): Promise<number> {
    const packageId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(`/api/learningPackage/${packageId}`).subscribe({
      next: (res) => {
        this.learningPackage = res;
        return this.learningPackage.packageId;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
      }
    });
    return -1;
  }

  getStatistics(){

  }

  getFacts(packageId: number){
    this.httpClient.get<LearningFact[]>(`/api/learningFact/${packageId}`).subscribe({
      next: (res) => {
        this.learningFacts = res;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
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
}
