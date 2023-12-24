import * as express from 'express';
import {Request, Response} from 'express';
import {LearningFact, LearningPackage, Statistics} from "../database/Models"
import {Op} from "sequelize";

const statisticsRoutes = express.Router();


statisticsRoutes.get("/api/statistic/", async (req: Request, res: Response) => {
    try {
        let stat: Statistics[] = await Statistics.findAll();
        res.status(200).send(stat);
    } catch (error) {
        res.status(500).send("Could not query the database");
    }
});


statisticsRoutes.get("/api/statistic/:id", async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        let stat: Statistics = await Statistics.findOne({
            where: {packageId: id}
        });
        res.status(200).send(stat);
    } catch (error) {
        res.status(500).send("Could not query the database");
    }
});


statisticsRoutes.get("/api/statisticsStartedPackages", async (req: Request, res: Response) => {
    try {
        let packagesWithProgress: LearningPackage[] = await LearningPackage.findAll({
            where: {
                packageProgress: {
                    [Op.gt]: 0
                }
            }
        });
        let packageIds: number[] = packagesWithProgress.map(learningPackage => learningPackage.packageId);
        let statistics: Statistics[] = await Statistics.findAll({
            where: {
                packageId: packageIds
            }
        });
        res.status(200).send(statistics);
    } catch (error) {
        res.status(500).send(error);
    }
});

statisticsRoutes.post("/api/statistic", async (req: Request, res: Response) => {
    try {
        const newStat = await Statistics.create(req.body);
        res.status(200).send(newStat);
    } catch (error) {
        res.status(500).send(error);
    }
});

statisticsRoutes.put("/api/statistic/", async (req: Request, res: Response) => {
    try {
        let id = +req.body.packageId
        let stat: Statistics = await Statistics.findOne({
            where: {packageId: id}
        });
        if (stat) {
            stat.set(req.body);
            await stat.save();
            res.status(200).send(stat);
        } else {
            res.status(500).send("Could not update this statistic");
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});


export default statisticsRoutes;