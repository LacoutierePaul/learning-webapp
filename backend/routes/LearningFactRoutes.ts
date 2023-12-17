import * as express from 'express';
import { Request, Response} from 'express';
import {LearningFact} from "../database/Models"
import learningPackageRoutes from "./LearningPackageRoutes";



const learningFactRoutes = express.Router();

learningPackageRoutes.get("/api/learningFact", async (req: Request, res: Response) => {
    try {
        let LearningFacts: LearningFact[] = await LearningFact.findAll();
        res.status(200).send(LearningFacts);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

//Get all the facts for a given learning package with the id
learningPackageRoutes.get("/api/learningFact/:id", async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        let LearningFacts: LearningFact[] = await LearningFact.findAll({
            where: { packageId: id }
        });
        if(LearningFacts) {
            res.status(200).send(LearningFacts);
        }
        else
        {
            res.status(404).send({ error: 'Facts entity not found for ID: ' + id });
        }
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

learningPackageRoutes.get("/api/learningFact/:idPackage/:idFact", async (req: Request, res: Response) => {
    try {
        const idPackage = +req.params.idPackage;
        const idFact = +req.params.idFact;

        let LearningFacts: LearningFact = await LearningFact.findOne({
            where: { packageId: idPackage, factId: idFact}
        });
        if(LearningFacts) {
            res.status(200).send(LearningFacts);
        }
        else
        {
            res.status(404).send({ error: 'Fact entity not found for those ID , package : ' + idPackage +" fact : "+idFact });
        }
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

learningPackageRoutes.post("/api/learningFact", async (req: Request, res: Response) => {
    try {
        const newLearningFact:LearningFact= await LearningFact.create(req.body);
        res.status(200).send(newLearningFact);
    } catch(error) {
        res.status(500).send(error);
    }
});



export default learningFactRoutes;