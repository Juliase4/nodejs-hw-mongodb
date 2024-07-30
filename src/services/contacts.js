import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  return ContactsCollection.find();
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
