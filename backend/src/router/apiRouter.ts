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
import { getAuthCode, getToken } from '../controllers/authController';

const router = Router();

router.get('/auth', getAuthCode);  // Redirect to Fortnox for authentication
router.get('/callback', getToken); // Callback route to handle token

export default router;
