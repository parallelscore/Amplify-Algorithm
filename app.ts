import express, { Response, Request, NextFunction } from "express";
import config from "./config";


const app = express();
const {port} = config;


// Handle Errors
app.use((err: { stack: any; }, req: Request, res: Response) => {

    console.error(err.stack);
    res.status(500).send('something went wrong')
}) 

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

