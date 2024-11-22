/*import http from 'http';

export class ApiRouter {
    public static mapRouters(request:http.IncomingMessage, response:http.ServerResponse) {
        let url:string | undefined = request.url;
        let method:string | undefined = request.method;
        let result:string = '';

        if(url === '/' && method === 'GET'){
            result = 'Welcome to the start of your Fortnox integration to make orders.'
        }

        response.end(result);
    }
}*/

import { Router } from 'express';
import { getAuthCode, getToken, validateTokenMiddleware, makeFortnoxRequest } from '../controllers/authController';
import { getFortnoxResource } from '../services/fortnoxService';

const router = Router();

router.get('/auth', getAuthCode);  // Redirect to Fortnox for authentication
router.get('/callback', getToken); // Callback route to handle token
router.get('/fortnox', validateTokenMiddleware); // Validate token
router.get('/fortnox/:endpoint', async (req, res) => {
    try {
        const data = await makeFortnoxRequest(req.params.endpoint);
        res.json(data);
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

/*
router.get('/fortnox/articles', async (req, res) => {
    try {
        const data = await getFortnoxResource("articles");
        res.json(data);
    } catch (err) {
        res.status(500).send({ error: err });
    }
});*/
export default router;
