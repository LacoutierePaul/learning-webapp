import {Model} from "sequelize";

export class LearningPackage extends Model {
    declare packageId: number;
    declare packageName: string;
    declare packageDescription: string;
    declare packageFavourite: boolean;
    declare packageProgress: number;
    declare packageDifficulty: number;
}

export class LearningFact extends Model {
    declare factId: number;
    declare packageId: number;
    declare factQuestion: string;
    declare factAnswer: string;
    declare factTimesReviewed: number;
    declare factLastReviewedDate: Date;
    declare factNextReviewDate: Date;
    declare confidenceLevel: number;
}

export class Statistics extends Model {
    declare statId: number;
    declare factId: number;
    declare lowConfidenceCount: number;
    declare mediumConfidenceCount: number;
    declare highConfidenceCount: number;
}
