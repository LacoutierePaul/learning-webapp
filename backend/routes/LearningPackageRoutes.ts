import * as express from 'express';
import { Request, Response} from 'express';
import{LearningPackage} from "../database/Models"

const learningPackageRoutes = express.Router();

learningPackageRoutes.get("/api/learningPackage", async (req: Request, res: Response) => {
    try {
        let LearningPackages: LearningPackage[] = await LearningPackage.findAll();
        res.status(200).send(LearningPackages);
    } catch(error){
        res.status(500).send("Could not query the database");
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


export default learningPackageRoutes;