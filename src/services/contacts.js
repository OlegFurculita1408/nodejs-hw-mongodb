import { contactModel } from "../db/models/contacts";

export const getAllContacts = async () => {
    const contacts = await contactModel.find();
    return contacts;
};

export const getContactsById = async () => {
    const contact = await contactModel.findById();
    return contact;
};


