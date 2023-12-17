import { Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningPackage } from '../app.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-learning-fact-page',
  templateUrl: './learning-fact-page.component.html',
  styleUrls: ['./learning-fact-page.component.css']
})
export class LearningFactPageComponent implements  OnInit{
  learningPackage: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit():void {
    // Récupérez l'ID du package depuis l'URL
    const packageId = this.route.snapshot.paramMap.get('id');

    // Effectuez une requête pour obtenir les informations du package à partir de l'ID
    this.httpClient.get(`/api/learningPackage/${packageId}`).subscribe({
      next: (res) => {
        this.learningPackage = res;
      },
      error: (err) => {
        console.error(`Failed to fetch data for package ID ${packageId}`, err);
      }
    });
  }


}
