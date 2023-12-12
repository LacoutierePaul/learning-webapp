import * as express from 'express';
import { Request, Response} from 'express';
import learningPackageRoutes from "./routes/LearningPackageRoutes";
import learningFactRoutes from "./routes/LearningFactRoutes";
import statisticsRoutes from "./routes/StatisticsRoutes";

const app = express();
app.use(express.json());
app.use(learningPackageRoutes)
app.use(learningFactRoutes)
app.use(statisticsRoutes)


app.get("/api/lesson-list", (req: Request, res: Response) => {
    res.send("Ok !")
});


app.listen(3000, () => {
    console.log(`Running on port 3000`);
});