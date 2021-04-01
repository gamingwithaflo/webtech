import express from "express";
import {SERVER_PORT} from "./config/env";
import path from "path";

// router imports
import apiRouter from "./routes/api";
import pageRouter from "./routes/pages";

// express server
const app = express();

// express configuration
app.set("port", SERVER_PORT);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(
    express.static(path.join(__dirname, "public"))
);

// routers
app.use("/api", apiRouter);
app.use("/", pageRouter);

export default app;
