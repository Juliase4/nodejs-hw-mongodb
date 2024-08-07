import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { registerValidationSchema } from '../validation/auth.js';

const router = express.Router();
const parseJSON = express.json();

router.post(
  '/register',
  parseJSON,
  validateBody(registerValidationSchema),
  ctrlWrapper(registerUserController),
);

export default router;
