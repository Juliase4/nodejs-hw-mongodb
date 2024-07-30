import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  patchContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));
router.post('/contacts', ctrlWrapper(createContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));
router.patch('/contacts/:contactId', ctrlWrapper(patchContact));

export default router;
