import { ContactsCollection } from '../db/models/contact.js';

export function getAllContacts(filter = {}) {
  return ContactsCollection.find(filter);
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
