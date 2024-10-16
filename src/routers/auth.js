import { Router } from 'express';
import { validateBody } from '../middlewares/validadeBodyId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, 
  registerUserSchemaValidation, 
  requestResetEmailSchema, 
  resetPasswordSchema} from '../validation/auth.js';
import { loginUserController, 
  logoutUserController, 
  refreshUserSessionController, 
  registerUserControllers, 
  requestResetEmailController, 
  resetPasswordController} from '../controllers/auth.js';

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
  '/refresh',
  ctrlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;