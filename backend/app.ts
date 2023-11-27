import * as express from 'express';
import { Request, Response} from 'express';

const app = express();
app.use(express.json());

app.get("/api/lesson-list", (req: Request, res: Response) => {
    res.send("Ok !")
});


app.listen(3000, () => {
    console.log(`Running on port 3000`);
});