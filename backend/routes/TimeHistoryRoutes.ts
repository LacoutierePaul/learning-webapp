import * as express from 'express';
import {Request, Response} from 'express';
import {LearningPackage, TimeHistory} from "../database/Models";

const timeHistoryRoutes = express.Router();

timeHistoryRoutes.get("/api/timeHistory/:packageId", async (req: Request, res: Response) => {
    try {
        const packageId: number = +req.params.packageId;
        let timeHistories: TimeHistory[] = await TimeHistory.findAll({
            where: {packageId: packageId}
        });
        res.status(200).send(timeHistories);
    } catch (error) {
        res.status(500).send(error);
    }
});

timeHistoryRoutes.post("/api/timeHistory", async (req: Request, res: Response) => {
    try {
        const newTimeHistory: TimeHistory = await TimeHistory.create(req.body);
        res.status(200).send(newTimeHistory);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default timeHistoryRoutes;