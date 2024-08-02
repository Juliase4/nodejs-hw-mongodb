import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

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
