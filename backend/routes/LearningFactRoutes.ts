import * as express from 'express';
import { Request, Response} from 'express';
import {LearningFact} from "../database/Models"
import learningPackageRoutes from "./LearningPackageRoutes";



const learningFactRoutes = express.Router();

learningFactRoutes.get("/api/learningFact", async (req: Request, res: Response) => {
    try {
        let LearningFacts: LearningFact[] = await LearningFact.findAll();
        res.status(200).send(LearningFacts);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

//Get all the facts for a given learning package with the id
learningFactRoutes.get("/api/learningFact/:id", async (req: Request, res: Response) => {
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

learningFactRoutes.get("/api/learningFact/:idPackage/:idFact", async (req: Request, res: Response) => {
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

learningFactRoutes.post("/api/learningFact", async (req: Request, res: Response) => {
    try {
        const newLearningFact:LearningFact= await LearningFact.create(req.body);
        res.status(200).send(newLearningFact);
    } catch(error) {
        res.status(500).send(error);
    }
});


learningFactRoutes.delete("/api/learningFact/:idPackage/:idFact", async (req: Request, res: Response) =>
{
    try {
        const idPackage = +req.params.idPackage;
        const idFact = +req.params.idFact;

        let LearningFacts: LearningFact = await LearningFact.findOne({
            where: {packageId: idPackage, factId: idFact}
        });
        if (LearningFacts) {
            await LearningFacts.destroy();
            res.status(200).send({message: "Fact deleted"});
        } else {
            res.status(404).send({error: 'Fact entity not found for those ID , package : ' + idPackage + " fact : " + idFact});
        }
    } catch (error) {
        res.status(500).send("Could not query the database");
    }
});

learningFactRoutes.put("/api/learningFact", async (req: Request, res: Response) => {
    try{
        let packageId = +req.body.packageId
        let factId = +req.body.factId
        let learningFact: LearningFact = await LearningFact.findOne({
            where: {packageId: packageId, factId: factId}
        });

        if(learningFact){
            learningFact.set(req.body);
            await learningFact.save();
            res.status(200).send(learningFact);
        } else {
            res.status(404).send({error: 'Fact entity not found for those ID , package : ' + packageId + " fact : " + factId});
        }
    } catch(error){
        res.status(500).send(error);
    }
});



export default learningFactRoutes;