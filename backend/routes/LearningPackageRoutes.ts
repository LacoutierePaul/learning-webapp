import * as express from 'express';
import {Request, Response} from 'express';
import {LearningPackage, LearningFact} from "../database/Models"
import learningFactRoutes from "./LearningFactRoutes";

const learningPackageRoutes = express.Router();

learningPackageRoutes.get("/api/learningPackage", async (req: Request, res: Response) => {
    try {
        let LearningPackages: LearningPackage[] = await LearningPackage.findAll();
        res.status(200).send(LearningPackages);
    } catch (error) {
        res.status(500).send("Could not query the database");
    }
});

learningPackageRoutes.get("/api/learningPackage/:id", async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        console.log('Handle HTTP GET /api/learning-package2/:id', id);
        const ourLearningPackage: LearningPackage = await LearningPackage.findOne({
            where: {packageId: id}
        });
        if (ourLearningPackage) {
            // Renvoyez le package d'apprentissage en tant que réponse JSON
            res.status(200).send(ourLearningPackage);
        } else {
            // Renvoyez une réponse 404 si le package n'a pas été trouvé
            res.status(404).send({error: 'Package entity not found for ID: ' + id});
        }
    } catch (error) {
        res.status(500).send("Could not query the database");
    }
});


learningPackageRoutes.get("/api/learningPackageFavorites", async (req: Request, res: Response) => {
    try {
        let favoriteLearningPackages: LearningPackage[] = await LearningPackage.findAll({
            where: {packageFavorite: true},
            order: [
                ["packageName", "ASC"],
                ["packageProgress", "DESC"]
            ]
        });
        res.status(200).send(favoriteLearningPackages)
    } catch (error) {
        res.status(500).send(error);
    }
});

learningPackageRoutes.get("/api/startedLearningPackage", async (req: Request, res: Response) => {
    try {
        let startedLearningPackages: LearningPackage[] = await LearningPackage.findAll({
            where: {
                packageProgress: {
                    gt: 0
                }
            },
            order: [
                ["packageName", "ASC"]
            ]
        });
        res.status(200).send(startedLearningPackages);
    } catch (error) {
        res.status(500).send(error);
    }
});


learningPackageRoutes.post("/api/learningPackage", async (req: Request, res: Response) => {
    try {
        const newLearningPackage = await LearningPackage.create(req.body);
        res.status(200).send(newLearningPackage);
    } catch (error) {
        res.status(500).send(error);
    }
});


learningPackageRoutes.put("/api/learningPackage", async (req: Request, res: Response) => {
    try {
        let packageId = +req.body.packageId
        let learningPackage: LearningPackage = await LearningPackage.findOne({
            where: {packageId: packageId}
        });

        if (learningPackage) {
            learningPackage.set(req.body);
            await learningPackage.save();
            res.status(200).send(learningPackage);
        } else {
            res.status(500).send("Could not update this learning package");
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

// Update the learning package and include associated learning facts
learningPackageRoutes.get("/api/updateLearningPackage/:id", async (req: Request, res: Response) => {
    try {
        let progression = 0;
        console.log("ID from request:", req.params.id);
        let packageId = +req.params.id
        let learningPackage: LearningPackage = await LearningPackage.findOne({
            where: {packageId: packageId}
        });
        if (learningPackage) {
            let learningFacts: LearningFact[] = await LearningFact.findAll({
                where: {packageId: packageId}
            });
            if (learningFacts.length > 0) {
                learningFacts.forEach(fact => {
                    if (fact.confidenceLevel === 4) progression += 1;
                })
                progression = Math.round(progression / learningFacts.length * 100);
            }
            learningPackage.packageProgress = progression
            await learningPackage.save();
            res.status(200).send(learningPackage);
        } else {
            res.status(500).send("Could not update this learning package");
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});


learningPackageRoutes.get("/api/allUpdatedLearningPackage", async (req: Request, res: Response) => {
    try {
        let learningPackages: LearningPackage[] = await LearningPackage.findAll();
        if (learningPackages.length != 0) {
            for (const ourpackage of learningPackages) {
                let progression = 0;
                let learningFacts: LearningFact[] = await LearningFact.findAll({
                    where: {packageId: ourpackage.packageId}
                });
                if (learningFacts.length > 0) {
                    learningFacts.forEach(fact => {
                        if (fact.confidenceLevel == 4) progression += 1;
                    })
                    progression = Math.round(progression / learningFacts.length * 100);
                    console.log(progression)
                }
                ourpackage.packageProgress = progression;

                await ourpackage.save();
            }
            res.status(200).send(learningPackages);

        } else {
            res.status(500).send("Could not update this learning package");
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});


export default learningPackageRoutes;