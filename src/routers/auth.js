import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import {
  registerValidationSchema,
  loginValidationSchema,
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

export default router;
