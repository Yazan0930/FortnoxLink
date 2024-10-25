/*import http, {Server, IncomingMessage, ServerResponse} from "http";
import {ApiRouter} from './router/apiRouter';

const hostname:string = "127.0.0.1";
const port:number = 5000

const server:Server = http.createServer((request:IncomingMessage, response:ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
 
    ApiRouter.mapRouters(request, response);
});

server.listen(port, hostname, () => {
    console.log(`Node JS Server is started at http://${hostname}:${port}`)
})*/

import express from 'express';
import apiRouter from './router/apiRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});