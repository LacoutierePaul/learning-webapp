import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LearningPackage, LearningFact,Statistics} from '../app.component';
import {ActivatedRoute} from "@angular/router";
import {last} from "rxjs";

@Component({
  selector: 'app-learning-fact-page',
  templateUrl: './learning-fact-page.component.html',
  styleUrls: ['./learning-fact-page.component.css']
})
export class LearningFactPageComponent implements OnInit, OnDestroy {

  learningPackage: any;
  facts: LearningFact[] = []; // All facts including learning and review facts
  learningFacts: LearningFact[] = []; // Facts that the user has to learn
  reviewFacts: LearningFact[] = []; // Facts that the user has already learned and needs to review
  showQuestion: boolean = true;
  learningSession: boolean = false;
  reviewSession: boolean = false;
  factsSession:boolean= false;
  i: number = 0;
  timer: any;
  timeSpent: number = 0;
  learningLength: number = 0;
  lowConfidenceCount: number = 0;
  mediumConfidenceCount: number = 0;
  highConfidenceCount: number = 0;


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getPackage();
  }

  getPackage() {
    const packageId = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(`/api/updateLearningPackage/${packageId}`).subscribe({
      next: (res) => {
        this.learningPackage = res;
        this.getFacts();
        this.getStats();
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
      }
    });
  }

  getFacts() {
    this.httpClient.get(`/api/allLearningFact/${this.learningPackage.packageId}`).subscribe({
      next: (res: any) => {
        this.facts = res;
        this.learningLength = this.facts.length;
        this.learningFacts = this.facts.filter(fact => {
          return fact.confidenceLevel < 4 && new Date(fact.factNextReviewDate) <= new Date();
        });
        this.reviewFacts = this.facts.filter(fact => {
          return fact.confidenceLevel === 4 && new Date(fact.factNextReviewDate) <= new Date();
        });
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
    this.showQuestion = !this.showQuestion;
  }

  nextFact(difficulty: string) {
    if (this.learningSession) {
      this.updateLearningFact(this.learningFacts[this.i], difficulty);
      this.putFact(this.learningFacts[this.i]);
    } else {
      this.updateReviewFact(this.reviewFacts[this.i], difficulty);
      this.putFact(this.reviewFacts[this.i]);
    }

    if (this.i < (this.learningSession ? this.learningFacts.length - 1 : this.reviewFacts.length - 1)) {
      this.i++;
      if (!this.showQuestion) {
        this.showQuestion = true;
      }
    } else {
      this.endSession();
    }
  }


  endSession() {
    this.learningSession = false;
    this.reviewSession = false;
    this.factsSession=false;
    this.saveStats();
    this.getPackage();
    clearTimeout(this.timer);

  }

  startlearningSession() {
    this.startTimer()
    this.learningSession = true;
    this.reviewSession = false;
    this.factsSession=false;
    this.i = 0;
  }

  startReviewSession() {
    this.startTimer()
    this.reviewSession = true;
    this.learningSession = false;
    this.factsSession=false;
    this.i = 0;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeSpent++;
    }, 1000);
  }

  isLearningButtonDisabled(): boolean {
    return this.learningFacts.length === 0;
  }

  isReviewButtonDisabled(): boolean {
    return this.reviewFacts.length === 0;
  }

  private updateLearningFact(fact: LearningFact, difficulty: string) {
    let value = new Date();
    switch (difficulty) {
      case "Easy":
        fact.confidenceLevel = 4;
        value.setDate(value.getDate()+4);
        fact.factNextReviewDate = value;
        this.highConfidenceCount++;
        break;
      case "Review":
        fact.confidenceLevel = 1;
        fact.factNextReviewDate = value;
        this.lowConfidenceCount++;
        break;

      case "Correct":
        fact.confidenceLevel++;
        this.mediumConfidenceCount++;
        if (fact.confidenceLevel == 4) {
          value.setDate(value.getDate() + 1);
          fact.factNextReviewDate = value;
        } else {
          value.setMinutes(value.getMinutes() + 10);
          fact.factNextReviewDate = value;
        }
        break;
    }
    fact.factTimesReviewed = fact.factTimesReviewed + 1
    fact.factLastReviewedDate = new Date();
  }

  private updateReviewFact(fact: LearningFact, difficulty: string) {
    let dateNow = new Date();
    let newDate = new Date();
    let timeBetweenInMiliseconds = new Date(fact.factNextReviewDate).getTime() - new Date(fact.factLastReviewedDate).getTime();
    let timeBetweenInDays = Math.round(timeBetweenInMiliseconds / (1000 * 3600 * 24));

    switch (difficulty) {
      case 'Review':
        this.lowConfidenceCount++;
        if (timeBetweenInDays > 1) {
          newDate.setDate(dateNow.getDate() + timeBetweenInDays - 1);
        } else {
          newDate.setDate(dateNow.getDate() + 1);
        }
        break;
      case 'Hard':
        this.lowConfidenceCount++;
        newDate.setDate(dateNow.getDate() + timeBetweenInDays + 2);
        break;
      case 'Correct':
        this.mediumConfidenceCount++;
        newDate.setDate(dateNow.getDate() + timeBetweenInDays + 5);
        break;
      case 'Easy':
        this.highConfidenceCount++;
        newDate.setDate(dateNow.getDate() + timeBetweenInDays + 10);
        break;
    }
    fact.factNextReviewDate = newDate;
    fact.factLastReviewedDate = dateNow;
    fact.factTimesReviewed++;
  }

  NextFactFactsSession() {
    this.learningFacts[this.i].factTimesReviewed++;
    if (this.i < this.facts.length - 1) {
      this.i++;
      if (!this.showQuestion) {
        this.showQuestion = true;
      }
    } else {
      this.learningSession = false;
      this.reviewSession = false;
      this.factsSession = false;
      clearTimeout(this.timer);
    }
  }

  startFactsSession() {
    this.startTimer()
    this.learningSession = false;
    this.reviewSession = false;
    this.factsSession=true;
    this.i = 0;
  }

  private saveStats() {
    this.httpClient.put<Statistics>("/api/statistic", {
      "packageId": this.learningPackage.packageId,
      "timeSpent": this.timeSpent,
      "lowConfidenceCount": this.lowConfidenceCount,
      "mediumConfidenceCount": this.mediumConfidenceCount,
      "highConfidenceCount": this.highConfidenceCount
    })
      .subscribe({
        next: (res: Statistics) => {
          this.timeSpent = res.timeSpent;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  private getStats() {
    this.httpClient.get(`/api/statistic/${this.learningPackage.packageId}`).subscribe({
      next: (res: any) => {
        this.timeSpent = res.timeSpent;
        this.lowConfidenceCount = res.lowConfidenceCount;
        this.mediumConfidenceCount = res.mediumConfidenceCount;
        this.highConfidenceCount = res.highConfidenceCount;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${this.learningPackage.packageId}`, err);
      }
    });
  }
}
