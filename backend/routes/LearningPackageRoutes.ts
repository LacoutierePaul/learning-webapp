import * as express from 'express';
import { Request, Response} from 'express';
import{LearningPackage} from "../database/Models"

const learningPackageRoutes = express.Router();

learningPackageRoutes.get("/api/learningPackage", async (req: Request, res: Response) => {
    try {
        let LearningPackages: LearningPackage[] = await LearningPackage.findAll({
            order: [
                ["packageName", "ASC"],
                ["packageProgress", "DESC"]
            ]
        });
        res.status(200).send(LearningPackages);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});


learningPackageRoutes.get("/api/learningPackage/favorites", async (req: Request, res: Response) => {
    try {
        let favoriteLearningPackages: LearningPackage[] = await LearningPackage.findAll({
            where: { packageFavorite: true },
            order: [
                ["packageName", "ASC"],
                ["packageProgress", "DESC"]
            ]
        });
        res.status(200).send(favoriteLearningPackages)
    } catch(error){
        res.status(500).send(error);
    }
});


learningPackageRoutes.post("/api/learningPackage", async (req: Request, res: Response) => {
    try {
        const newLearningPackage= await LearningPackage.create(req.body);
        res.status(200).send(newLearningPackage);
    } catch(error) {
        res.status(500).send(error);
    }
});


learningPackageRoutes.put("/api/learningPackage", async (req: Request, res: Response) => {
    try{
        let packageId = +req.body.packageId
        let learningPackage: LearningPackage = await LearningPackage.findOne({
            where: {packageId: packageId}
        });

        if(learningPackage){
            learningPackage.set(req.body);
            await learningPackage.save();
            res.status(200).send(learningPackage);
        } else {
            res.status(500).send("Could not update this learning package");
        }
    } catch(error){
        res.status(500).send("Wrong id parameter format");
    }
});


export default learningPackageRoutes;