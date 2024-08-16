import createError from 'http-errors';
import * as ContactsService from '../services/contacts.js';
import mongoose from 'mongoose';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFaleToUploadDir.js';

export async function getContacts(req, res, next) {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await ContactsService.getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId,
    });

    if (contacts.data.length === 0) {
      return next(createError(404, 'Contacts not found'));
    }
    if (page > contacts.totalPages) {
      return next(createError(404, 'Page not found'));
    }

    res.status(200).send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(createError(400, 'Invalid ID format'));
    }

    const contact = await ContactsService.getContactById(contactId, userId);

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function createContact(req, res, next) {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const userId = req.user._id;

    if (!name || !phoneNumber || !contactType) {
      throw createError(400, 'Name, phoneNumber, and contactType are required');
    }

    const newContact = await ContactsService.createNewContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const deletedContact = await ContactsService.deleteContactById(
      contactId,
      userId,
    );

    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  const { contactsId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const photo = req.file;
  let photoUrl;

  const checkIfCloudinary = process.env.ENABLE_CLOUDINARY;

  if (photo) {
    if (checkIfCloudinary === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const updated = await ContactsService.updateOldContact(
    contactsId,
    { ...contact, photo: photoUrl },
    req.user._id,
  );
  console.log(updated);
  if (updated === null) {
    return next(createError(404, 'Contact not found!'));
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
}
