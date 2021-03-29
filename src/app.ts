import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

// controllers
import * as topicController from "./controllers/topic";

// set environment variables
if (fs.existsSync(".env")) {
    //TODO logger
    console.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

// create express server
const app = express();

// express configuration
app.set("port", process.env.PORT || 8080);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(
    express.static(path.join(__dirname, "public"))
);

// TODO controllers
// routes
app.get('/', (req: any, res: any) => {
    res.render('pages/index', {
        title: 'React',
        header: 'Hello world!'
    });
});
app.get('/what-is-react', (req: any, res: any) => {
    res.render('pages/what-is-react');
});
app.get('/getting-started', (req: any, res: any) => {
    res.render('pages/getting-started');
});
app.get('/notable-features', (req: any, res: any) => {
    res.render('pages/notable-features');
});
app.get('/history', (req: any, res: any) => {
    res.render('pages/history');
});
app.get('/assessment', (req: any, res: any) => {
    res.render('pages/assessment');
});

// TODO api
app.get("/topics", topicController.getTopics);

export default app;
