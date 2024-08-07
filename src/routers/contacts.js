import { Router } from 'express';

import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  patchContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { contactSchema, contactUpdateSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContact));

router.post('', validateBody(contactSchema), ctrlWrapper(createContact));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContact),
);

export default router;
