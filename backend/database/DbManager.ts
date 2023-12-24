import {DataTypes, Sequelize} from 'sequelize';
import {LearningPackage, LearningFact, Statistics, TimeHistory} from "./Models";
import * as fs from "fs";


const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    username: 'learningDbUser',
    password: 'root',
    database: 'LearningDb'
});

export function connectDb(): void {
    sequelize.authenticate().then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.error(error);
    });
}

export async function createTables() {
    LearningPackage.init({
        packageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        packageName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        packageDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        packageProgress: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        packageDifficulty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        packageFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {sequelize, tableName: "LearningPackage"});

    LearningFact.init({
        factId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        packageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LearningPackage,
                key: 'packageId'
            }
        },
        factQuestion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        factAnswer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        factTimesReviewed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        factLastReviewedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        factNextReviewDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        confidenceLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {sequelize, tableName: "LearningFact"});

    Statistics.init({
        statId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        packageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: LearningPackage,
                key: 'packageId'
            }
        },
        lowConfidenceCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mediumConfidenceCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        highConfidenceCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timeSpent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {sequelize, tableName: "Statistics"});

    TimeHistory.init({
        historyId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        packageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: LearningPackage,
                key: 'packageId'
            }
        },
        timeSpent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        historyDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {sequelize, tableName: "TimeHistory"})

    await LearningPackage.sync({force: false});
    console.log("LearningPackage table created");

    await LearningFact.sync({force: false});
    console.log("LearningFact table created");

    await Statistics.sync({force: false});
    console.log("Statistics table created");

    await TimeHistory.sync({force: false});
    console.log("TimeHistory table created");

}
