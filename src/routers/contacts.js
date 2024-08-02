import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  patchContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, contactUpdateSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContact));
router.post(
  '/contacts',
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContact));
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContact),
);

export default router;
