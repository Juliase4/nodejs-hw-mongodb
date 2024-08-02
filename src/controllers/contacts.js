import createError from 'http-errors';
import * as ContactsService from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContacts(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  try {
    const contactsData = await ContactsService.getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    if (contactsData.contacts.length === 0) {
      return next(createError(404, 'Contacts not found'));
    }
    if (page > contactsData.totalPages) {
      return next(createError(404, 'Page not found'));
    }

    res.status(200).send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contactsData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await ContactsService.getContactById(contactId);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact with id ${contactId}!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function createContact(req, res, next) {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createError(400, 'Name, phoneNumber, and contactType are required');
    }

    const newContact = await ContactsService.createNewContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
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
    const deletedContact = await ContactsService.deleteContactById(contactId);

    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function patchContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const patchedContact = await ContactsService.patchContactById(
      contactId,
      req.body,
    );

    if (!patchedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: patchedContact,
    });
  } catch (error) {
    next(error);
  }
}
