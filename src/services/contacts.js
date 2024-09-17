import { contactModel } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await contactModel.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await contactModel.findById(contactId);
    return contact;
};


