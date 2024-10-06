import { Router } from 'express';
import { validateBody } from '../middlewares/validadeBodyId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchemaValidation } from '../validation/auth.js';
import { loginUserController, logoutUserController, registerUserControllers } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchemaValidation),
  ctrlWrapper(registerUserControllers),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController),
);

router.post(
  '/refresh-session',
  
);

export default router;