import { Router } from 'express';
import * as ApiController from '../controllers/apiController';

/* The line `import { Auth } from '../../middlewares/auth';` is importing the `Auth` middleware from
the `auth.ts` file located in the `middlewares` directory. This middleware is likely used to
authenticate and authorize requests before they reach the `list` endpoint. */
import { Auth } from '../../middlewares/auth';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list', Auth.private, ApiController.list);

export default router;