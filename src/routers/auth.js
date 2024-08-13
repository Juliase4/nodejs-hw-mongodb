import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  refreshTokenController,
  logoutUserController,
  requestResetEmailController,
  sendPassword,
} from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import {
  registerValidationSchema,
  loginValidationSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const router = express.Router();
const parseJSON = express.json();

router.post(
  '/register',
  parseJSON,
  validateBody(registerValidationSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  parseJSON,
  validateBody(loginValidationSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', parseJSON, ctrlWrapper(refreshTokenController));
router.post('/logout', parseJSON, ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  parseJSON,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  parseJSON,
  validateBody(resetPasswordSchema),
  ctrlWrapper(sendPassword),
);

export default router;
