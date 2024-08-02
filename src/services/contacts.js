import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const totalItems = await ContactsCollection.countDocuments(filter);
  const paginationData = calculatePaginationData(totalItems, perPage, page);

  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const contacts = await ContactsCollection.find(filter)
    .sort(sortOptions)
    .skip((page - 1) * perPage)
    .limit(perPage);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(contactId) {
  return ContactsCollection.findById(contactId);
}

export async function createNewContact(contactData) {
  return ContactsCollection.create(contactData);
}

export async function deleteContactById(contactId) {
  return ContactsCollection.findByIdAndDelete(contactId);
}

export async function patchContactById(contactId, contactData) {
  return ContactsCollection.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
}
