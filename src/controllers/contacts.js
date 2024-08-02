import {
  getAllContacts,
  getContactById,
  createNewContact,
  deleteContactById,
  patchContactById,
} from '../services/contacts.js';
import createError from 'http-errors';

export async function getContacts(req, res, next) {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      type,
      isFavourite,
    } = req.query;
    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(perPage, 10);

    const filter = {};
    if (type) {
      filter.contactType = type;
    }
    if (isFavourite !== undefined) {
      filter.isFavourite = isFavourite === 'true';
    }

    const totalItems = await getAllContacts(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / perPageNumber);
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;

    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const contacts = await getAllContacts(filter)
      .sort(sortOptions)
      .skip((pageNumber - 1) * perPageNumber)
      .limit(perPageNumber);

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: pageNumber,
        perPage: perPageNumber,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

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

    const newContact = await createNewContact({
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
    const deletedContact = await deleteContactById(contactId);

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
    const patchedContact = await patchContactById(contactId, req.body);

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
