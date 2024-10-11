import express from "express";
import http from "http";
import swaggerUi from "swagger-ui-express";

import { connectDatabase } from "./src/config/database";
import userRouter from "./src/routes/userRoutes";
import swaggerDoc from "./swagger-output.json";
import {initializeSocket} from "./socket";

const app = express();
const server = http.createServer(app);
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDatabase();
initializeSocket(server);
// let openapi_options = { customSiteTitle: "Connect Verse Task API Documentation" };

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use("/auth",userRouter);
app.listen(port,()=>{
    console.log("server is listening")
});
