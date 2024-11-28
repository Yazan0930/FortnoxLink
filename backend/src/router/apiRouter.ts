import { Router } from 'express';
import { getAuthCode, getToken, validateTokenMiddleware } from '../controllers/authController';
import { getFortnoxResource } from '../controllers/fortnoxService';

const router = Router();
router.get('/auth', getAuthCode);  // Redirect to Fortnox for authentication
router.get('/callback', getToken); // Callback route to handle token

router.use(validateTokenMiddleware);
router.get('/:endpoint', async (req, res) => {
    try {
        const data = await getFortnoxResource(req.params.endpoint);
        res.json(data);
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

export default router;
